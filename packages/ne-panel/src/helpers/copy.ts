function fallbackCopyTextToClipboard(text: string) {
  var textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed'; //avoid scrolling to bottom
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    document.execCommand('copy');
  } catch (err) {
    console.warn('Failed to copy the text');
  }
  document.body.removeChild(textArea);
}

export function copyToClipboard(text: string): Promise<any> {
  if (!navigator || !navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return Promise.resolve();
  }
  return navigator.clipboard.writeText(text);
}
