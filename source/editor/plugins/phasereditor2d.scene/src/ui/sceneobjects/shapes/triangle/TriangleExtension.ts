namespace phasereditor2d.scene.ui.sceneobjects {

    export class TriangleExtension extends SceneGameObjectExtension {

        private static _instance: TriangleExtension;

        static getInstance() {
            return this._instance ? this._instance : (this._instance = new TriangleExtension());
        }

        constructor() {
            super({
                icon: ScenePlugin.getInstance().getIconDescriptor(ICON_GROUP),
                phaserTypeName: "Phaser.GameObjects.Triangle",
                typeName: "Triangle"
            });
        }

        getBlockCellRenderer() {

            return TriangleBlockCellRenderer.getInstance();
        }


        acceptsDropData(data: any): boolean {

            return false;
        }

        createSceneObjectWithAsset(args: ICreateWithAssetArgs): ISceneGameObject {

            // not supported

            return null;
        }

        createGameObjectWithData(args: ICreateWithDataArgs): ISceneGameObject {

            const obj = new Triangle(args.scene, 0, 0);

            obj.getEditorSupport().readJSON(args.data as any);

            return obj;
        }

        createDefaultSceneObject(args: ICreateDefaultArgs): ISceneObject[] {

            const obj = new Triangle(args.scene, args.x, args.y);

            obj.isFilled = true;

            return [obj];
        }

        async getAssetsFromObjectData(args: IGetAssetsFromObjectArgs): Promise<any[]> {

            return [];
        }

        getCodeDOMBuilder() {

            return new TriangleCodeDOMBuilder();
        }
    }
}