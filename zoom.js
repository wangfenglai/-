/**
 * Created by BIN on 2016/12/24.
 */
$(function () {
     var smallImgLi = $('.wrapSmallImg ul li');
    var smallImgLiLengh = smallImgLi.size();
    //alert(smallImgLiLengh)
    var smallImgLiWidth = smallImgLi.outerWidth(true);
    //alert(smallImgLiWidth)
    var smallImgUl = $('.wrapSmallImg ul');
    var leftBtn = $('span.left');
    var rightBtn = $('span.right'); 
    var middleDiv = $('.middle'); 
    var now  =0;
    smallImgUl.css('width',600);
    // 鼠标移入li(小图)
    smallImgLi.mouseover(function () {
        // 鼠标经过li  添加class（当前的li添加current类 去除li兄弟元素的current类）
        $(this).addClass('current').siblings().removeClass('current'); 
        // 记录当前图片的src属性
        var thisSrc = $(this).children('img').attr('src');
        //  将当前图片的src 赋值给中图的src 
        $('.middle img').attr('src',thisSrc);
        // 改变放大镜div图片的src
        $('.zoomLarge img').attr('src',thisSrc);
    });
    
    // 点击右边按钮，滚动ul
    rightBtn.click(function () {
        // 删除左边按钮的disable 
      leftBtn.removeClass('disable');
      // now 控制是否到达最后一张图片，div中共显示4个li
        if(now==smallImgLiLengh-4){
            $(this).addClass('disable');
            now = smallImgLiLengh-4;
        }else{
            now++;
            // 改变ul 的left 值
            smallImgUl.animate({"left": -now*smallImgLiWidth})
        }
    });
    
    leftBtn.click(function () {
        rightBtn.removeClass('disable');
        if(now==0){
            $(this).addClass('disable');
            now =0;
        }else{
            now--;
            smallImgUl.animate({"left": '+='+smallImgLiWidth})
        }
    })
  

  // 放大镜
   
   middleDiv.mousemove(function(e){
       // 鼠标移入显示放大镜及大图
        $('.mask').show();
        $('.zoomLarge').show();

        // 计算鼠标位置在放大镜中央
      var middleDivOffset = middleDiv.offset();
        var x = e.pageX - middleDivOffset.left - $('.mask').width()/2;
        var y = e.pageY - middleDivOffset.top - $('.mask').height()/2;
        // 限定放大镜移动范围
        if(x<=0){
            x=0;
        }else if(x>=middleDiv.width()-$('.mask').width()){
            x = middleDiv.width()-$('.mask').width();
        } 
        if(y<=0){
            y=0;
        }else if(y>=middleDiv.height()-$('.mask').height()){
            y = middleDiv.height()-$('.mask').height();
        }

        // 计算放大镜移动位置比例
        var percentageX = x/(middleDiv.width()-$('.mask').width());
        var percentageY = y/(middleDiv.height()-$('.mask').height());
   
        //  计算大图移动位置（ 放大镜移动位置比较与大图移动位置比相等）
        $('.zoomLarge img').css({
            left:-percentageX*(600-$('.zoomLarge').width()),
            top:-percentageY*(600-$('.zoomLarge').height())
        }); 

        //  改变大图位置
        $('.mask').css({
            'left':x+'px',
            'top':y+'px'
        });
    });

    // 鼠标移出 中图div 隐藏放大镜、大图
    middleDiv.mouseout(function(){
        $('.mask').hide();
        $('.zoomLarge').hide();
       
    });

    
})