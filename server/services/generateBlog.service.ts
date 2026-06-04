import { env } from '../config/env.js'
import { AppError } from '../utils/AppError.js'
import { HttpStatus } from '../constants/httpStatus.js'

type OpenAIResponsePayload = {
  output_text?: string
  output?: Array<{
    content?: Array<{
      type?: string
      text?: string
    }>
  }>
  content?: string
  blog?: string
  result?: string
}

const extractContent = (payload: OpenAIResponsePayload) => {
  if (payload.output_text) return payload.output_text

  const outputText = payload.output
    ?.flatMap((item) => item.content ?? [])
    .find((item) => item.type === 'output_text' && item.text)?.text

  if (outputText) return outputText

  return payload.content || payload.blog || payload.result || ''
}

const generateImages = async (topic: string) => {
  const apiKey = env.OPENAI_API_KEY
  if (!apiKey) return []

  const prompts = [
    `${topic} hero banner, modern, high quality`,
    `${topic} concept illustration, detailed`,
    `${topic} workflow or process diagram`,
    `${topic} real world example visual`,
  ]

  const results: string[] = []

  for (const p of prompts) {
    try {
      const res = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-image-1',
          prompt: p,
          size: '1024x1024',
        }),
      })

      const data = (await res.json()) as { data?: Array<{ b64_json?: string }> }
      const base64 = data?.data?.[0]?.b64_json

      if (base64) {
        results.push(`data:image/png;base64,${base64}`)
      }
    } catch (err) {
      console.error('Image failed:', err)
    }
  }

  return results
}

const injectImages = (html: string, images: string[]) => {
  let i = 0
  return html.replace(/IMAGE_\d+/g, () => images[i++ % images.length])
}

export async function generateBlogContent(prompt: string): Promise<{ content: string }> {
  const trimmed = prompt?.trim()
  if (!trimmed) {
    throw new AppError('Prompt is required.', HttpStatus.BAD_REQUEST)
  }

  const apiKey = env.OPENAI_API_KEY
  if (!apiKey) {
    throw new AppError('OPENAI_API_KEY is not configured.', HttpStatus.INTERNAL_SERVER_ERROR)
  }

  const generationPrompt = [
    'You are a professional blog writer and HTML generator.',
    'Generate a complete, production-ready blog post as valid HTML.',
    'STRICT RULES:',
    '- Output MUST be raw HTML only (no markdown, no code fences).',
    '- Do NOT include <img>, <picture>, <figure>, <video>, iframe, or embeds.',
    '- Do NOT include JavaScript or inline event handlers.',
    '- Do NOT include <style> or CSS.',
    '- Use only clean semantic HTML tags: <h1>, <h2>, <h3>, <p>, <ul>, <li>, <strong>, <em>, <blockquote>.',
    '- Do NOT use em dashes or long dashes in the writing. Use simple punctuation only.',
    'STRUCTURE:',
    '- Start with a compelling <h1> title.',
    '- Write an engaging introduction (2–3 paragraphs).',
    '- Use multiple <h2> sections.',
    '- Under each <h2>, include structured content (paragraphs + lists).',
    '- Keep paragraphs short (2–4 lines max).',
    '- End with a strong conclusion section.',
    'SEO RULES:',
    '- Naturally include the main topic keyword throughout.',
    '- Write a clear and engaging introduction for SEO.',
    '- Use descriptive section headings.',
    '- Avoid keyword stuffing.',
    'WRITING STYLE:',
    '- Clear, professional, and easy to read.',
    '- Avoid fluff and repetition.',
    '- Use real-world examples where possible.',
    '- Write for humans first, SEO second.',
    'LENGTH:',
    '- Target 800–1200 words.',
    '',
    `User topic: ${trimmed}`,
  ].join('\n')

  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4.1-mini',
      input: generationPrompt,
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new AppError(errorText || 'OpenAI request failed.', response.status as number)
  }

  const data = (await response.json()) as OpenAIResponsePayload
  let content = extractContent(data).trim()

  if (!content) {
    throw new AppError('Empty content returned.', HttpStatus.BAD_GATEWAY)
  }

  const images = await generateImages(trimmed)

  if (images.length) {
    content = injectImages(content, images)
  } else {
    console.warn('Using fallback image')
    content = content.replace(
      /IMAGE_\d+/g,
      'https://via.placeholder.com/800x400?text=Blog+Image',
    )
  }

  return { content }
}
