let Observer = require('Observer');
cc.Class({
    extends: Observer,

    properties: {
        prefab2: cc.Prefab
    },

    _getMsgList(){
        return [

        ];
    },

    _onMsg(msg, data){

    },
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this._initMsg();
        cc.loader.loadRes('prefab1', function(err, prefab){
            this.newNode = cc.instantiate(prefab);
            this.node.addChild(this.newNode);
        }.bind(this));
        this.addPrefab(this.newNode);
    },

    start () {

    },

    // update (dt) {},
    addPrefab(node){
        let nodeItem = cc.instantiate(this.prefab2);
        console.log(this.newNode);
        this.newNode.addChild(nodeItem);
    }
});
