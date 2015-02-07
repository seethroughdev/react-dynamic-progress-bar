'use strict';

var React  = require('react'),
    ProgressBar = require('../../react-state-progress-bar'),
    View;

View = React.createClass({
  getInitialState: function() {
    return {
      bar: true,
      ready: false
    };
  },

  handleClick: function(e) {
    e.preventDefault();
    this.setState({
      bar: !this.state.bar
    });
  },

  componentDidMount: function() {
    var _this = this;
    setTimeout(function() {
      _this.setState({
        bar: false,
        ready: true
      });
    }, 3500);
  },

  onBarComplete: function() {
    console.log('callback called!');
  },

  render: function() {

    return (
      <div>
        <p>
          <a onClick={this.handleClick} className="btn" href="#">Toggle Bar</a>
        </p>
        <p>&nbsp;</p>
        <pre>
          <code>
          &#123;this.state.bar === {this.state.bar.toString()}&#125;
          </code><code>
          &lt;ProgressBar bar=&#123;this.state.bar&#125; /&gt;
          </code>
        </pre>
        <ProgressBar
           bar={this.state.bar}
        />
      </div>
    );
  }
});

module.exports = View;
