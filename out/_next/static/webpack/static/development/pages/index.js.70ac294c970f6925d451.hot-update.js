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
/* harmony import */ var vanta_dist_vanta_globe_min__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! vanta/dist/vanta.globe.min */ "./node_modules/vanta/dist/vanta.globe.min.js");
/* harmony import */ var vanta_dist_vanta_globe_min__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(vanta_dist_vanta_globe_min__WEBPACK_IMPORTED_MODULE_10__);





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
      this.vantaRef = vanta_dist_vanta_globe_min__WEBPACK_IMPORTED_MODULE_10___default()({
        el: this.vantaRef.current,
        mouseControls: true,
        touchControls: true,
        minHeight: 550.0,
        minWidth: 550.0,
        scale: 1.0,
        scaleMobile: 1.0,
        color: 0x3b28ca,
        color2: 0xe63a45,
        size: 1.7,
        backgroundColor: 0xf0f0f0
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
          lineNumber: 85
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "container",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 86
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "nav-head",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 87
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_reveal_Zoom__WEBPACK_IMPORTED_MODULE_9___default.a, {
        right: true,
        cascade: true,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 88
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("span", {
        className: "logo bg-assets",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 89
        },
        __self: this
      }))), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "infographic",
        ref: this.vantaRef,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 92
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "content-title",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 93
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_reveal_Zoom__WEBPACK_IMPORTED_MODULE_9___default.a, {
        right: true,
        cascade: true,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 94
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("h1", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 95
        },
        __self: this
      }, "Hello, I\u2019m Arvind")), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_reveal_Zoom__WEBPACK_IMPORTED_MODULE_9___default.a, {
        right: true,
        cascade: true,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 97
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("h3", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 98
        },
        __self: this
      }, "Product Developer & UX Designer"))), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_reveal_Zoom__WEBPACK_IMPORTED_MODULE_9___default.a, {
        right: true,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 101
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "content-body",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 102
        },
        __self: this
      }, "I architect solutions to products for a living\uD83D\uDC68\uD83C\uDFFD\u200D\uD83D\uDCBB. Also cause building a well architected app gets me good sleep at night\uD83D\uDE34.", react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("br", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 105
        },
        __self: this
      }), "I call bangalore home and bagpack when I'm not home. For the greater part of 3.5+ years I've built / hacked a ton of products and solutions. You can see me mostly working on Javascript in all forms and sizes. React and Node are the most important tools in my arsenal. I architect solutions and lead a team of engineers as my day job.", react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("br", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 112
        },
        __self: this
      }), "I prefer to work on databases like MongoDB, Postgres, Redis and ElasticSearch. I use AWS, kafka, Docker, Sentry etc., to maintain my sanity while my applications scale like no tomorrow.", react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("br", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 115
        },
        __self: this
      }), "I work as Senior Software Engineer at", ' ', react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("a", {
        href: "upgrad.com",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 116
        },
        __self: this
      }, "upGrad"), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("br", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 117
        },
        __self: this
      }), "I consult various clients regarding UX, Product and Development. You should check out my dribbble!", react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("br", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 119
        },
        __self: this
      }), "I've been coding since my 4th grade \u23F3, designing for the past 5 years and now I'm all about building products and maintaing sanity (I'm tired of the toxic part of the world).", react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("br", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 123
        },
        __self: this
      }), " Feel free", react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("a", {
        href: "mailto:thearvindnarayan@gmail.com?Subject=Hey%20Arvind",
        className: "mail",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 124
        },
        __self: this
      }, "Slide in a Mail"), "regarding new opportunuties")), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_reveal_Zoom__WEBPACK_IMPORTED_MODULE_9___default.a, {
        bottom: true,
        cascade: true,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 133
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "link-container",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 134
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("a", {
        href: "https://dribbble.com/ImArvind",
        target: "_blank",
        className: "links dribble",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 135
        },
        __self: this
      }, "dribble"), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("a", {
        href: "https://github.com/thearvindnarayan",
        target: "_blank",
        className: "links github",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 142
        },
        __self: this
      }, "github"), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("a", {
        href: "https://medium.com/@thearvindnarayan",
        target: "_blank",
        className: "links medium",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 149
        },
        __self: this
      }, "medium"), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("a", {
        href: "https://www.linkedin.com/in/thearvindnarayan/",
        target: "_blank",
        className: "links linkedin",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 156
        },
        __self: this
      }, "linkedin"))), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_reveal_Zoom__WEBPACK_IMPORTED_MODULE_9___default.a, {
        cascade: true,
        top: true,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 165
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "t-logo-container",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 166
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("a", {
        href: "https://reactjs.org/",
        target: "_blank",
        className: "react tech-logo bg-assets",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 167
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("a", {
        href: "https://redux.js.org/",
        target: "_blank",
        className: "redux tech-logo bg-assets",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 172
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("a", {
        href: "https://nodejs.org/",
        target: "_blank",
        className: "node tech-logo bg-assets",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 177
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("a", {
        href: "https://www.ecma-international.org",
        target: "_blank",
        className: "js tech-logo bg-assets",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 182
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("a", {
        href: "https://www.sketch.com/",
        target: "_blank",
        className: "sketch tech-logo bg-assets",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 187
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("a", {
        href: "https://angular.io",
        target: "_blank",
        className: "angular tech-logo bg-assets",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 192
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("a", {
        href: "https://sass-lang.com/",
        target: "_blank",
        className: "sass tech-logo bg-assets",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 197
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("a", {
        href: "https://getbootstrap.com",
        target: "_blank",
        className: "boot tech-logo bg-assets",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 202
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("a", {
        href: "https://www.mongodb.com/",
        target: "_blank",
        className: "mongo tech-logo bg-assets",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 207
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("a", {
        href: "https://redis.io/",
        target: "_blank",
        className: "redis tech-logo bg-assets",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 212
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("a", {
        href: "https://www.elastic.co/products/elasticsearch",
        target: "_blank",
        className: "elastic tech-logo bg-assets",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 217
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("a", {
        href: "https://www.postgresql.org/",
        target: "_blank",
        className: "pg tech-logo bg-assets",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 222
        },
        __self: this
      }))), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "work-container",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 229
        },
        __self: this
      }, this.state.posts.map(function (p, i) {
        return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_components_post__WEBPACK_IMPORTED_MODULE_8__["default"], {
          data: p,
          i: i,
          key: 'post' + i,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 231
          },
          __self: this
        });
      })), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "foot",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 234
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "mine bg-assets",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 235
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("span", {
        className: "luv",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 236
        },
        __self: this
      }, "Made with \u2764\uFE0F by Arvind Narayan"), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("span", {
        className: "sidenote",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 237
        },
        __self: this
      }, "Hosted in", react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("a", {
        href: "https://surge.sh/",
        target: "_blank",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 239
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("b", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 240
        },
        __self: this
      }, "&nbspSurge")), ". Code is licensed under ", react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("b", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 242
        },
        __self: this
      }, "MIT"), " and available at", react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("a", {
        href: "https://github.com/TheArvindNarayan/website",
        target: "_blank",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 243
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("b", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 247
        },
        __self: this
      }, "&nbspGithub")), ". All images/graphics are licensed under ", react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("b", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 249
        },
        __self: this
      }, "CC BY-SA")), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("span", {
        className: "copy",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 251
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
//# sourceMappingURL=index.js.70ac294c970f6925d451.hot-update.js.map