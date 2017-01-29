window.youtubeReady = false;
window.YT_ready = (function(){
var onReady_funcs = [], api_isReady = false;
return function(func, b_before){
  if(func === true){api_isReady = true;while(onReady_funcs.length){onReady_funcs.shift()();}}
  else if(typeof func == "function"){if(api_isReady) func(); else onReady_funcs[b_before?"unshift":"push"](func);}
}
})();

var __slice = Array.prototype.slice;
!function() {
  window.Class = function() { /* вся магия - в Class.extend */  };
  Class.extend = function(props, staticProps) {
    var mixins = [];
    if ({}.toString.apply(arguments[0]) == "[object Array]") {
      mixins = arguments[0];
      props = arguments[1];
      staticProps = arguments[2];
    }
    function Constructor() {
      this.init && this.init.apply(this, arguments);
    }
    Constructor.prototype = Class.inherit(this.prototype);
    Constructor.prototype.constructor = Constructor;
    Constructor.extend = Class.extend;
    copyWrappedProps(staticProps, Constructor, this);
    for (var i = 0; i < mixins.length; i++) {
      copyWrappedProps(mixins[i], Constructor.prototype, this.prototype);
    }
    copyWrappedProps(props, Constructor.prototype, this.prototype);
    return Constructor;
  };
  var fnTest = /xyz/.test(function() {xyz}) ? /\b_super\b/ : /./;
  function copyWrappedProps(props, targetPropsObj, parentPropsObj) {
    if (!props) return;
    for (var name in props) {
      if (typeof props[name] == "function"
        && typeof parentPropsObj[name] == "function"
        && fnTest.test(props[name])) {
        targetPropsObj[name] = wrap(props[name], parentPropsObj[name]);
      } else {
        targetPropsObj[name] = props[name];
      }
    }
  }
  function wrap(method, parentMethod) {
    return function() {
      var backup = this._super;
      this._super = parentMethod;
      try {
        return method.apply(this, arguments);
      } finally {
        this._super = backup;
      }
    }
  }
  Class.inherit = Object.create || function(proto) {
    function F() {}
    F.prototype = proto;
    return new F;
  };
}();


