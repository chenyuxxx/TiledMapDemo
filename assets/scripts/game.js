cc.Class({
    extends: cc.Component,

    properties: {
        // tileMap: cc.TiledMap,
        mapNode: cc.Node,
        dialogNode: cc.Node,
    },

    onLoad() {
        let p = cc.director.getPhysicsManager();

        console.log(p);
        p.enabled = true;
        p.debugDrawFlags = true;
        p.gravity = cc.v2(0, 0);
    },

    start() {
        for (let mapNode of this.mapNode.children) {
            let tiledMap = mapNode.getComponent(cc.TiledMap);

            let tiledSize = tiledMap.getTileSize();
            let layer = tiledMap.getLayer('wall');
            let layerSize = layer.getLayerSize();

            for (let i = 0; i < layerSize.width; i++) {
                for (let j = 0; j < layerSize.height; j++) {
                    let tiled = layer.getTiledTileAt(i, j, true);

                    if (tiled.gid != 0) {
                        tiled.node.group = 'wall';

                        let body = tiled.node.addComponent(cc.RigidBody);
                        body.type = cc.RigidBodyType.Static;
                        let collider = tiled.node.addComponent(cc.PhysicsBoxCollider);
                        collider.offset = cc.v2(tiledSize.width / 2, tiledSize.height / 2)
                        collider.size = tiledSize;
                        collider.apply();
                    }
                }
            }
        }

        this.dialog = this.dialogNode.getComponent('dialog');
        // this.dialog.init([
        //     { role: 1, content: '大家好，我是勇者' },
        //     { role: 2, content: '大家好，我是魔王' },
        // ]);
    },

});