window.onload = function () {
    var nowIndex = 0;
    var imgList = $("scroll_main").children;
    var next = $("scroll_ctl").getElementsByClassName("scroll_ctl_next")[0];
    for (var i=0; i<imgList.length;i++){
        var span = document.createElement("span");
        span.className = 'scroll-ctl-icon';
        span.innerText = i;
        $("scroll_ctl").insertBefore(span,next);
    }
    var IconList = $("scroll_ctl").children;
    //第一个按钮选中
    IconList[1].className = 'scroll-ctl-icon current';
    //定位:除了第一张
    var box_Width = $("box").offsetWidth;
    for (var i=1; i<imgList.length;i++){
        imgList[i].style.left = box_Width +'px';
    }
    //点击事件
    for (var i=0; i<IconList.length;i++){
        //上一张
        IconList[i].onclick = function () {
            if (this.className == 'scroll_ctl_pre') {
                buffer(imgList[nowIndex],{"left":box_Width});
                nowIndex--;
                if (nowIndex <0 ){
                    nowIndex = imgList.length-1;
                }
                imgList[nowIndex].style.left = - box_Width +'px';
                buffer(imgList[nowIndex],{"left":0});
            }
            //下一张
            else if (this.className == 'scroll_ctl_next') {
                autoPlay()
            }
            //点击下方的按钮
            else{//Index点击的页数
                var Index = parseInt( this.innerText);
                if (Index > nowIndex){
                    buffer(imgList[nowIndex],{"left":-box_Width});
                    imgList[Index].style.left = box_Width +'px';
                }else if(Index < nowIndex){
                    buffer(imgList[nowIndex],{"left":box_Width});
                    imgList[Index].style.left = - box_Width +'px';
                }
                buffer(imgList[Index],{"left":0});
                nowIndex = Index;
            }
            //改变按钮
            changeIndex();
       }

    }
    //改变按钮状态
    function changeIndex() {
        for (var i=1; i<IconList.length-1;i++){
            IconList[i].className = 'scroll-ctl-icon';

        }
        IconList[nowIndex+1].className = 'scroll-ctl-icon current';
    }
    //自动播放
    var timer = setInterval(autoPlay,1000);
    function autoPlay() {
        buffer(imgList[nowIndex],{"left":-box_Width});
        nowIndex++;
        if (nowIndex > imgList.length-1){
            nowIndex = 0;
        }
        imgList[nowIndex].style.left = box_Width +'px';
        buffer(imgList[nowIndex],{"left":0});
        changeIndex();
    }
    //监听鼠标的离开和进入
    $("scroll").onmouseover = function () {
        clearInterval(timer);
    }
    $("scroll").onmouseleave = function () {
        timer = setInterval(autoPlay,1000);
    }

};
