import visit from 'unist-util-visit';
import qs from 'query-string';

module.exports = function gatsbyRemarkCodeButtons(
  { markdownAST },
  {
    className: customClassName,
    buttonClassName: customButtonClassName,
    text: customText,
    icon: customIcon,
    iconClassName: customIconClassName,
    tooltip: customTooltip,
    toaster: customToasterClassName,
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
        const className = ['gatsby-code-button-container'].concat(customClassName || '').join(' ').trim();
        const buttonClassName = ['gatsby-code-button'].concat(customButtonClassName || '').join(' ').trim();
        const text = customText || '';
        const iconClassName = ['gatsby-code-button-icon'].concat(customIconClassName || '').join(' ').trim();
        const icon = customIcon || `<svg class="${iconClassName}" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M16 1H2v16h2V3h12V1zm-1 4l6 6v12H6V5h9zm-1 7h5.5L14 6.5V12z"/></svg>`;
        const tooltip = customTooltip || '';
        const toaster = ['gatsby-code-button-toaster'].concat(customToasterClassName || '').join(' ').trim();
        const toasterText = (customToasterText ? customToasterText : '').trim();
        const toasterId = (toasterText ? Math.random() * 100 ** 10 : '');
        const toasterDuration = (toasterText ? customToasterDuration : 3500);

        let code = markdownAST.children[index].value;
        code = code.replace(/"/gm, '&quot;').replace(/`/gm, '\\`');

        const buttonNode = {
          type: 'html',
          value: `
            <div
              class="${className}"
              onClick="copyToClipboard(\`${code}\`, \`${toasterId}\`)"
              data-toaster-text="${toasterText}"
              data-toaster-id="${toasterId}"
              data-toaster-duration="${toasterDuration}"
            >
              <div
                class="${buttonClassName}"
                data-tooltip="${tooltip}"
              >
                ${text}${icon}
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
