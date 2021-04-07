let roleMap = {
    1: {
        name: '勇者',
        url: 'role/21'
    },
    2: {
        name: '魔王',
        url: 'role/23'
    },
};

cc.Class({
    extends: cc.Component,

    properties: {
        picSprite: cc.Sprite,
        nameLabel: cc.Label,
        textLabel: cc.Label
    },

    onLoad() {
        window.dialog = this.node;

        cc.systemEvent.on('keydown', this.onKeydown, this);
    },

    onDestory() {
        cc.systemEvent.on('keydown', this.onKeydown, this);
    },

    onKeydown(e) {
        switch (e.keyCode) {
            case cc.macro.KEY.space:
                {
                    this.nextTextData();
                    break;
                }
        }
    },

    init(textDataArr) {
        this.nowText = null;
        this.textEnd = true;
        this.tt = 0;


        this.textIndex = -1;
        this.textDataArr = textDataArr;
        this.node.active = true;
        this.nextTextData();
    },

    nextTextData() {
        if (!this.textEnd) return;
        if (++this.textIndex < this.textDataArr.length) {
            this.setTextData(this.textDataArr[this.textIndex]);
        } else {
            this.closeDialog();
        }
    },

    setTextData(textData) {
        if (!this.textEnd) return;
        this.textEnd = false;


        this.nameLabel.string = roleMap[textData.role].name;
        this.textLabel.string = '';
        this.nowText = textData.content;

        cc.loader.loadRes(roleMap[textData.role].url, cc.SpriteFrame, (err, texture) => {
            this.picSprite.spriteFrame = texture;
        });
    },

    closeDialog() {
        this.node.active = false;
    },

    update(dt) {
        if (!this.nowText) return;
        this.tt += dt;

        if (this.tt >= 0.1) {
            if (this.textLabel.string.length < this.nowText.length) {
                this.textLabel.string = this.nowText.slice(0, this.textLabel.string.length + 1);
            } else {
                this.textEnd = true;
                this.nowText = false;
            }
            this.tt = 0;
        }
    }
});