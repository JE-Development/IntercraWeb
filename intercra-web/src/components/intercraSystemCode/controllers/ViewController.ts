import {InformationView} from "@/src/components/intercraSystemCode/customViews/InformationView";
import {ShoppingView} from "@/src/components/intercraSystemCode/customViews/ShoppingView";

export class ViewController{
    informationView = new InformationView();
    shoppingView = new ShoppingView();

    getInformationView(): InformationView{
        return this.informationView;
    }

    getShoppingView(): ShoppingView{
        return this.shoppingView;
    }
}