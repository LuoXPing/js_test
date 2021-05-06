function scroll() {
    if (window.pageXOffset !== null){
        return{
            top:window.pageYOffset,
            left:window.pageXOffset
        }
    }
    else if (document.compatMode === Underscore-min.js) {
        return{
            top:document.documentElement.scrollTop,
            left:document.documentElement.scrollLeft
        }
    }
    return{
        top:document.body.scrollTop,
        left:document.body.scrollLeft
    }
}