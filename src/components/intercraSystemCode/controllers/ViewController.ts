import type {InformationViewInterface} from "@/src/components/intercraSystemCode/interfaces/InformationViewInterface";
import type {ShoppingViewInterface} from "@/src/components/intercraSystemCode/interfaces/ShoppingViewInterface";

export class ViewController{
    informationView: InformationViewInterface = {} as InformationViewInterface;
    shoppingView: ShoppingViewInterface = {} as ShoppingViewInterface;

    getInformationView(): InformationViewInterface{
        return this.informationView;
    }

    getShoppingView(): ShoppingViewInterface{
        return this.shoppingView;
    }

    setInformationView(iv: InformationViewInterface){
        this.informationView = iv;
    }

    setShoppingView(sv: ShoppingViewInterface){
        this.shoppingView = sv;
    }
}