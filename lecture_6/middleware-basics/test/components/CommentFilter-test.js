'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import CommentFilter from '../../components/CommentFilter';
import {renderWithWrapperAndFind} from '../Wrapper';

const defaultProps = {
  authors: [],
  selectedAuthor: "",
  onSelectAuthor: sinon.stub()
}

describe('CommentFilter', () => {
  var buildFilter = ((props) => {
    const allProps = Object.assign({}, defaultProps, props)
    return renderWithWrapperAndFind(React.createElement(CommentFilter, allProps), 'comment-filter')
  });

  it('has default option All', () => {
    let filter = buildFilter();
    let select = filter.children[1]
    let optionNodes = select.children

    expect(optionNodes.length).to.eq(1)
    expect(optionNodes[0].value).to.eq('')
    expect(optionNodes[0].text).to.eq('All')
    expect(select.value).to.eq('')
  });

  it('has header for selecting author', () => {
    let filter = buildFilter()
    let header = filter.children[0]

    expect(header.tagName).to.eq('H3')
    expect(header.textContent).to.eq('Filter by author: ')
  })

  it('creates options for authors', () => {
    let filter = buildFilter({
      authors: ["a", "b"]
    });
    let select = filter.children[1]
    let optionNodes = select.children

    expect(optionNodes.length).to.eq(3)
    expect(optionNodes[1].value).to.eq("a")
    expect(optionNodes[1].text).to.eq("a")
    expect(optionNodes[2].value).to.eq("b")
    expect(optionNodes[2].text).to.eq("b")
  });

  it('calls onSelectAuthor when option selected', () => {
    let onSelectAuthor = sinon.stub()
    let filter = buildFilter({
      authors: ["a", "b"],
      onSelectAuthor: onSelectAuthor
    });
    let select = filter.children[1]
    select.value = "a"
    TestUtils.Simulate.change(select);
    expect(onSelectAuthor).to.have.been.calledWith("a")
  })
});

