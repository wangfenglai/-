/**
 * Created by lailai on 6/25/2017.
 */
$(function(){
    var max=$('.max');
    var middleImg = max.find(".middleImg");
    var middle_img=middleImg.find("img");
    var mask =middleImg.find(".mask");
    var bigImg =max.find(".bigImg");
    var big_img=bigImg.find("img");
    var smallImg =max.find(".smallImg");
    var ulImg=smallImg.find('ul');
    var liImg=ulImg.find('li');
    var leftButton = smallImg.find(".left");
    var rightButton = smallImg.find(".right");
    var liWidth=liImg.outerWidth();
    var index =0;
    leftButton.click(function(){
        if(index<=0){
            index=0;
            $(this).addClass("disabled")
        }else {
            rightButton.removeClass("disabled");
            index--;
            ulImg.animate({"left":"+="+(liWidth+20)});
        }
    });
    rightButton.click(function(){
        if(index>=4){
            index=4;
            $(this).addClass("disabled")
        }else {
            leftButton.removeClass("disabled")
            index++;
            ulImg.animate({"left":-index*(liWidth+20)});
        }

    });
    liImg.click(function(){
        $(this).addClass("active").siblings().removeClass("active");
        //./1.jpg
        middle_img.attr("src",  $(this).index()+1+".jpg");
        big_img.attr("src",  $(this).index()+1+".jpg");

        console.log( $(this).index());

    })
    middleImg.on("mousemove",function (e) {
        var mouseX;
        var mouseY;
        var eve =e || window.event;
        mask.show();
        bigImg.show();
        mouseX = eve.pageX;
        mouseY =eve.pageY;
        var x=mouseX -40-middleImg.offset().left;
        var y= mouseY -40 -middleImg.offset().top;
        if(x<0){
            x=0
        }else if(x>middleImg.width()-mask.width()){
            x=middleImg.width()-mask.width();
        }
        if(y<0){
            y=0
        }else if(y>middleImg.height()-mask.height()){
            y=middleImg.height()-mask.height()
        }
        var percentX=x/($(this).width()-mask.width());
        var percentY=y/($(this).height()-mask.height());

        big_img.css("left",-percentX*(600-bigImg.width()));
        big_img.css("top",-percentY*(600-bigImg.height()));
        mask.css("left",x);
        mask.css("top",y);
    });



    middleImg.on("mouseout",function () {
        mask.hide();
        bigImg.hide()
    });
    mask.on("mouseover",function () {
        $(this).css("opacity","0.8")
    });
    function move(){

    }





})