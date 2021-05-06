/**
 * 获取滚动的头部距离和左边距离
 * scroll().top scroll().left
 * @returns {*}
 */
function scroll() {
    if(window.pageYOffset !== null){
        return {
            top: window.pageYOffset,
            left: window.pageXOffset
        }
    }else if(document.compatMode === "CSS1Compat"){ // W3C
        return {
            top: document.documentElement.scrollTop,
            left: document.documentElement.scrollLeft
        }
    }

    return {
        top: document.body.scrollTop,
        left: document.body.scrollLeft
    }
}


function $(id) {
    return typeof id === "string" ? document.getElementById(id) : null;
}

/**
 * 获取屏幕的宽度和高度
 * @returns {*}
 */
function client() {
    if(window.innerWidth){ // ie9+ 最新的浏览器
        return {
            width: window.innerWidth,
            height: window.innerHeight
        }
    }else if(document.compatMode === "CSS1Compat"){ // W3C
        return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        }
    }

    return {
        width: document.body.clientWidth,
        height: document.body.clientHeight
    }
}


/**
 *  匀速动画函数
 * @param {object}obj
 * @param {number}target
 * @param {number}speed
 */
function constant(obj,target,speed) {
    obj.timer = null;
    clearInterval(obj.timer);
    var dir = target - obj.offsetLeft > 0 ?speed:-speed;
    obj.timer = setInterval(function () {
        obj.style.left =  obj.offsetLeft + dir +'px';
        if ( Math.abs(target-obj.offsetLeft)<= speed){
            clearInterval(obj.timer);
            obj.style.left = target +'px';
        }},20)

}
function getCSSAttrValue(obj,attr) {
    if (obj.crrentStyle){
        return obj.crrentStyle[attr];
    }else{
        return window.getComputedStyle(obj,null)[attr];
    }
    
}

function bubble(obj,json,fn) {
    var begin = 0,speed=0,target=0;

    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var flag=true;
        for (var key in json){

            if (key == "opacity") {
                begin = Math.round(parseFloat(getCSSAttrValue(obj,key))*100||100);
                target = json[key]*100;
            }
            else{
                begin = parseInt(getCSSAttrValue(obj,key))||0;
                target = json[key];
            }

            speed =  (target - begin )*0.2;
            speed = target - begin >0?Math.ceil(speed):Math.floor(speed);
            if (key == "opacity"){
                obj.style.opacity = (begin + speed )/100;
                obj.style.filter = 'alpha(opacity:' + (begin + speed) +')';
            }
            else {
                obj.style[key] = begin + speed + 'px';
            }
            if (begin !== target){
                flag = false;
            }
        }
        if(flag){
            clearInterval(obj.timer);
            if (fn){
                fn();
            }
        }
    },20);

}
