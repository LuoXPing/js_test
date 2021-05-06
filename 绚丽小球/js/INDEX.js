function Ball(options) {
    this._init(options);
}
Ball.prototype ={
    /*初始化*/
    _init:function (options) {
        this.top = options.Y;
        this.left = options.X;
        this.r = 60;
        this.backgc = options.bac || 'red';
        this.borderR = 30;
        this.parentId = options.parentId;
    },
    /*绘制圆*/
    play:function () {
        var parent = document.getElementById(this.parentId);
        var ball = document.createElement("div");
        ball.style.width = this.r +'px';
        ball.style.height = this.r +'px';
        ball.style.position = 'absolute';
        ball.style.left = this.left+'px';
        ball.style.top = this.top+'px';
        ball.style.backgroundColor = this.backgc;
        ball.style.borderRadius = this.borderR +'px';
        parent.appendChild(ball);
    },
    /*改变*/
    change:function () {
        this.top += _.random(-5,5);
        this.left += _.random(-5,5);
        this.r -= _.random(1,3);
        if ( this.r <0){
            this.r=0;
            BallArr = _.without(BallArr, this);
        }

    }
};