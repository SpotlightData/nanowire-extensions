/**
 * Creates an iframe and uses it as a middleman for opening Onedrive file picker
 * @param {Object} options - Onedrive options
 * @return {[pValue, pValue]} - [error, response]
 */
export function getFiles(options) {
  return new Promise((res, rej) => {
    // To prevent an issue where request was sent twice
    let resolved = false;
    let iFrame;

    function handleMessages(event) {
      const data = JSON.parse(event.data);
      window.removeEventListener('message', handleMessages);
      iFrame.contentWindow.close();
      iFrame.parentNode.removeChild(iFrame);
      if (!resolved) {
        resolved = true;
        res(data);
      }
    }
    window.addEventListener('message', handleMessages);

    iFrame = document.createElement('iframe');
    iFrame.src = options.source;
    iFrame.style.display = 'none';
    // Sends onedrive options
    iFrame.onload = () => receiver.postMessage(JSON.stringify(options), '*');
    document.body.appendChild(iFrame);
  });
}
