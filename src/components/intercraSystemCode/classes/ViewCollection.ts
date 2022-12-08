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

    getAudioView(): string{
        let view = '<div class="center-horizontal">\n' +
            '    <div class="view-border content-layout-color">\n' +
            '\n' +
            '      <div class="view-border content-layout-color center-horizontal">\n' +
            '        <img src="../assets/sample-product-image.png" class="center-horizontal view-image"/>\n' +
            '      </div>\n' +
            '      <h3 class="complementary-color bold">;;;type;;;</h3>\n' +
            '      <h2><a href=";;;hrefHead;;;" class="headline-color">;;;headline;;;</a></h2>\n' +
            '      <h3 class="teaser-color">;;;artist;;;</h3>\n' +
            '      <h4 class="teaser-color">;;;release;;;</h4>\n' +
            '      <h4 class="teaser-color">;;;tags;;;</h4>\n' +
            '      <h4 class="teaser-color">;;;genre;;;</h4>\n' +
            '      <p class="plugin-name-color  view-plugin-name">Plugin: ;;;plugin-name;;;</p>\n' +
            '    </div>\n' +
            '  </div>'
        return view;
    }

    getCheckBoxView(): string{
        let view = '<div class="plugin-view">\n' +
            '        <input type="checkbox" class="check-box" id="plugin-id-;;;id;;;" name="p1" value="PluginName" checked="true" onclick="onCheckBoxClicked(\';;;id;;;\')">\n' +
            '        <label for="plug1" class="check-box-label">;;;plugin-name;;;</label><br>\n' +
            '      </div>'
        return view;
    }
}