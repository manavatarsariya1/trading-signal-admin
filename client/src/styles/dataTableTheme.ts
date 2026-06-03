import type { TableStyles } from 'react-data-table-component'

export const tsaiDataTableStyles: TableStyles = {
  table: {
    style: {
      backgroundColor: 'transparent',
      color: '#f9f9f9',
    },
  },
  tableWrapper: {
    style: {
      display: 'table',
    },
  },
  headRow: {
    style: {
      backgroundColor: 'rgba(11, 23, 54, 0.9)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      minHeight: '52px',
    },
  },
  headCells: {
    style: {
      color: '#adb1b8',
      fontSize: '11px',
      fontWeight: 600,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      paddingLeft: '16px',
      paddingRight: '16px',
    },
  },
  rows: {
    style: {
      backgroundColor: 'transparent',
      borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
      minHeight: '56px',
      cursor: 'default',
    },
    highlightOnHoverStyle: {
      backgroundColor: 'rgba(18, 215, 245, 0.06)',
      borderBottomColor: 'rgba(18, 215, 245, 0.15)',
      outline: 'none',
    },
  },
  cells: {
    style: {
      color: '#c7ccd2',
      fontSize: '14px',
      paddingLeft: '16px',
      paddingRight: '16px',
    },
  },
  pagination: {
    style: {
      backgroundColor: 'rgba(2, 8, 30, 0.8)',
      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      color: '#c7ccd2',
      minHeight: '52px',
    },
    pageButtonsStyle: {
      borderRadius: '8px',
      height: '36px',
      width: '36px',
      padding: '4px',
      margin: '0 4px',
      cursor: 'pointer',
      transition: '0.2s',
      color: '#c7ccd2',
      fill: '#c7ccd2',
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
    },
  },
  noData: {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '48px',
      color: '#adb1b8',
      backgroundColor: 'transparent',
    },
  },
}
