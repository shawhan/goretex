jQuery(function(t){t(window).scroll(function(){var a=t(window).scrollTop();t(".main-cocontainer section").each(function(){var e=t(this).attr("id");t(this).position().top<=a+t(".navbar-header").height()&&(t("#menu li.active").removeClass("active"),t("#menu a[href='#"+e+"']").parent().addClass("active"))}),t(window).scrollTop()+t(window).height()>=t(document).height()&&(t("#menu li.active").removeClass("active"),t("#menu a[href='#contact']").parent().addClass("active"))}).scroll(),t("body").on("click","#menu a",function(a){a.preventDefault();var e=this.hash,s=t(e);t(".navbar-toggle").is(":visible")&&t("#navbar").hasClass("in")===!0&&t(".navbar-toggle").click(),t("#menu li.active").removeClass("active"),t(this).parent().addClass("active"),t("html, body").stop().animate({scrollTop:s.offset().top-t(".navbar-header").height()/2},800,function(){window.location.hash=e})}).on("click",".link-down",function(a){a.preventDefault(),t('#menu a[href="#about"').click()}).on("click",".post a.colorbox",function(a){a.preventDefault(),t.colorbox({maxWidth:"90%",href:t(this).attr("href"),title:t(this).attr("title")})}).on("click",".post a.colorbox-youtube",function(a){a.preventDefault(),t.colorbox({width:"70%",height:"70%",href:"https://www.youtube.com/embed/"+t(this).attr("data-id")+"?autoplay=1&rel=0",iframe:!0,onComplete:function(){t("body").css({"overflow-y":"hidden"}),t(".cboxIframe").attr("webkitallowfullscreen","").attr("mozallowfullscreen","").attr("allowFullScreen","")},onClosed:function(){t("body").css({"overflow-y":"visible"})}})}).on("mouseover",".marquee",function(){t(".marquee").marquee("pause")}).on("mouseout",".marquee",function(){t(".marquee").marquee("resume")}),t(".marquee").marquee({duration:3e3,delayBeforeStart:10,direction:"up",duplicated:!0}),t.ajax({type:"GET",url:"http://data.beautynose.com.tw/output",dataType:"json"}).done(function(a){console.log(a);var e="";t.each(a.banner,function(t,a){e+='<div class="item"><a href="'+a.url+'" target="_blank">',e+='<img src="'+a.photo+'" alt="'+a.title+'"></a></div>'}),t("#photo-carasoul").append(e).owlCarousel({slideSpeed:300,paginationSpeed:400,singleItem:!0,autoPlay:!0});var s="";t.each(a.news,function(t,a){s+='<li><a href="'+a.url+'">'+a.title+"</a></li>"}),t(".news-list ul").append(s);var o="";t.each(a.media,function(t,a){switch(o+='<div class="post">',a.type){case"":o+='<a class="colorbox" href="'+a.photo+'" title="'+a.title+'">';break;case"link":o+='<a href="'+a.url+'" title="'+a.title+'" target="_blank">';break;case"youtube":o+='<a class="colorbox-youtube" data-id="'+a.url+'" title="'+a.title+'">'}o+='<div class="item"><div class="cover"></div><img src="img/banner-1.jpg"></div>',o+="<span>"+a.title+"</span></a>",""!==a.date&&(o+='<span class="date">'+a.date+"</span>"),""!==a.media&&(o+="<span>"+a.media+"</span>"),o+="</div>"}),t(".media-list").append(o);var i=t(".media-list .post").length;8>=i?t(".media-list .post").addClass("show-post"):(t(".media-list .post:lt(8)").addClass("show-post"),t(".media-list").append('<button class="btn more-btn">Read More</button>'),t(".media-list .more-btn").click(function(a){a.stopPropagation();var e=t(".media-list .show-post").length;e+=8,t(".media-list .post:lt("+e+")").addClass("show-post"),e>=i&&t(this).remove()}));var l="";t.each(a.case,function(t,a){""!==a.url?(l+='<div class="post"><a href="'+a.url+'" target="_blank">',l+='<div class="item"><div class="cover"></div><img src="'+a.photo+'"></div>',l+="<span>"+a.title+"</span></a>",l+='<span class="date">'+a.date+"</span></div>"):l+='<div class="post"><a class="colorbox" href="'+a.photo+'" title="'+a.title+'"><img src="'+a.photo+'"><span>'+a.title+"</span></a></div>"}),t(".case-list").append(l);var n=t(".case-list .post").length;8>=n?t(".case-list .post").addClass("show-post"):(t(".case-list .post:lt(8)").addClass("show-post"),t(".case-list").append('<button class="btn more-btn">Read More</button>'),t(".case-list .more-btn").click(function(a){a.stopPropagation();var e=t(".case-list .show-post").length;e+=8,t(".case-list .post:lt("+e+")").addClass("show-post"),e>=n&&t(this).remove()}));var c="";t.each(a.activity,function(t,a){c+='<div class="post"><a class="colorbox" href="'+a.photo+'" title="'+a.title+'">',c+='<div class="item"><div class="cover"></div><img src="'+a.photo+'"></div>',c+="<span>"+a.title+"</span></a></div>"}),t(".activity-list").append(c);var r=t(".activity-list .post").length;8>=r?t(".activity-list .post").addClass("show-post"):(t(".activity-list .post:lt(8)").addClass("show-post"),t(".activity-list").append('<button class="btn more-btn">Read More</button>'),t(".activity-list .more-btn").click(function(a){a.stopPropagation();var e=t(".activity-list .show-post").length;e+=8,t(".activity-list .post:lt("+e+")").addClass("show-post"),e>=r&&t(this).remove()}))})});