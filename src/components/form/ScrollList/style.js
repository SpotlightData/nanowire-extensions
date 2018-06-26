const row = {
  border: '1px solid #ebedf0',
  padding: '8px 12px',
  cursor: 'pointer',
};

export default {
  container: { overflowY: 'scroll' },
  table: { width: '100%' },
  row,
  activeRow: { ...row, fontWeight: 'bold', color: '#1890ff' },
};
