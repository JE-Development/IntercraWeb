export class EasterEggController{
    //evil intercra
    checkEvil(text: string): boolean{
        if(text.toLowerCase() === "evil intercra"){
            return true;
        }
        return false;
    }

    //intercra upside down (intercra backwards)
    checkUpsideDown(text: string): boolean{
        if(text.toLowerCase() === "arcretni"){
            return true;
        }
        return false;
    }

    checkBirthday(text: string, width: number, height: number){
        if(text.toLowerCase() === "20. february" && width === 2004 && height === 2004){
            return true;
        }
        return false;
    }
}