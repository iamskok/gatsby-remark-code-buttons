import './styles.css';

exports.onClientEntry = () => {
  window.copyToClipboard = (str, toasterId) => {
    const el = document.createElement('div');
    el.className = 'gatsby-code-button-buffer';
    el.innerHTML = str;
    document.body.appendChild(el);

    const range = document.createRange();
    range.selectNode(el);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand(`copy`);

    document.activeElement.blur();
    setTimeout(() => {
      document.getSelection().removeAllRanges();
      document.body.removeChild(el);
    }, 100);

    if (toasterId) {
      window.showClipboardToaster(toasterId);
    }
  }

  window.showClipboardToaster = toasterId => {
    const textElem = document.querySelector(`[data-toaster-id="${toasterId}"]`);

    if (!textElem) {
      return;
    }

    const el = document.createElement('div');
    el.className = 'gatsby-code-button-toaster';
    el.dataset.duration = 
    el.innerHTML = `
      <div class="gatsby-code-button-toaster-text">
        ${textElem.dataset.toasterText}
      </div>
    `.trim();

    document.body.appendChild(el);
    setTimeout(() => {
      document.body.removeChild(el);
    }, textElem.dataset.toasterDuration);
  }
}
