let Observer = require('Observer');
let AnimModule = require('AnimModule');
cc.Class({
    extends: Observer,

    properties: {
        animArr: [],
        _curState: null,
        _index: 0,
        
    },

    // LIFE-CYCLE CALLBACKS:
    _getMsgList(){
        // return [
        //     GameLocalMsg.Msg.Down,
        //     GameLocalMsg.Msg.Jump,
        //     GameLocalMsg.Msg.Run,
        //     'do'
        // ];
        return this.newArr;
    },

    _onMsg(msg, data){
        console.log(msg);
        this._data = data;
        this.playAct(msg, data);
        // if(msg === GameLocalMsg.Msg.Run){
        //     if(data === 1){
                
        //     } else {
        //         this.animArr.push('run');
        //     }
        // } else if(msg === GameLocalMsg.Msg.Jump){
        //     if(data === 1){
        //         this.playAnimNow('jump');
        //     } else {
        //         this.animArr.push('jump');
        //         // this.playAnim();
        //     }
        // } else if(msg === GameLocalMsg.Msg.Down){
        //     if(data === 1){
        //         this.playAnimNow('down');
        //     } else {
        //         this.animArr.push('down');
        //         // this.playAnim();
        //     }
        // } else if(msg === 'do'){
        //     this.playAnim();
        // }
    },
    onLoad () {
        
        this.animArr = AnimModule.animArr;
        this._index = AnimModule.index;
        let arr = AnimModule.getAct('Sheep');
        this.newArr = arr.concat('do');
        this._initMsg();

        this.node.addComponent(cc.Animation);
        console.log(this.node.getComponent(cc.Animation));
        
        cc.loader.loadRes('path', cc.SpriteFrame, function(err, spriteFrame){
            
        })
    },

    start () {

    },

    // update (dt) {},

    run(){
        // this.node.getComponent(cc.Animation).play('jump');
    },

    playAnim(){  
        console.log(this.animArr[this._index]);
        if(this.animArr[this._index]!==undefined){
            this._curState = this.node.getComponent(cc.Animation).play(this.animArr[this._index]);
        } else {
            this._curState = this.node.getComponent(cc.Animation).play(this.newArr[0]);
        }
        
        this._curState.on('finished', this.onComplete, this);
    },

    onComplete(){
        if(this._data === 1){
            this.node.getComponent(cc.Animation).play(this.newArr[0]);
        } else {
            this._index++;
            this.playAnim();
        }
    },

    playAnimNow(name){
        this._index = 0;
        this.animArr = [];
        this._curState = this.node.getComponent(cc.Animation).play(name);
        this._curState.on('finished', this.onComplete, this);
    },

    playAct(msg, data){
        for (const item of this.newArr) {
            if(item !== 'do'){
                if(msg === item){
                    if(data === 1){
                        this.playAnimNow(item);
                    } else {
                        this.animArr.push(item);
                    }
                }
            } else{
                if(msg === item){
                    console.log('>>>>');
                    console.log(this.animArr);
                    this.playAnim();
                }
            }
        }
    }
});
