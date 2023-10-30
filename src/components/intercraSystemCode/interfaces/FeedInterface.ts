import type {PresetController} from "../controllers/PresetController";
import type {PluginLanguageController} from "../controllers/PluginLanguageController";
import type {PluginController} from "../controllers/PluginController";

export interface FeedInterface{
    findFeedContent(pc: PluginController): void;
    findMoreFeedContent(pc: PluginController): void;
    getPluginDisplayName(): string;
    getId(): string;
    getFeedView(): string[];
}
