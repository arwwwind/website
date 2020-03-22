webpackHotUpdate("static/development/pages/index.js",{

/***/ "./pages/index.jsx":
/*!*************************!*\
  !*** ./pages/index.jsx ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/esm/inherits.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _style_style_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../style/style.scss */ "./style/style.scss");
/* harmony import */ var _style_style_scss__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_style_style_scss__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _hoc_layout__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../hoc/layout */ "./hoc/layout.jsx");
/* harmony import */ var _components_post__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./../components/post */ "./components/post.jsx");
/* harmony import */ var react_reveal_Zoom__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-reveal/Zoom */ "./node_modules/react-reveal/Zoom.js");
/* harmony import */ var react_reveal_Zoom__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_reveal_Zoom__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var react_reveal_Slide__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-reveal/Slide */ "./node_modules/react-reveal/Slide.js");
/* harmony import */ var react_reveal_Slide__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react_reveal_Slide__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var vanta_dist_vanta_globe_min__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! vanta/dist/vanta.globe.min */ "./node_modules/vanta/dist/vanta.globe.min.js");
/* harmony import */ var vanta_dist_vanta_globe_min__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(vanta_dist_vanta_globe_min__WEBPACK_IMPORTED_MODULE_11__);





var _jsxFileName = "/Users/arvindnarayan/Desktop/website/pages/index.jsx";








