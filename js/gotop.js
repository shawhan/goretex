$(function(){
//置顶按钮显示/隐藏实现
    $(window).scroll(function(){
        var w_height = $(window).height();//浏览器高度
        var scroll_top = $(document).scrollTop();//滚动条到顶部的垂直高度
        if(scroll_top > w_height){
                $("#gotop").fadeIn(500);
            }else{
                $("#gotop").fadeOut(500);
        }
    });
    //置顶
    $("#gotop").click(function(e){
        e.preventDefault();
        $(document.documentElement).animate({
            scrollTop: 0
            },200);
        //支持chrome
        $(document.body).animate({
            scrollTop: 0
            },200);
    });
})
