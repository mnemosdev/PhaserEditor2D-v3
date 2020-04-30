declare namespace phasereditor2d.blocks {
    const ICON_BLOCKS = "blocks";
    class BlocksPlugin extends colibri.Plugin {
        private static _instance;
        static getInstance(): BlocksPlugin;
        private constructor();
        registerExtensions(reg: colibri.ExtensionRegistry): void;
        refreshBlocksView(): Promise<void>;
    }
}
declare namespace phasereditor2d.blocks.ui.views {
    import ide = colibri.ui.ide;
    class BlocksView extends ide.EditorViewerView {
        static EDITOR_VIEWER_PROVIDER_KEY: string;
        constructor();
        getViewerProvider(editor: ide.EditorPart): ide.EditorViewerProvider;
    }
}
//# sourceMappingURL=phasereditor2d.blocks.d.ts.map