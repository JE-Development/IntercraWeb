import type {PresetController} from "../controllers/PresetController";
import type {PluginLanguageController} from "../controllers/PluginLanguageController";
import type {PluginController} from "../controllers/PluginController";

export interface PluginInterface{
    findContent(searchText: string, countryUrl: string, pc: PluginController): void;
    findMoreContent(searchText: string, countryUrl: string): void;
    isFinish(): boolean;
    getContentList(): Map<string, string>[];
    getPluginDisplayName(): string;
    getId(): string;
    getError(): boolean;
    getErrorText(): string;
    addToPreset(): PresetController;
    getPluginLanguage(): PluginLanguageController
    hasSettings(): boolean;
    setFinishFalse(): void;
    getView(): string[];
}
