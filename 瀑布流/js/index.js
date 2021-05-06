window.onload = function () {
    waterfall("main","box");
   //动态加载图片
    var timer1=null;
    window.onscroll = function () {
       clearTimeout(timer1);
       timer1 = setTimeout(
           function () {
               //判断是否加载
               if (checkWillLoadImg()) {
                   var ImgArray = [
                       {"src":"img30.jpg"},
                       {"src":"img01.jpg"},
                       {"src":"img03.jpg"},
                       {"src":"img05.jpg"},
                       {"src":"img07.jpg"},
                       {"src":"img09.jpg"},
                       {"src":"img11.jpg"},
                       {"src":"img13.jpg"},
                       {"src":"img15.jpg"}
                   ];
                   //---------
                   for (var i =0 ; i<ImgArray.length ;i++){
                       var newBox = document.createElement("div");
                       newBox.className = 'box';
                       $("main").appendChild(newBox);
                       var newPic = document.createElement("div");
                       newPic.className = 'pic';
                       newBox.appendChild(newPic);
                       var newImg = document.createElement("img");
                       newImg.src = "images/"+ImgArray[i].src;
                       newPic.appendChild( newImg);
                   }
                   waterfall("main","box");
               }
           },200)

    };
    //改变尺寸
    var timer=null;
    window.onresize = function () {
       clearTimeout(timer);
        timer = setTimeout(function () {
            waterfall("main","box");
        },200)
    }
};

//瀑布流布局
function waterfall(parent,child) {
    //居中对齐
    var AllBox = $(parent).getElementsByClassName(child);
    //一行几个盒子
    var col = parseInt(document.documentElement.clientWidth/AllBox[0].offsetWidth);
    $("main").style.width = col * AllBox[0].offsetWidth +'px';
    $("main").style.margin = '0 auto';

    var dataArray=[],minHeight=0,minIndex=0,boxHeight=0;
    for (var i=0; i<AllBox.length;i++) {
        boxHeight = AllBox[i].offsetHeight

        //第一行的元素
        if ( i<col ){
            AllBox[i].style='';
            dataArray.push(boxHeight);
        }
        else{
            //最小值
            minHeight = _.min(dataArray);
            //最小值的索引
            minIndex = minIndexF(dataArray, minHeight);
            AllBox[i].style.position = 'absolute';
            AllBox[i].style.top = minHeight + 'px';
            AllBox[i].style.left = minIndex * AllBox[0].offsetWidth + 'px';
            dataArray[minIndex] +=boxHeight;
        }

    }
}
//最小值的索引
function minIndexF(dataArray,value) {
    for (var i=0; i<dataArray.length;i++){
        if (dataArray[i] == value)
            return i;
    }
}
//获得对象
function $(id) {
    return typeof id == "string"?document.getElementById(id):null;
}
//加载
function checkWillLoadImg() {
    var AllBox =document.getElementsByClassName("box");
    var lastBox = AllBox[AllBox.length-1];

    var BoxH = lastBox.offsetTop + lastBox.offsetWidth*0.5;

    //屏幕的高度
    var screenH = document.documentElement.clientHeight||document.body.clientHeight;
    //滚动高度
    var scrollH = scroll().top;
    console.log("屏幕高度:",screenH,"滚动",scrollH);
    console.log("总高度:<=屏幕高度+滚动高度");
    console.log(BoxH ,"<=",screenH ,"+",scrollH ,"总:",screenH + scrollH);
    return BoxH < (screenH + scrollH);


}