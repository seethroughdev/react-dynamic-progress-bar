'use strict';

var React  = require('react'),
    ProgressBar = require('../../react-state-progress-bar'),
    View;

View = React.createClass({
  getInitialState: function() {
    return {
      bar: false
    };
  },

  handleClick: function(e) {
    e.preventDefault();
    this.setState({
      bar: !this.state.bar
    });
  },

  componentDidMount: function() {
  },

  onBarComplete: function() {
    console.log('callback called!');
  },

  render: function() {

    return (
      <div>
        <p>
          <a onClick={this.handleClick} className="btn" href="#">Toggle Bar 2</a>;
        </p>
        <ProgressBar
           bar={this.state.bar}
           barColor='#990000'
           barHeight='10'
           barId='myNewBarId'
           barClass='myNewBarClass'
           barCallback={this.onBarComplete}
        />
      </div>
    );
  }
});

module.exports = View;
