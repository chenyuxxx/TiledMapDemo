const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property({
        type: dragonBones.ArmatureDisplay
    })
    person = null;

    /**
     * 方向
     */
    _oDirection: {}

    start (){
        console.log(this.person);

        this.person.armatureName = "Sprite";
        this.person.playAnimation("Sprite",0);

        // let Armature = this.person.armature();

    }

    onLoad() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    onKeyUp(e) {
        console.log(e);
        this._oDirection = e.keyCode;
        switch(this._oDirection){
            case cc.macro.KEY.w:
                console.log("1向上");
                break;
            case cc.macro.KEY.a:
                console.log("1向左");
                break;
            case cc.macro.KEY.s:
                console.log("1向下");
                break;
            case cc.macro.KEY.d:
                console.log("1向右");
                break;
        }
        
    }

    onKeyDown(e) {
        this._oDirection = e.keyCode;
        switch(this._oDirection){
            case cc.macro.KEY.w:
                console.log("向上");
                this.node.y += 2;
                break;
            case cc.macro.KEY.a:
                console.log("向左");
                break;
            case cc.macro.KEY.s:
                console.log("向下");
                break;
            case cc.macro.KEY.d:
                console.log("向右");
                break;
        }

    }
}
