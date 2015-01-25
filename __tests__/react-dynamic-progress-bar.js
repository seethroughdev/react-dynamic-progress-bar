jest.dontMock('../react-dynamic-progress-bar');

var React = require('react/addons'),
    ProgressBar = require('../react-dynamic-progress-bar'),
    TestUtils = React.addons.TestUtils;

describe("dynamic progress bar", function() {

  var El, bar;

  beforeEach(function() {
    El = TestUtils.renderIntoDocument(
      <ProgressBar />
    );
    bar = TestUtils.findRenderedDOMComponentWithTag(El, 'div');
  });

  it("should behave...", function() {
    expect(bar.getDOMNode().id).toEqual('progressBar');
  });

});
