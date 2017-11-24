function Main() {
    this.videoArray = [['xobCAc57Y4w', 'video-1'], ['fAtYv5dER2g', 'video-2']];
    this.menuArray = [];
    this.playerDefW = 1920;
    this.playerDefH = 1080;
    this.closeBtn = this.getCS('vp-cancel-btn');
    this.vpContainer = this.getCS('vp-container');
    this.vp = this.getCS('vp');
    this.resiziMap = false;
    this.mobileSize = false;
    this.btnCollapsedVisible = false;
}

Main.prototype = {
    getCS: function (el) {
        return document.getElementsByClassName(el)[0];
    },
    scrolling: function (self, e) {
        if(window.pageYOffset > 0) {
            self.linkHoverColor = "#fff"
            self.getCS('menu').style.backgroundColor = 'rgba(43,70,175, .95)';
            self.getCS('menu-nav__links').style.color = "#fff";
            self.getCS('menu-nav__lang-btn').style.borderColor = "#fff";
            self.getCS('menu-nav__lang-btn').style.color = "#fff";
            self.getCS('menu').style.height = "65px";
            self.getCS('menu-nav__logo').style.marginTop = "10px";
            self.getCS('menu-nav__logo').style.width = "110px";
            self.getCS('menu-nav__logo').style.color = "#fff";
            self.getCS('menu-nav__logo-span').style.top = "31px";
            self.getCS('menu-nav__links').style.marginTop = "-7px";
            if(self.mobileSize) {
                self.getCS('menu-nav__links').style.top = "72px";
                self.getCS('menu-nav__links').style.backgroundColor = "rgba(43,70,175, .95)";
            } else {
                self.getCS('menu-nav__links').style.backgroundColor = "rgba(43,70,175, 0)";
            }
            self.getCS('menu-nav__btn').style.color = "#fff";
            self.getCS('menu-nav__btn').style.top = "9px";
            self.getCS('menu-nav__logo-symbol').style.backgroundImage = "url('../img/request-logo.png')";
        } else {
            self.linkHoverColor = "#4a5ec4"
            self.getCS('menu').style.backgroundColor = 'rgba(255,255,255, 0)';
            self.getCS('menu-nav__links').style.color = "#2b46af";
            self.getCS('menu-nav__lang-btn').style.borderColor = "#2b46af";
            self.getCS('menu-nav__lang-btn').style.color = "#2b46af";
            self.getCS('menu').style.height = "80px";
            self.getCS('menu-nav__logo').style.marginTop = "18px";
            self.getCS('menu-nav__logo').style.width = "120px";
            self.getCS('menu-nav__logo').style.color = "#003278";
            self.getCS('menu-nav__logo-span').style.top = "33px";
            self.getCS('menu-nav__links').style.marginTop = "0px";
            if(self.mobileSize) {
                self.getCS('menu-nav__links').style.top = "80px";
                self.getCS('menu-nav__links').style.backgroundColor = "rgba(255,255,255, .95)";
            }else {
                self.getCS('menu-nav__links').style.backgroundColor = "rgba(255,255,255, 0)";
            }
            self.getCS('menu-nav__btn').style.color = "#2b46af";
            self.getCS('menu-nav__btn').style.top = "15px";
            self.getCS('menu-nav__logo-symbol').style.backgroundImage = "url('../img/request-logo.png')";
        }
    },
    onResize: function (self, e) {
        self.w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        self.h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        self.w < 1080 ? [self.mobileSize = true, self.getCS('menu-nav__links').style.display = 'none'] : [self.mobileSize = false, self.getCS('menu-nav__links').style.display = 'block'];
        self.setPlayerSize(self.playerDefW, self.playerDefH, Math.round((self.w) / 1.2), Math.round((self.h) / 1.2));
        if (self.resiziMap) self.centerMap = self.map.getCenter(), google.maps.event.trigger(self.map, "resize"), self.map.setCenter(self.centerMap);
        self.scrolling(self);
    },
    videoBtnOnClick: function (self, e) {
        self.vp.loadVideoById(e.currentTarget.id);
        self.vp.playVideo();
        self.vpContainer.style.display = 'block';
    },
    videoBtnOnClose: function (self, e) {
        self.vpContainer.style.display = 'none';
        self.vp.stopVideo();
    },
    setPlayerSize: function (srcWidth, srcHeight, maxWidth, maxHeight) {
        this.ratio = [maxWidth / srcWidth, maxHeight / srcHeight];
        this.ratio = Math.min(this.ratio[0], this.ratio[1]);
        this.vp.setSize(srcWidth * this.ratio, srcHeight * this.ratio);
    },
    menuLinkRollOver: function (self, e) {
        if (e.target.className === 'menu-nav__span') {
            e.target.style.borderBottom = '2px solid '+self.linkHoverColor;
            e.target.style.color = self.linkHoverColor;
        }
    },
    menuLinkRollOut: function (self, e) {
        if (e.target.className === 'menu-nav__span') {
            e.target.style.borderBottom = '0px solid #2b46af';
            e.target.style.color = 'inherit';
        }
    },
    menuLinkOnClick: function (self, e) {
        if (self.mobileSize) {
            self.btnCollapsedVisible = false;
            self.getCS('menu-nav__links').style.display = 'none';
        }
    },
    menuCollapsedOnClick: function (self, e) {
        self.btnCollapsedVisible ? [self.btnCollapsedVisible = false, self.getCS('menu-nav__links').style.display = 'none'] : [self.btnCollapsedVisible = true, self.getCS('menu-nav__links').style.display = 'block'];
    },
    initialize: function (self) {
        var myLatlng = new google.maps.LatLng(50.07593689999999, 14.4729323);
        var mapOptions = {
            zoom: 15,
            center: myLatlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        self.map = new google.maps.Map(document.getElementById('map'), mapOptions);

        var contentString = 'SÚKL - Šrobárova 48, 100 41 Praha 10';
        var infowindow = new google.maps.InfoWindow({
            content: contentString,
            maxWidth: 500
        });

        var marker = new google.maps.Marker({
            position: myLatlng,
            map: self.map
        });

        google.maps.event.addListener(marker, 'click', function () {
            infowindow.open(self.map, marker);
        });

        self.resiziMap = true;

        setTimeout(function(){
            self.getCS('container').style.display = 'block';
            self.getCS('menu').style.display = 'block';
        }, 2000);
    },
    init: function (self) {
        window.addEventListener('resize', self.onResize.bind(undefined, self));
        window.addEventListener("scroll", self.scrolling.bind(undefined, self));
        window.onYouTubeIframeAPIReady = function () {
            self.vp = new YT.Player('vp', {
                height: 0,
                width: 0,
                videoId: 'xMgKkVCCOW8',
                playerVars: {
                    controls: 1,
                    showinfo: 1,
                    fs: 0,
                    rel: 0
                }
            });
            self.closeBtn.addEventListener('click', self.videoBtnOnClose.bind(undefined, self), false);
            self.getCS('menu-nav__links').addEventListener('mouseover', self.menuLinkRollOver.bind(undefined, self), false);
            self.getCS('menu-nav__links').addEventListener('mouseout', self.menuLinkRollOut.bind(undefined, self), false);
            self.getCS('menu-nav__links').addEventListener('click', self.menuLinkOnClick.bind(undefined, self), false);
            self.getCS('menu-nav__btn').addEventListener('click', self.menuCollapsedOnClick.bind(undefined, self), false);
            self.getCS('menu-nav__logo').addEventListener('click', self.menuLinkOnClick.bind(undefined, self), false);

            var videoButtons = document.querySelectorAll('.video-btn-pointer');
            for(var i=0;i<videoButtons.length;i++){
                videoButtons[i].addEventListener('click', self.videoBtnOnClick.bind(undefined, self), false);
            }

            self.onResize(self);
            setTimeout(self.initialize.bind(undefined, self), 2000);
        }
    }
}
