import {PresetEnum} from "../enums/PresetEnum";

export class PresetController{
    presetList: PresetEnum[] = []

    addPreset(presetName: PresetEnum){
        this.presetList.push(presetName);
    }

    getPresetList(): PresetEnum[]{
        return this.presetList;
    }

    getAllPresetValues(): string[]{
        let value = Object.values(PresetEnum);
        return value;
    }

    getAllPresetKeys(): string[]{
        let key = Object.keys(PresetEnum);
        console.log("enum: " + key)
        return key;
    }

    getEnumValueByString(str: string): PresetEnum{
        // @ts-ignore
        return PresetEnum[str];
    }
}