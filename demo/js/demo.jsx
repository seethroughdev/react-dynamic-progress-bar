'use strict';

var React  = window.React || require('react'),
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
    // var _this = this;
    // setTimeout(function() {
    //   _this.setState({
    //     bar: false
    //   })
    // }, 5000);
  },

  render: function() {
    return (
      <div>
        <p>
          <a onClick={this.handleClick} className="btn" href="#">Toggle Bar</a>
        </p>
        <p>&nbsp;</p>
        <p>
          <code>&#123;this.state.bar === {this.state.bar.toString()}&#125;</code>
        </p>
        <p>
          <code>&lt;ProgressBar bar=&#123;this.state.bar&#125; /&gt;</code>
        </p>
        <ProgressBar bar={this.state.bar} />
      </div>
    );
  }
});

module.exports = View;
