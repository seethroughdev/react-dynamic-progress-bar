/*!
 * react-dynamic-progress-bar.js
 * version : 1.1.0
 * author : seethroughtrees
 * license : MIT
 *
 * Includes:
 * 1. requestAnimationFrame Polyfill
 * 2. Dynamic Progress Bar - React Component
 */

"use strict";

var React = window.React || require("react"),
    RP = React.PropTypes;

/*======================================================
=            1. requestAnimationFrame polyfill         =
======================================================*/

// Read about it here: https://github.com/darius/requestAnimationFrame/blob/master/requestAnimationFrame.js

if (!Date.now) Date.now = function () {
  return new Date().getTime();
};

(function () {
  var vendors = ["webkit", "moz"];
  for (var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
    var vp = vendors[i];
    window.requestAnimationFrame = window[vp + "RequestAnimationFrame"];
    window.cancelAnimationFrame = window[vp + "CancelAnimationFrame"] || window[vp + "CancelRequestAnimationFrame"];
  }
  if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
    var lastTime = 0;
    window.requestAnimationFrame = function (callback) {
      var now = Date.now();
      var nextTime = Math.max(lastTime + 16, now);
      return setTimeout(function () {
        callback(lastTime = nextTime);
      }, nextTime - now);
    };
    window.cancelAnimationFrame = clearTimeout;
  }
})();

/*=======================================
=            2. React Component         =
=======================================*/

var dynamicProgressBar = React.createClass({
  displayName: "dynamicProgressBar",



  /*==========  INIT  ==========*/

  resetStateValues: {
    value: 0,
    complete: false
  },

  getInitialState: function getInitialState() {
    return this.resetStateValues;
  },

  propTypes: {
    basssr: RP.bool.isRequired
  },

  /*==========  Bar State  ==========*/

  resetValue: function resetValue() {
    this.setState(this.resetStateValues);
    this.styleTransform(true);
    this.checkValue();
    console.log("reset", this.props.bar);
  },

  checkValue: function checkValue() {
    if (this.props.bar === true) {
      this.incrementStatus(this.state.value);
      return window.requestAnimationFrame(this.checkValue);
    } else if (this.props.bar === false) {
      return this.finishValue();
    }

    return;
  },

  finishValue: function finishValue() {
    var val = this.state.value;

    if (val >= 1) {
      setTimeout(this.completeValue, 750);
      return;
    }

    this.setState({
      value: val + val * 0.02
    });

    window.requestAnimationFrame(this.finishValue);
  },

  completeValue: function completeValue() {
    this.setState({
      complete: true
    });
  },

  /**
   * Progressively ease incrementing of status
   * @param  {Number} val Current value of the progress bar
   * @return {Number}     Updated value of the progress bar
   */
  incrementStatus: function incrementStatus(val) {
    if (val > 0.74) {
      return;
    }

    // maths.  If someone has a better way to do this, please let me know!
    var newValue = val + Math.cos(val * (Math.PI / 1.6)) * 0.001;

    this.setState({
      value: newValue
    });

    return newValue;
  },

  /*==========  CSS  ==========*/

  defaultStyle: function defaultStyle() {
    return {
      height: this.props.barHeight || 3,
      background: this.props.barColor || "#00b4ff",
      position: "fixed",
      zIndex: 100,
      transition: "transform 200ms linear",
      MozTransition: "-moz-transform 200ms linear",
      WebkitTransition: "-webkit-transform 200ms linear",
      MsTransition: "-ms-transform 200ms linear",
      OTransition: "o-transform 200ms linear",
      top: 0,
      left: 0
    };
  },

  /**
   * Setup initial style object.
   * If props.barStyle object is included, merge and override existing style
   * @param {Object} styleProps Custom props to merge into defaults
   * @return {Object}           Complete style object for bar
   */
  setStyle: function setStyle(styleProps) {
    var style = this.defaultStyle(),
        key;

    // shallow merge of style objects
    if (styleProps) {
      for (key in styleProps) {
        style[key] = styleProps[key];
      }
    }

    if (this.props.barPosition === "bottom") {
      delete style.top;
      style.bottom = 0;
    }

    return style;
  },

  /**
   * Add css transform to style
   * @param  {Boolean} reset If true, styleHeight will reset to zero
   * @return {Object}        Updated style object with transforms
   */
  styleTransform: function styleTransform(reset) {
    var style = this.style,
        styleHeight = 0,
        transformPrefixes = ["transform", "WebkitTransform", "MozTransform", "MsTransform", "OTransform"];

    if (!reset) {
      // make the translate positive or negative depending on the position
      styleHeight = this.props.barPosition === "bottom" ? style.height : style.height * -1;
    }

    // append styles to object
    transformPrefixes.forEach(function (val) {
      style[val] = "translateY(" + styleHeight + "px)";
    });

    return style;
  },



  /*==========  LIFECYCLE  ==========*/

  // only check the value if the status prop has changed
  componentWillReceiveProps: function componentWillReceiveProps(nextprops) {
    if (nextprops.bar === true && this.state.complete) {
      setTimeout(this.resetValue, 400);
    } else if (typeof nextprops.bar === "boolean") {
      this.checkValue();
    }
  },

  componentWillMount: function componentWillMount() {
    // set style on mount so its only done once.
    this.style = this.setStyle(this.props.barStyle);

    // if status is false by default, run right away
    if (this.props.bar === true) {
      this.checkValue();
    }
  },


  /*==========  RENDER  ==========*/

  render: function render() {
    // hide bar after complete
    if (this.state.complete) {
      this.styleTransform();
    }

    var style = this.style;
    style.width = this.props.barValue || this.state.value * 100 + "%";

    return React.createElement("div", {
      id: "progressBar",
      style: style,
      "data-bar-value": this.state.value
    });
  }
});

module.exports = dynamicProgressBar;