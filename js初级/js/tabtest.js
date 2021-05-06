window.onload = function () {
    var liList = $("box-header").getElementsByTagName("li");
    var Alldom = $("box-body").getElementsByClassName("dom");
    for (var i=0;i<liList.length;i++){
        var sli = liList[i];
        sli.index = i;
        sli.onmouseover = function () {
            for (var j=0;j<liList.length;j++){
                liList[j].className = '';
                Alldom[j].style.display = "none";
            }
            this.className = "selected";
            Alldom[this.index].style.display = "block";

        }
    }
};

function $(id) {
    return typeof id == 'string'?document.getElementById(id):null;

};