var BaseClass = Class.extend({
  __className : 'BaseClass',
  setOption : function(key,val)
  {
    if( key == 'element' ){
      this.element = val;
    }else if( key.substr(0,1) == '_' ){
      key = key.substr(1);
      this[key] = val;
    }

    this.opt[key] = val;
  },
  setOptions : function(opt)
  {
    if(typeof opt == 'undefined') return;
    for(var key in opt)
    {
      this.setOption(key,opt[key]);
    }
  },
  cb : function(cb,data)
  {
    if( typeof cb != 'function' ) return false;
    if( typeof data == 'undefined' ) data = false;
    return cb( data );
  },
  youtubeRequest : function(cb)
  {
    var self = this;
    window.onYouTubePlayerAPIReady = function(){
      window.youtubeReady = true;
      window.YT_ready(true);
      self.cb( cb );
    };

    var s = document.createElement("script");
    s.src = "https://www.youtube.com/player_api";
    var before = document.getElementsByTagName("script")[0];
    before.parentNode.insertBefore(s, before);
  },
  cancelEvent : function(e)
  {
      if(typeof e.preventDefault != 'undefined') e.preventDefault(e);
      if(typeof e.stopPropagation != 'undefined') e.stopPropagation(e);
  },
  querySelectorAll : function(val, el) {
    return el 
      ? __slice.call(el.querySelectorAll(val))
      : __slice.call(document.querySelectorAll(val));
  },
  bindEvent : function(elm, evt, callback) {
    evt = evt.split(' ');
    for(var i=0;i<evt.length;i++) {
      if(elm.addEventListener){
        elm.addEventListener(evt[i], callback, false);
      }else{
          elm.attachEvent("on"+evt[i], callback);
      }
    }
  },
  unbindEvent : function(elm, evt, callback) {
    evt = evt.split(' ');
    for(var i=0;i<evt.length;i++) {
      if(elm.removeEventListener){
        elm.removeEventListener(evt[i], callback, false);
      }else{
          elm.detachEvent("on"+evt[i], callback);
      }
    }
  },
  hasClass : function(el, className) {
    return el.className.indexOf(className) === -1 ? false : true;
  },
  addClass : function(el, className) {
    if (!this.hasClass(el, className)) el.className += ' ' + className;
  },
  removeClass : function(el, className, accurate) {
    if(typeof accurate == 'undefined') accurate = true;
    if(!this.hasClass(el, className)) return;
    if(!accurate){
      el.className = el.className.replace(className, '');  
    }else{
      var newClassNames = [];
      var classNames = el.className.split(' ');
      for(var i=0;i<classNames.length;i++) {
        if( classNames[i].length && classNames[i] != className )
          newClassNames.push( classNames[i] );
      }
      el.className = newClassNames.join(' ');
    }
  },
  css : function(el, css) {
    var k, v;
    for(k in css)
    {
      v = css[k];
      switch(k){case 'top':case 'left':case 'right':case 'bottom':case 'width':case 'height':v += 'px';break;}
      el.style[k] = v;
    }
  },
  getCookie: function(name) {
    var matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ))
    return matches ? decodeURIComponent(matches[1]) : undefined 
  },
  setCookie : function(name, value, props) {
    props = props || {}
    var exp = props.expires
    if (typeof exp == "number" && exp) {
      var d = new Date()
      d.setTime(d.getTime() + exp*1000)
      exp = props.expires = d
    }
    if(exp && exp.toUTCString) { props.expires = exp.toUTCString() }
    value = encodeURIComponent(value)
    var updatedCookie = name + "=" + value
    for(var propName in props){
      updatedCookie += "; " + propName
      var propValue = props[propName]
      if(propValue !== true){ updatedCookie += "=" + propValue }
    }
    document.cookie = updatedCookie;
  },
  deleteCookie : function(name) {
    this.setCookie(name, null, { expires: -1 })
  }
});

