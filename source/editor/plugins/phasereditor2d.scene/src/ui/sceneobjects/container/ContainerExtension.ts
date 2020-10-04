namespace phasereditor2d.scene.ui.sceneobjects {

    import json = core.json;
    import code = core.code;

    export interface IContainerData extends json.IObjectData {

        list: json.IObjectData[];
    }

    export class ContainerExtension extends SceneGameObjectExtension {

        private static _instance: ContainerExtension;

        static getInstance() {
            return this._instance || (this._instance = new ContainerExtension());
        }

        private constructor() {
            super({
                typeName: "Container",
                phaserTypeName: "Phaser.GameObjects.Container",
                iconName: ICON_GROUP
            });
        }

        getCodeDOMBuilder(): GameObjectCodeDOMBuilder {

            return ContainerCodeDOMBuilder.getInstance();
        }

        async getAssetsFromObjectData(args: IGetAssetsFromObjectArgs) {

            const list = [];

            const children = args.serializer.read("list", []) as json.IObjectData[];

            for (const objData of children) {

                const ser = args.serializer.getSerializer(objData);

                const type = ser.getType();

                const ext = ScenePlugin.getInstance().getGameObjectExtensionByObjectType(type);

                if (ext) {

                    const list2 = await ext.getAssetsFromObjectData({
                        serializer: ser,
                        scene: args.scene,
                        finder: args.finder
                    });

                    list.push(...list2);
                }
            }

            return list;
        }

        createDefaultSceneObject(args: ICreateEmptyArgs) {

            return this.createContainerObject(args.scene, 0, 0, []);
        }

        createGameObjectWithData(args: ICreateWithDataArgs): sceneobjects.ISceneGameObject {

            const container = this.createContainerObject(args.scene, 0, 0, []);

            container.getEditorSupport().readJSON(args.data as IContainerData);

            return container;
        }

        private createContainerObject(scene: Scene, x: number, y: number, list: sceneobjects.ISceneGameObject[]) {

            const container = new sceneobjects.Container(scene, x, y, list);

            container.getEditorSupport().setScene(scene);

            scene.sys.displayList.add(container);

            return container;
        }

        createContainerObjectWithChildren(
            scene: Scene, objectList: sceneobjects.ISceneGameObject[]): sceneobjects.Container {

            const container = this.createContainerObject(scene, 0, 0, objectList);

            const name = scene.makeNewName("container");

            container.getEditorSupport().setLabel(name);

            return container;
        }

        acceptsDropData(data: any): boolean {
            return false;
        }

        createSceneObjectWithAsset(args: ICreateWithAssetArgs): sceneobjects.ISceneGameObject {
            return null;
        }
    }
}