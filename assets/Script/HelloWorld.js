let Observer = require('Observer');
let ObserverMgr = require('ObserverMgr');
cc.Class({
    extends: Observer,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },
        // defaults, set visually when attaching this script to the Canvas
        text: 'Hello, World!',
        spSheep: cc.Sprite,
        touchLayer: cc.Node,
        _state: null,
  
    },

    _getMsgList(){
        return [
            // GameLocalMsg.Msg.Run
        ];
    },

    _onMsg(msg, data){

    },

    // use this for initialization
    onLoad: function () {
        this._initMsg();
        this.label.string = this.text;
        this._time = 0;
        
        // let node = new cc.Node('Sprite');
        // let sp = node.addComponent(cc.Sprite);

        this.spSheep.node.addComponent('Sheep');


        this.schedule(this.refresh, 1);

        this.touchLayer.on('touchstart', function(event){
            ObserverMgr.dispatchMsg('do', 0);
        }.bind(this));
    },

    // called every frame
    // update: function (dt) {
        
    // },

    doAct(data = 0){//0延迟执行，1立即执行
        console.log(this._state);
        ObserverMgr.dispatchMsg(this._state, data);
    },

    refresh(){
        this._time++;
        console.log(this._time);
        if(this._time === 2){
            ObserverMgr.dispatchMsg('jump', 0);
        } else if(this._time === 4){
            ObserverMgr.dispatchMsg('down', 0);
        } else if(this._time === 6) {
            ObserverMgr.dispatchMsg('jump', 0);
        }
    },

    onBtnClickToJump(){
        this._state = 'jump';
        this.doAct(1);
    },

    onBtnClickToDown(){
        this._state = 'down';
        this.doAct();
    },

    onBtnClickToRun(){
        this._state = 'run';
        this.doAct();
    }
});
