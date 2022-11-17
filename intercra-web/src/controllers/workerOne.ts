import type {PluginInterface} from "@/src/interfaces/PluginInterface";

class TestPlugin implements PluginInterface{
    findContent(searchText: string, countryUrl: string): void {
    }

    findMoreContent(searchText: string, countryUrl: string): void {
    }

}