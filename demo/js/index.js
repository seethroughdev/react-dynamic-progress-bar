'use strict';

var React = require('react'),
    Demo = require('./demo.jsx'),
    Demo2 = require('./demo2.jsx');

React.render(
  <Demo />,
  document.getElementById('demo')
);

React.render(
  <Demo2 />,
  document.getElementById('demo2')
);

module.exports = '';
