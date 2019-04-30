const visit = require('unist-util-visit');
const qs = require('query-string');

module.exports = function gatsbyRemarkCodeButtons(
  { markdownAST },
  {
    buttonClass: customButtonClass,
    buttonContainerClass: customButtonContainerClass,
    buttonText: customButtonText,
    svgIconClass: customSvgIconClass,
    svgIcon: customSvgIcon,
    tooltipText: customTooltipText,
    toasterClass: customToasterClass,
    toasterTextClass: customToasterTextClass,
    toasterText: customToasterText,
    toasterDuration: customToasterDuration
  }
) {
    visit(markdownAST, 'code', (node, index) => {
      const [language, params] = (node.lang || '').split(':');
      const actions = qs.parse(params);
      const { clipboard } = actions;

      if (!language) {
        return;
      }

      if (clipboard === 'false') {
        delete actions['clipboard'];
      } else {
        const buttonClass = ['gatsby-code-button'].concat(customButtonClass || '').join(' ').trim();
        const buttonContainerClass = ['gatsby-code-button-container'].concat(customButtonContainerClass || '').join(' ').trim();
        const buttonText = customButtonText || '';
        const svgIconClass = ['gatsby-code-button-icon'].concat(customSvgIconClass || '').join(' ').trim();
        const svgIcon = customSvgIcon || `<svg class="${svgIconClass}" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M16 1H2v16h2V3h12V1zm-1 4l6 6v12H6V5h9zm-1 7h5.5L14 6.5V12z"/></svg>`;
        const tooltipText = customTooltipText || '';
        const toasterClass = ['gatsby-code-button-toaster'].concat(customToasterClass || '').join(' ').trim();
        const toasterTextClass = ['gatsby-code-button-toaster-text'].concat(customToasterTextClass || '').join(' ').trim();
        const toasterText = (customToasterText ? customToasterText : '').trim();
        const toasterDuration = (customToasterDuration ? customToasterDuration : 3500);
        const toasterId = (toasterText ? Math.random() * 100 ** 10 : '');

        let code = markdownAST.children[index].value;
        code = code.replace(/"/gm, '&quot;').replace(/`/gm, '\\`');

        const buttonNode = {
          type: 'html',
          value: `
            <div
              class="${buttonContainerClass}"
              data-toaster-id="${toasterId}"
              data-toaster-class="${toasterClass}"
              data-toaster-text-class="${toasterTextClass}"
              data-toaster-text="${toasterText}"
              data-toaster-duration="${toasterDuration}"
              onClick="copyToClipboard(\`${code}\`, \`${toasterId}\`)"
            >
              <div
                class="${buttonClass}"
                data-tooltip="${tooltipText}"
              >
                ${buttonText}${svgIcon}
              </div>
            </div>
            `.trim()
        };

        markdownAST.children.splice(index, 0, buttonNode);
        actions['clipboard'] = 'false';
    }

    let newQuery = '';
    if (Object.keys(actions).length) {
      newQuery = `:` + Object.keys(actions).map(key => `${key}=${actions[key]}`).join('&');
    }

    node.lang = language + newQuery;
  });
};