var VideoPlayer = BaseClass.extend({
  __className : 'VideoPlayer',
  init : function(opt)
  {
    this._id = false;
    this.inited = false;
    this.externalResize = false;
    this.iframe = false;
    this.player_id = false;
    this.player = false;
    this.type = false;
    this.ready = false;
    this.loading = false;
    this.playing = false;
    this.active = false;
    this.loader = false;
    this.onReady = false;
    this.videoWidth = false;
    this.videoHeight = false;
    this.width = 0;
    this.height = 0;
    this.element = false;
    this.opt = {};
    this.setOptions(opt);
    this.create();
  },
  create : function()
  {
    var self = this;
    if(window.youtubeReady) { this.initVideoPlayer(); }
    else{
      var tmr = setInterval(function(){ if(window.youtubeReady){self.initVideoPlayer();clearInterval(tmr);tmr=null;}; },100);
      this.youtubeRequest();
    }
    this.getIFrame();
    this._inited = true;
  },
  initVideoPlayer : function(){
    var self = this, elm;
    this.player = null;
    this.autoplay = parseInt(this.element.getAttribute('autoplay')) || 0;
    this.playButton = this.element.querySelector('.play');
    if(this.playButton){ this.playButton.css({ opacity : 0 }); }
    if(this.hasClass(this.element,'vimeoMarker')){
      if(!this.getIFrame()) return false;
      this.type = 'vimeo';
      this.player = $f(this.iframe);
      this.player.addEvent('ready',function(player_id){
        self.imready();
        self.player.api('pause');
        self.player.addEvent('play',function(player_id){ self.implaying(); });
        self.player.addEvent('pause',function(player_id){ self.impaused(); });
        self.player.addEvent('finish',function(player_id){ self.imstopped(); });
      });
    }else if(this.hasClass(this.element,'youtubeMarker')){
      if(!this.getIFrame()) return false;
      this.type = 'youtube';
      var player_data = {
        playerVars: { showinfo : 0, controls : 1, modestbranding : 0, wmode : "opaque" },
        events: {
          onReady : function(e){ self.imready(); },
          onStateChange : function(e){
            switch(e.data){
              case 0:self.imstopped();break;
              case 1:self.implaying();break;
              case 2:self.impaused();break;
              case 5:self.buffering();break;
            }
          }
        }
      };
      player_data.videoId = this.iframe.getAttribute('video-id');
      player_data.width = this.width ? this.width : '100%';
      player_data.height = this.height ? this.height : '100%';
      this.player = new YT.Player(this.player_id,player_data);
    }else if( this.element.querySelector('.html5video') ){
      this.type = 'html5video';
      this.player = this.find(this.element,'video');
      if(this.player)
      {
        var player_id = this.player.getAttribute('id');
        this.player_id = player_id;
        this.videoWidth = parseInt( this.player.getAttribute('width') || 0 );
        this.videoHeight = parseInt( this.player.getAttribute('height') || 0 );
        this.player.bind('ended',function(e){ self.stopped(); });
      }
    }
  },
  getIFrame : function(){
    this.iframe = this.element.querySelector('iframe');
    if(!this.iframe)
    {
      this.iframe = this.element.querySelector('.iframe');
      if(!this.iframe) return false;
    }
    var player_id = this.iframe.getAttribute('id');
    this.player_id = player_id;
    this.videoWidth = parseInt( this.iframe.getAttribute('width') || this.element.getAttribute('data-width') || 0 );
    this.videoHeight = parseInt( this.iframe.getAttribute('height') || this.element.getAttribute('data-height') || 0 );
    return true;
  },
  toggleVideo : function(){ return this.play(); },
  play : function(){
    if(this.active) return false;
    if(this.playButton) this.css(this.playButton, { display : 'none' });
    switch(this.type)
    {
      case'html5video':this.player.play();break;
      case'vimeo':this.player.api('play');break;
      case'youtube':this.player.playVideo();break;
      default:return;break;
    }
    return this.activate();
  },
  pause : function(){
    if(!this.active) return false;
    if(this.playButton) this.css(this.playButton,{ display : 'block' });
    switch(this.type)
    {
      case'html5video':this.player.pause();break;
      case'vimeo':this.player.api('pause');break;
      case'youtube':this.player.pauseVideo();break;
      default:return;break;
    }
    return this.deactivate();
  },
  imready : function(){
    if(this.loader) this.loader.stop();
    var self = this;
    if(this.playButton){
      this.css(this.playButton,{ opacity : 1 })
      this.bindEvent(this.playButton,'click',function(){ self.toggleVideo(); });
    }
    this.css(this.iframe,{ opacity : 1 });
    this.resize();
    this.bindEvent(window,'resize',function(){ self.resize(); });
    this.ready = true;
    if( this.autoplay && ( window.innerWidth > 900 ) ) this.play();
    if(typeof this.onReady == 'function') this.onReady();
  },
  implaying : function(){ return this.activate(); },
  impaused : function(){ return this.deactivate(); },
  imstopped : function(){
    switch(this.type){ case'html5video':this.player.load();break; }
    return this.deactivate();
  },
  imbuffering : function(){},
  activate : function(){
    if(this.active) return false;
    if(this.delegate && this.delegate.videoActivated) this.delegate.videoActivated(this);
    this.active = true;
    return true;
  },
  deactivate : function(){
    if(!this.active) return false;
    if(this.delegate && this.delegate.videoDeactivated) this.delegate.videoDeactivated(this);
    this.active = false;
    return true;
  },
  getWidthPadding : function() {
    if( window.innerWidth >= 1440 ) { return 190; }else if( window.innerWidth >= 1280 ) { return 160; }else{ return 130; }
  },
  getHeightPadding : function() {
    if( window.innerWidth >= 1440 ) { return 115; }else if( window.innerWidth >= 1280 ) { return 100; }else{ return 120; }
  },
  resize : function(ww,wh)
  {
    var rect = this.element.parentNode.getBoundingClientRect();
    if( this.externalResize && ( !ww || !wh ) ) return;
    ww = ww || ( window.innerWidth - this.getWidthPadding() * 2 );
    wh = wh || ( window.innerHeight - this.getHeightPadding() * 2 );
    var width = ww;
    var height = wh;

    if(this.videoWidth && this.videoHeight){
      height = Math.round( width / this.videoWidth * this.videoHeight );
      if(wh && ( height > wh ) ){
        height = wh;
        width = Math.round( height / this.videoHeight * this.videoWidth );
      }
    }
    this.css(this.element,{ width : width, height : height });
    this.width = width;
    this.height = height;
    switch(this.type){
      case 'html5video':if(this.player) this.css(this.player,{ width : this.width, height : this.height });break;
      case 'youtube':if(this.player) this.player.setSize(this.width,this.height);
      case 'vimeo':if(this.iframe) this.css(this.iframe,{ width : this.width, height : this.height });break;
      default:break;
    }
    return { width : this.width, height : this.height };
  }
});



