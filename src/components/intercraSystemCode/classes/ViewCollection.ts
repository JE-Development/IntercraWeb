export class ViewCollection{
    getInformationView(): string{
        let view = '<div class="center-horizontal">\n' +
            '    <div class="view-border content-layout-color">\n' +
            '      <a href=";;;href;;;" class="visible-link-color">;;;url;;;</a>\n' +
            '      <h2><a href=";;;hrefHead;;;" class="headline-color">;;;headline;;;</a></h2>\n' +
            '      <p class="teaser-color">;;;teaser;;;</p>\n' +
            '      <p class="plugin-name-color view-plugin-name">Plugin: ;;;plugin-name;;;</p>\n' +
            '    </div>\n' +
            '  </div>'
        return view;
    }

    getShoppingView(): string{
        let view = '<div class="center-horizontal">\n' +
            '    <div class="view-border content-layout-color">\n' +
            '\n' +
            '      <div class="view-border content-layout-color center-horizontal">\n' +
            '        <img src="../assets/sample-product-image.png" class="center-horizontal view-image"/>\n' +
            '      </div>\n' +
            '      <h2><a href=";;;hrefHead;;;" class="headline-color">;;;headline;;;</a></h2>\n' +
            '      <p class="plugin-name-color  view-plugin-name">Plugin: ;;;plugin-name;;;</p>\n' +
            '    </div>\n' +
            '  </div>'
        return view;
    }
}