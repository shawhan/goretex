jQuery(function($){
  var SortByCreate = function (a, b){
    if (a.sort == b.sort) {
      var a_create = new Date(`${a.create}:00+08:00`);
      var b_create = new Date(`${b.create}:00+08:00`);

      if (a_create === b_create) {
        return 0;
      }
      return a_create < b_create ? 1 : -1;
    }
    return a.sort > b.sort ? 1 : -1;
  }

  var now = moment().format('X');
  var end = moment("2017-04-30 23:59:59").format('X');
  if (now <= end) {
    //報名尚未截止
    $('#top').addClass('show');
  }

  var search = window.location.search.substring(1);
  if( search !== '') {
    var query = search ? JSON.parse('{"' + window.location.search.substring(1).replace(/&/g, '","').replace(/=/g,'":"') + '"}',
        function(key, value) {
            return key === "" ? value : decodeURIComponent(value)
        }
    ) : {};
    if (query.hasOwnProperty('post_id') && query.post_id.length !== 0) {
      alert('表單送出成功！');
      window.location.search = "";
    }
  }

  $('img.bg, img.title-image').each(function(i) {
    var url = $(this).attr('src').replace('/mobile/', '/pc/');
    if (window.matchMedia("screen and (max-width: 667px)").matches) {
      url = $(this).attr('src').replace('/pc/', '/mobile/');
    }

    $(this).attr('src', url);
  });

  $('.beauty iframe').load(function() {
      var h = this.contentWindow.document.body.offsetHeight + 10;
      $('.beauty').css('height', h);
  });

  $(window).scroll(function() {
    var windowScroll = $(window).scrollTop();
    $('.main-cocontainer section').each(function(i) {
        var id = $(this).attr("id");
        if ($(this).position().top <= (windowScroll + $('.navbar-header').height()) ) {
            $("#menu li.active").removeClass('active');
            $("#menu a[href='#"+id+"']").parent().addClass('active');
        }
    });

    if ($(window).scrollTop() + $(window).height() >= $(document).height()) {
      $("#menu li.active").removeClass('active');
      $("#menu a[href='#contact']").parent().addClass('active');
    }
  }).scroll();

  window.onresize = function(e) {
    $('img.bg, img.title-image').each(function(i) {
      var url = $(this).attr('src').replace('/mobile/', '/pc/');
      if (window.matchMedia("screen and (max-width: 667px)").matches) {
        url = $(this).attr('src').replace('/pc/', '/mobile/');
      }

      $(this).attr('src', url);
    });
  }

  $('body').on('click', '#menu a', function(e){
    e.preventDefault();
    var hash = this.hash;
    var target = $(hash);

    if($(".navbar-toggle").is(":visible") && $("#navbar").hasClass("in") === true){
      $(".navbar-toggle").click();
    }

    $("#menu li.active").removeClass('active');
    $(this).parent().addClass('active');

    $('html, body').stop().animate({
      'scrollTop': target.offset().top - ($('.navbar-header').height()/2)
    }, 800, function () {
      window.location.hash = hash;
    });
  }).on("click", "#photo-carasoul a", function(e){
    e.preventDefault();
    var link = $(this).attr('href');
    var link_array = ["#case","#about","#qa","#media","#activity","#contact"];
    if (link !== "") {
      if (link_array.indexOf(link) !== -1) {
          $('#menu a[href="'+link+'"]').click();
        } else {
          window.open(link,'_blank');
        }
    }
  }).on("click", "#top", function(e){
    e.preventDefault();
    $('#menu a[href="#form"').click();

  }).on("click", ".link-down", function(e){
    e.preventDefault();
    $('#menu a[href="#about"').click();

  }).on("click", ".post a.colorbox", function(e){
    e.preventDefault();
    if (window.matchMedia("screen and (max-width: 667px)").matches) {
      window.open($(this).attr('href'),'_blank');
    } else {
      $.colorbox({
        'maxWidth': '90%',
        'href' : $(this).attr('href'),
        'title' : $(this).attr('title'),
      });
    }
  }).on("click", ".post a.colorbox-youtube", function(e){
    e.preventDefault();
    $.colorbox({
        'width' : '70%',
        'height' : '70%',
        'href' : 'https://www.youtube.com/embed/'+$(this).attr('data-id')+'?autoplay=1&rel=0',
        'iframe' : true,
        'onComplete': function() {
            $("body").css({"overflow-y":"hidden"});
            $(".cboxIframe").attr('webkitallowfullscreen', '').attr('mozallowfullscreen', '').attr('allowFullScreen', '');
        },
        'onClosed' : function() {
            $("body").css({"overflow-y":"visible"});
        }
    });
  });

  $.ajax({
      type: "GET",
      url: "http://data.beautynose.com.tw/output",
      dataType: 'json',
  }).done(function (data) {
    var banner_html = "";
    data.banner.sort(SortByCreate);
    $.each(data.banner, function(k, v){
      banner_html += '<div class="item"><a href="'+v.url+'" target="_blank">';
      banner_html += '<img src="'+v.photo+'" alt="'+v.title+'"></a></div>';
    });

    $('#photo-carasoul').append(banner_html).owlCarousel({
      slideSpeed : 300,
      paginationSpeed : 400,
      singleItem: true,
      autoPlay: true
    });

    var news_html = "";
    var news_count = data.news.length;
    data.news.sort(SortByCreate);

    $.each(data.news, function(k, v){
      news_html += '<a href="'+v.url+'">'+v.title+'</a>';
    });
    while(news_count < 5) {
      news_html += news_html;
      news_count++;
    }

    $('.marquee').append(news_html).marquee({
      duration: 16000,
      duplicated: true,
      pauseOnHover: true
    });

    var media_html = "";
    data.media.sort(SortByCreate);
    $.each(data.media, function(k, v){
      if (typeof(v.media) === "undefined") {
        v.media = "";
      }
      if (typeof(v.date) === "undefined") {
        v.date = "";
      }

      media_html += '<div class="post">';
      switch(v.type) {
        case '':
          media_html += '<a class="colorbox" href="'+v.photo+'" title="'+v.title+'">';
        break;
        case 'link':
          media_html += '<a href="'+v.url+'" title="'+v.title+'" target="_blank">';
        break;
        case 'youtube':
          media_html += '<a class="colorbox-youtube" data-id="'+v.url+'" title="'+v.title+'">';
        break;
      }
      media_html += '<div class="item"><div class="cover"></div><img src="'+v.cover+'"></div>';
      if (v.media !== "" ||  v.date !== "") {
        media_html += '<span class="media">'+v.media+'</span>';
        media_html += '<span class="date">'+v.date+'</span>';
      }
      media_html += '<span class="title">'+v.title+'</span>';
      if ("summary" in v && v.summary !== "") {
        if (v.summary.length > 39) {
          v.summary = v.summary.slice(0, 39) + '⋯⋯';
        }
        media_html += '<span class="summary">'+v.summary+'</span>';
      }
      media_html += '</a></div>';
    });
    $('.media-list').append(media_html);

    var media_count = $('.media-list .post').length;
    if (media_count <= 8) {
      $('.media-list .post').addClass('show-post');
    } else {
      $('.media-list .post:lt(8)').addClass('show-post');
      $('.media-list').append('<button class="btn more-btn white">Read More</button>');

      $('.media-list .more-btn').click(function(e){
        e.stopPropagation();
        var offset = $('.media-list .show-post').length;
        offset += 8;

        $('.media-list .post:lt('+offset+')').addClass('show-post');
        if (offset >= media_count) {
          $(this).remove();
        }
      });
    }

    var case_html = "";
    data.case.sort(SortByCreate);
    $.each(data.case, function(k, v){
      if (typeof(v.media) === "undefined") {
        v.media = "";
      }
      if (typeof(v.date) === "undefined") {
        v.date = "";
      }

      case_html += '<div class="post">';
      switch(v.type) {
        case '':
          case_html += '<a class="colorbox" href="'+v.photo+'" title="'+v.title+'">';
        break;
        case 'link':
          case_html += '<a href="'+v.url+'" title="'+v.title+'" target="_blank">';
        break;
        case 'youtube':
          case_html += '<a class="colorbox-youtube" data-id="'+v.url+'" title="'+v.title+'">';
        break;
      }
      case_html += '<div class="item"><div class="cover"></div><img src="'+v.cover+'"></div>';
      if (v.media !== "" ||  v.date !== "") {
        case_html += '<span class="media">'+v.media+'</span>';
        case_html += '<span class="date">'+v.date+'</span>';
      }
      case_html += '<span class="title">'+v.title+'</span>';
      if ("summary" in v && v.summary !== "") {
        if (v.summary.length > 39) {
          v.summary = v.summary.slice(0, 39) + '⋯⋯';
        }
        case_html += '<span class="summary">'+v.summary+'</span>';
      }
      case_html += '</a></div>';
    });
    $('.case-list').append(case_html);

    var case_count = $('.case-list .post').length;
    if (case_count <= 8) {
      $('.case-list .post').addClass('show-post');
    } else {
      $('.case-list .post:lt(8)').addClass('show-post');
      $('.case-list').append('<button class="btn more-btn white">Read More</button>');

      $('.case-list .more-btn').click(function(e){
        e.stopPropagation();
        var offset = $('.case-list .show-post').length;
        offset += 8;

        $('.case-list .post:lt('+offset+')').addClass('show-post');
        if (offset >= case_count) {
          $(this).remove();
        }
      });
    }

    var activity_html = "";
    data.activity.sort(SortByCreate);
    $.each(data.activity, function(k, v){
      if (typeof(v.media) === "undefined") {
        v.media = "";
      }
      if (typeof(v.date) === "undefined") {
        v.date = "";
      }

      activity_html += '<div class="post">';
      switch(v.type) {
        case '':
          activity_html += '<a class="colorbox" href="'+v.photo+'" title="'+v.title+'">';
        break;
        case 'link':
          activity_html += '<a href="'+v.url+'" title="'+v.title+'" target="_blank">';
        break;
        case 'youtube':
          activity_html += '<a class="colorbox-youtube" data-id="'+v.url+'" title="'+v.title+'">';
        break;
      }
      activity_html += '<div class="item"><div class="cover"></div><img src="'+v.cover+'"></div>';
      if (v.media !== "" ||  v.date !== "") {
        activity_html += '<span class="media">'+v.media+'</span>';
        activity_html += '<span class="bdate">'+v.date+'</span>';
      }
      activity_html += '<span class="title">'+v.title+'</span>';
      if ("summary" in v && v.summary !== "") {
        if (v.summary.length > 39) {
          v.summary = v.summary.slice(0, 39) + '⋯⋯';
        }
        activity_html += '<span class="summary">'+v.summary+'</span>';
      }
      activity_html += '</a></div>';
    });
    $('.activity-list').append(activity_html);

    var activity_count = $('.activity-list .post').length;
    if (activity_count <= 8) {
      $('.activity-list .post').addClass('show-post');
    } else {
      $('.activity-list .post:lt(8)').addClass('show-post');
      $('.activity-list').append('<button class="btn more-btn green">Read More</button>');

      $('.activity-list .more-btn').click(function(e){
        e.stopPropagation();
        var offset = $('.activity-list .show-post').length;
        offset += 8;

        $('.activity-list .post:lt('+offset+')').addClass('show-post');
        if (offset >= activity_count) {
          $(this).remove();
        }
      });
    }
  });
});