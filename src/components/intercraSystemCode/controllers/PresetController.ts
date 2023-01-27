import type {PresetEnum} from "../enums/PresetEnum";

export class PresetController{
    presetList: PresetEnum[] = []

    addPreset(presetName: PresetEnum){
        this.presetList.push(presetName);
    }

    getPresetList(): PresetEnum[]{
        return this.presetList;
    }
}