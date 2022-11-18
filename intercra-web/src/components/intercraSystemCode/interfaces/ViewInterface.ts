export interface ViewInterface{
    setHeadline(headline: string): void;
    setHiddenUrl(url: string): void;
    setVisibleUrl(url: string): void;
    setSub(sub: string): void;
    setImage(imageUrl: string): void;
    setPluginName(pluginName: string): void;
}