var Index =
/*#__PURE__*/
function (_React$Component) {
  Object(_babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__["default"])(Index, _React$Component);

  function Index() {
    var _this;

    Object(_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Index);

    _this = Object(_babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__["default"])(this, Object(_babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__["default"])(Index).call(this));
    _this.state = {
      posts: [{
        title: 'Pranaa | Whole Food Delivery',
        desc: 'Pranaa is a exclusive food delivery app that is the online storefront of exclusive food products pranaa which is a based on Plant Based Whole Food which prootes wellness and healthy living',
        url: 'https://www.pranaafood.com',
        image: '/static/pranaa1.png',
        class: 'green'
      }, {
        title: 'Ad Builder by Verzon Media (yahoo!)',
        desc: "A desktop and PWA that is powering SMB's with advertisments and campaigns. This application makes creation of ads as easy and intuitive as possible.",
        url: 'http://ad.com',
        image: '/static/bitmap.png',
        class: 'red'
      }, {
        title: 'Verizon Media Native (yahoo!)',
        desc: 'A Hybrid App built on Android, iOS and as well as a PWA. This app helps advertisers with their Campaigns',
        url: 'https://play.google.com/store/apps/details?id=com.yahoo.mobile.client.android.gemini',
        image: '/static/2.png',
        class: 'blue'
      }, {
        title: 'Apollo Construct by Katerra',
        desc: "Apollo is a suite of applications designed to support building projects and teams from beginning to end.",
        url: 'https://apollo.katerra.com/',
        image: '/static/3.jpg',
        class: 'green'
      }, {
        title: 'Reeltime Coaching',
        desc: "ReelTime Coaching is the elite athlete development platform that connects athletes with top coaches on demand. Thats right we worked with Icecube!",
        url: 'http://beta.reeltimecoaching.com',
        image: '/static/4.jpg',
        class: 'yellow'
      }, {
        title: 'Palava Resident Portal',
        desc: "A Resident Portal for Lodha's my palava built as a PWA. This app helps residents with day to day stuff in and around palava",
        url: 'https://mypalava.in',
        image: '/static/5.png',
        class: 'blue'
      }]
    };
    _this.vantaRef = react__WEBPACK_IMPORTED_MODULE_5___default.a.createRef();
    return _this;
  }

  Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Index, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.vantaRef = vanta_dist_vanta_globe_min__WEBPACK_IMPORTED_MODULE_11___default()({
        el: this.vantaRef.current,
        mouseControls: true,
        touchControls: true,
        minHeight: 450.00,
        minWidth: 450.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0x3b28ca,
        color2: 0xe31717,
        size: 1.50,
        backgroundColor: 0xffffff
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.vantaEffect) this.vantaEffect.destroy();
    }
  }, {
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_hoc_layout__WEBPACK_IMPORTED_MODULE_7__["default"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 86
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "container",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 87
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_reveal_Slide__WEBPACK_IMPORTED_MODULE_10___default.a, {
        top: true,
        cascade: true,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 88
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "circle circle-1",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 89
        },
        __self: this
      })), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_reveal_Slide__WEBPACK_IMPORTED_MODULE_10___default.a, {
        left: true,
        cascade: true,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 91
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "circle circle-2",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 92
        },
        __self: this
      })), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_reveal_Slide__WEBPACK_IMPORTED_MODULE_10___default.a, {
        right: true,
        cascade: true,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 94
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "circle circle-3",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 95
        },
        __self: this
      })), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_reveal_Slide__WEBPACK_IMPORTED_MODULE_10___default.a, {
        bottom: true,
        cascade: true,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 97
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "outline outline-1",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 98
        },
        __self: this
      })), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_reveal_Slide__WEBPACK_IMPORTED_MODULE_10___default.a, {
        right: true,
        cascade: true,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 100
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "outline outline-2",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 101
        },
        __self: this
      })), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_reveal_Slide__WEBPACK_IMPORTED_MODULE_10___default.a, {
        left: true,
        cascade: true,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 103
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "outline outline-3",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 104
        },
        __self: this
      })), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "nav-head",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 106
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_reveal_Zoom__WEBPACK_IMPORTED_MODULE_9___default.a, {
        right: true,
        cascade: true,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 107
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("span", {
        className: "logo bg-assets",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 108
        },
        __self: this
      }))), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "infographic",
        ref: this.vantaRef,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 111
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "content-title",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 226
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_reveal_Zoom__WEBPACK_IMPORTED_MODULE_9___default.a, {
        right: true,
        cascade: true,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 227
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("h1", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 228
        },
        __self: this
      }, "I\u2019m Arvind,")), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_reveal_Zoom__WEBPACK_IMPORTED_MODULE_9___default.a, {
        right: true,
        cascade: true,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 230
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("h3", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 231
        },
        __self: this
      }, "Fullstack Developer & Freelance UX Designer"))), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_reveal_Zoom__WEBPACK_IMPORTED_MODULE_9___default.a, {
        right: true,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 234
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "content-body",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 235
        },
        __self: this
      }, "I build apps end to end aka Design - Front-end - Backend and a little bit of Dev-Ops. ", react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("br", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 237
        },
        __self: this
      }), "I\u2019m from most coolest places on Earth aka Bengaluru. I have close to 3.5 years of experience in building truly scalable products. You can see me mostly working on Javascript in all forms and sizes. I\u2019m in love with React JS and have a love and hate relationship with Angular (first choice). I deal with massive SASS style sheets and colossal Redux architecture. I also love creating keyframe animation purely using CSS Keyframes.", react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("br", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 245
        },
        __self: this
      }), "I prefer to work on super fast Node JS in backend with databases like MongoDB, Postgres, Redis and ElasticSearch and also consume services like kafka, Docker, Sentry and Nginix. My current curiosity with Architecting Microservices has shed some light on services like AWS / GCP and building at scale. I\u2019m a recent fan of Serverless services.", react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("br", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 251
        },
        __self: this
      }), "I also consult firms on UX design. The Sketch is my choice of weapon, Sometimes I work with Illustrator and Photoshop for the finishing touches. I\u2019m a fan on negative spaces and minimalist UI.", react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("br", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 255
        },
        __self: this
      }), "I\u2019m keen on delivering the best User Experience on the products I work on that is my professional mission!", react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("br", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 258
        },
        __self: this
      }), "I currently work at Cognitveclouds and a SDE-2. Feel free", react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("a", {
        href: "mailto:thearvindnarayan@gmail.com?Subject=Hey%20Arvind",
        className: "mail",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 259
        },
        __self: this
      }, "&nbsp Slide in a Mail &nbsp"), "regarding new opportunuties")), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_reveal_Zoom__WEBPACK_IMPORTED_MODULE_9___default.a, {
        bottom: true,
        cascade: true,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 268
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "link-container",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 269
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("a", {
        href: "https://dribbble.com/ImArvind",
        target: "_blank",
        className: "links dribble",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 270
        },
        __self: this
      }, "dribble"), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("a", {
        href: "https://github.com/thearvindnarayan",
        target: "_blank",
        className: "links github",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 277
        },
        __self: this
      }, "github"), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("a", {
        href: "https://medium.com/@thearvindnarayan",
        target: "_blank",
        className: "links medium",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 284
        },
        __self: this
      }, "medium"), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("a", {
        href: "https://www.linkedin.com/in/thearvindnarayan/",
        target: "_blank",
        className: "links linkedin",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 291
        },
        __self: this
      }, "linkedin"))), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_reveal_Zoom__WEBPACK_IMPORTED_MODULE_9___default.a, {
        cascade: true,
        top: true,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 300
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "t-logo-container",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 301
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("a", {
        href: "https://reactjs.org/",
        target: "_blank",
        className: "react tech-logo bg-assets",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 302
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("a", {
        href: "https://redux.js.org/",
        target: "_blank",
        className: "redux tech-logo bg-assets",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 307
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("a", {
        href: "https://nodejs.org/",
        target: "_blank",
        className: "node tech-logo bg-assets",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 312
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("a", {
        href: "https://www.ecma-international.org",
        target: "_blank",
        className: "js tech-logo bg-assets",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 317
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("a", {
        href: "https://www.sketch.com/",
        target: "_blank",
        className: "sketch tech-logo bg-assets",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 322
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("a", {
        href: "https://angular.io",
        target: "_blank",
        className: "angular tech-logo bg-assets",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 327
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("a", {
        href: "https://sass-lang.com/",
        target: "_blank",
        className: "sass tech-logo bg-assets",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 332
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("a", {
        href: "https://getbootstrap.com",
        target: "_blank",
        className: "boot tech-logo bg-assets",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 337
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("a", {
        href: "https://www.mongodb.com/",
        target: "_blank",
        className: "mongo tech-logo bg-assets",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 342
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("a", {
        href: "https://redis.io/",
        target: "_blank",
        className: "redis tech-logo bg-assets",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 347
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("a", {
        href: "https://www.elastic.co/products/elasticsearch",
        target: "_blank",
        className: "elastic tech-logo bg-assets",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 352
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("a", {
        href: "https://www.postgresql.org/",
        target: "_blank",
        className: "pg tech-logo bg-assets",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 357
        },
        __self: this
      }))), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "work-container",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 364
        },
        __self: this
      }, this.state.posts.map(function (p, i) {
        return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_components_post__WEBPACK_IMPORTED_MODULE_8__["default"], {
          data: p,
          i: i,
          key: 'post' + i,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 366
          },
          __self: this
        });
      })), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "foot",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 369
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "mine bg-assets",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 370
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("span", {
        className: "luv",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 371
        },
        __self: this
      }, "Made with \u2764\uFE0F by Arvind Narayan"), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("span", {
        className: "sidenote",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 372
        },
        __self: this
      }, "Hosted in", react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("a", {
        href: "https://surge.sh/",
        target: "_blank",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 374
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("b", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 375
        },
        __self: this
      }, "&nbspSurge")), ". Code is licensed under ", react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("b", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 377
        },
        __self: this
      }, "MIT"), " and available at", react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("a", {
        href: "https://github.com/TheArvindNarayan/website",
        target: "_blank",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 378
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("b", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 382
        },
        __self: this
      }, "&nbspGithub")), ". All images/graphics are licensed under ", react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("b", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 384
        },
        __self: this
      }, "CC BY-SA")), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("span", {
        className: "copy",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 386
        },
        __self: this
      }, "\xA92020 Arvind Narayan"))));
    }
  }]);

  return Index;
}(react__WEBPACK_IMPORTED_MODULE_5___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (Index);

/***/ })

})
//# sourceMappingURL=index.js.eae602bf92c90355b62c.hot-update.js.map