module.exports = {
    animArr: [],
    index: 0,
    Sheep:['run', 'jump', 'down'],
    getAct(scriptName){
        return this[scriptName];
    }
}