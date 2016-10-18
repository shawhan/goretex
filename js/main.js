jQuery(function($){
  $('body').on('click', '.link-down', function(e){
    $("html, body").animate({scrollTop: $(window).height()}, 500)
    
  }).on("click", ".post a.colorbox", function(e){
    e.preventDefault();
    $.colorbox({
      'maxWidth': '80%',
      'maxHeight': '80%',
      'href' : $(this).attr('href'),
      'title' : $(this).attr('title'),
      'onComplete': function() {
        $("body").css({"overflow-y":"hidden"});
      },
      'onClosed' : function() {
        $("body").css({"overflow-y":"visible"});
      }
    }); 
  });
  
  $.getJSON("data.json", function(data) {
      console.log(data);
      var banner_html = "";
      $.each(data.banner, function(k, v){
        //TODO order by sort ASC
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
      $.each(data.news, function(k, v){
        news_html += '<li><a href="'+v.url+'">'+v.title+'</a></li>';
      });
      $('.news-list ul').append(news_html);

      var media_html = "";
      $.each(data.media, function(k, v){
        media_html += '<div class="post"><a class="colorbox" href="'+v.photo+'" title="'+v.title+'"><img src="'+v.photo+'"><span>'+v.title+'</span></a></div>';
      });
      $('.media-list').append(media_html);

      var case_html = "";
      $.each(data.case, function(k, v){
        case_html += '<div class="post"><a class="colorbox" href="'+v.photo+'" title="'+v.title+'"><img src="'+v.photo+'"><span>'+v.title+'</span></a></div>';
      });
      $('.case-list').append(case_html);

      var activity_html = "";
      $.each(data.activity, function(k, v){
        activity_html += '<div class="post"><a class="colorbox" href="'+v.photo+'" title="'+v.title+'"><img src="'+v.photo+'"><span>'+v.title+'</span></a></div>';
      });
      $('.activity-list').append(activity_html);
    });
});
