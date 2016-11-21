/* ========================================================================
 * Bootstrap: collapse.js v3.2.0
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+function(t){"use strict";function e(e){return this.each(function(){var n=t(this),i=n.data("bs.collapse"),a=t.extend({},s.DEFAULTS,n.data(),"object"==typeof e&&e);!i&&a.toggle&&"show"==e&&(e=!e),i||n.data("bs.collapse",i=new s(this,a)),"string"==typeof e&&i[e]()})}var s=function(e,n){this.$element=t(e),this.options=t.extend({},s.DEFAULTS,n),this.transitioning=null,this.options.parent&&(this.$parent=t(this.options.parent)),this.options.toggle&&this.toggle()};s.VERSION="3.2.0",s.DEFAULTS={toggle:!0},s.prototype.dimension=function(){var t=this.$element.hasClass("width");return t?"width":"height"},s.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var s=t.Event("show.bs.collapse");if(this.$element.trigger(s),!s.isDefaultPrevented()){var n=this.$parent&&this.$parent.find("> .panel > .in");if(n&&n.length){var i=n.data("bs.collapse");if(i&&i.transitioning)return;e.call(n,"hide"),i||n.data("bs.collapse",null)}var a=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[a](0),this.transitioning=1;var l=function(){this.$element.removeClass("collapsing").addClass("collapse in")[a](""),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!t.support.transition)return l.call(this);var o=t.camelCase(["scroll",a].join("-"));this.$element.one("bsTransitionEnd",t.proxy(l,this)).emulateTransitionEnd(350)[a](this.$element[0][o])}}},s.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var e=t.Event("hide.bs.collapse");if(this.$element.trigger(e),!e.isDefaultPrevented()){var s=this.dimension();this.$element[s](this.$element[s]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse").removeClass("in"),this.transitioning=1;var n=function(){this.transitioning=0,this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse")};return t.support.transition?(this.$element[s](0).one("bsTransitionEnd",t.proxy(n,this)).emulateTransitionEnd(350),void 0):n.call(this)}}},s.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()};var n=t.fn.collapse;t.fn.collapse=e,t.fn.collapse.Constructor=s,t.fn.collapse.noConflict=function(){return t.fn.collapse=n,this},t(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(s){var n,i=t(this),a=i.attr("data-target")||s.preventDefault()||(n=i.attr("href"))&&n.replace(/.*(?=#[^\s]+$)/,""),l=t(a),o=l.data("bs.collapse"),r=o?"toggle":i.data(),h=i.attr("data-parent"),p=h&&t(h);o&&o.transitioning||(p&&p.find('[data-toggle="collapse"][data-parent="'+h+'"]').not(i).addClass("collapsed"),i[l.hasClass("in")?"addClass":"removeClass"]("collapsed")),e.call(l,r)})}(jQuery);