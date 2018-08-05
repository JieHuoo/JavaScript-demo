// 邮箱后缀List
var postfixList = ['163.com', 'gmail.com', '126.com', 'qq.com', '263.net'];
var input = document.getElementById("email-input");
var ul = document.getElementById("email-sug-wrapper");
var nowSelectTipIndex = 0;

//监听特殊的3个键盘事件
input.addEventListener("keydown", function(e) {
    if(!(e.keyCode == 13 || e.keyCode == 38 || e.keyCode == 40)) {
        resetStatus();
    }
    if(e.keyCode == 38) { //上移
        ul.childNodes[nowSelectTipIndex].className = "";
        if(nowSelectTipIndex > 0) {
            nowSelectTipIndex -= 1;
        } else {
            nowSelectTipIndex = (ul.childNodes).length - 1;
        }
        ul.childNodes[nowSelectTipIndex].className = "selected";
    }
    if(e.keyCode == 40) {  //下移
        ul.childNodes[nowSelectTipIndex].className = "";
        if(nowSelectTipIndex < ((ul.childNodes).length - 1)) {
            nowSelectTipIndex += 1;
        } else {
            nowSelectTipIndex = 0;
        }
        ul.childNodes[nowSelectTipIndex].className = "selected";
    }
    if(e.keyCode == 13) { //enter键
        for(var i in ul.children) {
            if(ul.children[i].className === "selected") {
                var li = ul.children[i];
            }
        }
        if(li) {
            input.value = htmlDecode(li.innerHTML);
            hide();
            input.focus();
        }
    }
    if(e.keyCode == 27) {  //esc键
        input.select();
    }
}) 

//重置选中状态
function resetStatus() {
    nowSelectTipIndex = 0;
}

//监听用户输入
input.addEventListener("input", function() {
    ul.innerHTML = "";
    isDisplay(input.value);
})

//冒泡事件
ul.addEventListener("click", function(ev) {
    var e = ev ||window.event
    var target = e.target || e.srcElement
    if(target.nodeName.toLowerCase() === 'li') {
        input.value = htmlDecode(target.innerHTML);
        hide(ul);
        input.focus();
    }
}) 

//去除输入内容中前后空格
function getContent(str) {
    while(str.length !== 0) {
        if(str[0]==" "||str[0]=="　") {
            str = str.slice(1);
        } else if(str[str.length-1]==" "||str[str.length-1]=="　") {
            str = str.slice(0,str.length-1);
        } else {
            break;
        }
    }
    //str = str.trim();
    return str;
}

//生成提示框的提示内容
function createTip(str) {
    var value = getContent(str);
    var value1,value2;
    var tip = [];
    var count = 0;
    if(value.indexOf("@") !== -1) {
        value1 = value.slice(0,value.indexOf("@"));
        value2 = value.slice(value.indexOf("@")+1);
    }
    for(var i=0; i<postfixList.length; i++) {
        if(value.indexOf("@") !== -1) {
            if(postfixList[i].indexOf(value2) === 0) {
                tip.push(value1 + "@" + postfixList[i]);
            } else {
                count ++;
            }
            if(count === postfixList.length) {
                for(var j in postfixList) {
                    tip.push(value1 + "@" + postfixList[j]);
                }   
            }
        } 
         else if(value.indexOf("@") === -1) {
            tip[i] = value + "@" + postfixList[i];
        }   
    } 
    return tip;
}

//将提示内容添加到email-sug-wrapper中
function addTip(str) {
    var tip = createTip(str);
    for(var i=0; i<tip.length; i++) {
        var li = document.createElement("li");
        var text = document.createTextNode(tip[i]);
        li.appendChild(text);
        ul.appendChild(li);
    }
    if(str) {
        ul.childNodes[nowSelectTipIndex].className = "selected";
    }
    return ul;
}

//控制email-sug-wrapper的显示/隐藏状态
function isDisplay(str) {
    addTip(str)
    if(getContent(str).length === 0) {
        hide();
    } else {
        show();
    }
}

//隐藏提示框
function hide() {
    ul.style.display = "none";
    ul.style.borderBottom = "none";
}

//显示提示框
function show() {
    ul.style.display = "block";
    ul.style.borderBottom = "solid 1px #ddd";
}

//解码
function htmlDecode(str){  
    var s = "";
    if(str.length == 0) return "";
    s = str.replace(/&amp;/g,"&");
    s = s.replace(/&lt;/g,"<");
    s = s.replace(/&gt;/g,">");
    s = s.replace(/&nbsp;/g," ");
    s = s.replace(/&#39;/g,"\'");
    s = s.replace(/&quot;/g,"\"");
    return s;  
}

 //转码
function htmlEncode(str){  
    var s = "";
    if(str.length == 0) return "";
    s = str.replace(/&/g,"&amp;");
    s = s.replace(/</g,"&lt;");
    s = s.replace(/>/g,"&gt;");
    s = s.replace(/ /g,"&nbsp;");
    s = s.replace(/\'/g,"&#39;");
    s = s.replace(/\"/g,"&quot;");
    return s;  
}

input.focus();
