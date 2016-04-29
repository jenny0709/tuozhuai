window.onload=function(){
    var box=document.querySelector(".box");
    var bigBox=document.querySelector(".bigbox");
    var lis=bigBox.querySelectorAll("li");
    var inner=bigBox.querySelector("li");
    var iw=inner.offsetWidth;
    var i=0;
    var moveX=0;
    var mousedown,mousemove,mouseup;
    var isTouch='ontouchstart'in window;
    if ('ontouchstart'in window){
        mousedown='touchstart';
        mousemove='touchmove';
        mouseup='touchend';
    }else{
        mousedown='mousedown';
        mousemove='mousemove';
        mouseup='mouseup';
    }
    box.addEventListener(mousedown,function(e){
        e=isTouch?e.changedTouches[0]:e;
        var dx=e.clientX;
        var lenX,mx,fangxiang;
        var startTime= e.timeStamp;
        document.addEventListener(mousemove,move);
        function move(e){
            e.preventDefault();
            e=isTouch?e.changedTouches[0]:e;
            mx= e.clientX;
            lenX=mx-dx;
            fangxiang=lenX>0?'right':'left';
            bigBox.style.transition="none";
            bigBox.style.webkitTransform="translate3d("+(moveX+lenX)+"px,0px,0px)";
        }
        document.addEventListener(mouseup,up);
        function up(e){
            var endTime= e.timeStamp;
            var time=endTime-startTime;
            if(fangxiang=="right"){//right
                wheel(-1);
            }else if(fangxiang=="left"){//left
                wheel(1);
            }
            function wheel(a){
                if(Math.abs(lenX)>iw/2||(time<100)&&(Math.abs(lenX)<40)){
                    i+=a;
                    if(i<0){
                        i=0;
                    }else if(i>lis.length-1){
                        i=lis.length-1;
                    }
                    moveX=-i*iw;
                    bigBox.style.transition="webkitTransform 1s";
                    bigBox.style.webkitTransform="translate3d("+moveX+"px,0px,0px)";
                }else if(Math.abs(lenX)<iw/2){
                    bigBox.style.webkitTransform="translate3d("+moveX+"px,0px,0px)";
                }
            }
            document.removeEventListener(mousemove,move);
            document.removeEventListener(mouseup,up);
        }
    })
};