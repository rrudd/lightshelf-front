import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

jest.dontMock('../Button.js');

const Button = require('../Button.js').default;

describe('Button', () => {
  it('has label', () => {
    const button = TestUtils.renderIntoDocument(
      <Button text="Test" />
    );
    const buttonNode = ReactDOM.findDOMNode(button);

    expect(buttonNode.textContent).toEqual(' Test');
  });

  it('has icon', () => {
    const button = TestUtils.renderIntoDocument(
      <Button icon="fa fa-search" />
    );

    const icon = TestUtils.findRenderedDOMComponentWithTag(button, 'i');

    expect(icon.className).toEqual('fa fa-search');
  });

  it('runs a function on click', () => {
    spyOn(window, 'alert');
    const button = TestUtils.renderIntoDocument(
      <Button handleClick={alert('a message')} />
    );
    TestUtils.Simulate.click(button);
    expect(window.alert).toHaveBeenCalledWith('a message');
  })
});
