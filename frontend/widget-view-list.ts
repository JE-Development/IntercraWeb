import { LitElement, html, css, customElement } from 'lit-element';
import '@vaadin/vaadin-ordered-layout/src/vaadin-vertical-layout.js';
import '@vaadin/select/src/vaadin-select.js';
import '@vaadin/list-box/src/vaadin-list-box.js';
import '@vaadin/item/src/vaadin-item.js';
import '@vaadin/tabs/src/vaadin-tabs.js';
import '@vaadin/tabs/src/vaadin-tab.js';
import '@polymer/iron-icon/iron-icon.js';
import '@vaadin/text-field/src/vaadin-text-field.js';
import '@vaadin/checkbox/src/vaadin-checkbox.js';

@customElement('widget-view-list')
export class WidgetViewList extends LitElement {
  static get styles() {
    return css`
      :host {
          display: block;
          height: 100%;
      }
      `;
  }

  render() {
    return html`
<vaadin-vertical-layout style="width: 100%; height: 100%;">
 <vaadin-text-field label="Label" placeholder="Placeholder"></vaadin-text-field>
 <vaadin-select value="Item one">
  <template>
   <vaadin-list-box>
    <vaadin-item>
      Item one 
    </vaadin-item>
    <vaadin-item>
      Item two 
    </vaadin-item>
    <vaadin-item>
      Item three 
    </vaadin-item>
   </vaadin-list-box>
  </template>
 </vaadin-select>
 <vaadin-tabs orientation="horizontal" selected="0">
  <vaadin-tab>
   <iron-icon icon="lumo:user"></iron-icon>
   <span>Tab one</span>
  </vaadin-tab>
  <vaadin-tab>
   <iron-icon icon="lumo:cog"></iron-icon>
   <span>Tab two</span>
  </vaadin-tab>
  <vaadin-tab>
   <iron-icon icon="lumo:bell"></iron-icon>
   <span>Tab three</span>
  </vaadin-tab>
 </vaadin-tabs>
 <vaadin-list-box>
  <vaadin-item>
    Item one 
  </vaadin-item>
  <vaadin-item>
    Item two 
  </vaadin-item>
  <vaadin-item>
    Item three 
  </vaadin-item>
 </vaadin-list-box>
 <vaadin-list-box>
  <b>Select an Item</b>
  <vaadin-item>
    Item one 
  </vaadin-item>
  <vaadin-item>
    Item two 
  </vaadin-item>
  <hr>
  <vaadin-item>
    Item three 
  </vaadin-item>
  <vaadin-item>
    Item four 
  </vaadin-item>
 </vaadin-list-box>
 <vaadin-checkbox type="checkbox" value="on">
  <iron-icon icon="lumo:bell" style="vertical-align: top;"></iron-icon>Notifications 
 </vaadin-checkbox>
 <vaadin-checkbox type="checkbox" value="on">
   I agree 
 </vaadin-checkbox>
</vaadin-vertical-layout>
`;
  }

  // Remove this method to render the contents of this view inside Shadow DOM
  createRenderRoot() {
    return this;
  }
}
