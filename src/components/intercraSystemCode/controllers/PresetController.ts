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
        // @ts-ignore
        let value = Object.values(PresetEnum);
        return value;
    }

    getAllPresetKeys(): string[]{
        let key = Object.keys(PresetEnum);
        return key;
    }

    getEnumValueByKey(str: string): PresetEnum{
        // @ts-ignore
        return PresetEnum[str];
    }
}