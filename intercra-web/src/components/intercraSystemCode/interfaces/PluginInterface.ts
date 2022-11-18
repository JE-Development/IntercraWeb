import type {ViewController} from "@/src/components/intercraSystemCode/controllers/ViewController";
import type {PresetController} from "@/src/components/intercraSystemCode/controllers/PresetController";
import type {PluginLanguageController} from "@/src/components/intercraSystemCode/controllers/PluginLanguageController";

export interface PluginInterface{
    findContent(searchText: string, countryUrl: string): void;
    findMoreContent(searchText: string, countryUrl: string): void;
    getView(): ViewController[];
    isFinish(): boolean;
    getContentList(): Map<string, string>;
    getPluginDisplayName(): string;
    getId(): string;
    getError(): boolean;
    getErrorText(): string;
    addToPreset(): PresetController;
    getPluginLanguage(): PluginLanguageController
    hasSettings(): boolean;
    setFinishFalse(): void;
}