var VideoPopup = BaseClass.extend({
  __className : 'VideoPopup',
  init : function(opt) {
    this._id = false;
    this.inited = false;
    this.element = false;
    this.opt = { delay : 10 };
    this.setOptions(opt);
    this.opened = false;
    this.popup = false;
    this.triggers = false;
    this.videoPlayer = false;
    this.viewingTrigger = false;
    this.closeTriggerX = false;
    this.closeTrigger = false;
    this.create();
  },
  create : function() {
    var self = this;
    if(this.getCookie('hideVideoPopup')) return false;
    this.opened = false;
    this.popup = document.getElementById('video-popup');
    this.trigger = document.querySelector('.js-video-popup-trigger');
    if( !( this.popup && this.trigger ) ) return false;
    var delay = parseInt(this.trigger.getAttribute('trigger-delay'));
    if(delay) this.opt.delay = delay;
    if(!this.trigger) return false;
    var videoPlayerElement = document.querySelector('.js-video-popup-player');
    this.videoPlayer = new VideoPlayer({ _element : videoPlayerElement });
    if(!this.videoPlayer._inited) return false; else this.videoPlayer.onReady = function(){ if(self.opened) self.videoPlayer.play(); };
    if(!this.popup) return false;
    this.clickZone = this.trigger.querySelector('.click-zone');
    if(this.clickZone) this.bindEvent(this.clickZone, 'click', function(e){ if(e.target == this) self.openPopup(); });
    this.bindEvent(this.popup, 'click', function(e){ if(this == e.target) self.closePopup(); });
    this.close = this.popup.querySelector('.js-close');
    if(this.close) { this.bindEvent(this.close, 'click', function(e){ self.closePopup(); }); }
    var hideTrigger = function(e){
      self.cancelEvent(e);
      self.hideTrigger();
    }
    this.closeTrigger = this.trigger.querySelector('.js-close-trigger');
    this.closeTriggerX = this.trigger.querySelector('.js-close-trigger-x');
    if(this.closeTrigger) this.bindEvent(this.closeTrigger, 'click', hideTrigger);
    if(this.closeTriggerX) this.bindEvent(this.closeTriggerX, 'click', hideTrigger);
    setTimeout(function(){
      self.addClass(self.trigger,'view');
      self.viewingTrigger = true;
    }, this.opt.delay * 1000);
  },
  openPopup : function() {
    this.addClass(this.popup,'opened');
    this.opened = true;
    // __app__.setFixedContent(true);
    if(this.videoPlayer && this.videoPlayer.ready){
      this.videoPlayer.resize();
      this.videoPlayer.play();
    }
    this.removeClass(this.trigger,'view');
    this.viewingTrigger = false;
  },
  closePopup : function() {
    this.removeClass(this.popup,'opened');
    // __app__.setFixedContent(false);
    if(this.videoPlayer && this.videoPlayer.ready) this.videoPlayer.pause();
    this.addClass(this.trigger,'view');
    this.viewingTrigger = true;
  },
  hideTrigger : function() {
    this.closePopup();
    this.removeClass(this.trigger,'view');
    this.viewingTrigger = false;
    this.setCookie('hideVideoPopup', true, { expires: 1800 });
  }
});

(function(){new VideoPopup({});})();