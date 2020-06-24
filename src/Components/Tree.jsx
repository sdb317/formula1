///////////////////////////////////////////////////////////
// File        : Tree.js
// Description : 

// Imports : 

import React from "react";
import {Form, InputGroup, Button} from "react-bootstrap";
import { isString } from "lodash";

import BaseComponent from "./BaseComponent";
import Glyphicon from "./Glyphicon";
import TreeNode from "./TreeNode";

/**
 * @param {array} data {} - The tree structure to select from, must be an object with eventually an array of children
 * @param {function} onSelect {} - The callback to receive the selected node
 * @param {string} mappingLabel "label" - the name of the node object field related to the node label
 * @param {string | array} mappingValue "value" - The name(s) of the node object field(s) related to the node value, used to match passed in values to actual tree nodes
 * @param {string} mappingChildren "children" - the name of the node object field related to the node children
 * @param {boolean} selectOnlyLeaf false - If enabled, only leaves can be selected and not the intermediary nodes
 * @param {boolean} expandToSelectedNodes false - If enabled, tree selection modal will recursively expand to all the already selected values
 * @param {array} defaultExpanded [] - an array of arrays describing a path of nodes expanded by default (tested on node labels, path parts are considered as RegExp)
 * @param {boolean} showOnlySearchedNodes false - Flag that determines if nodes that doesn't match the text search should be hidden
 */

// Class Definition
export default
class Tree extends BaseComponent {
// Attributes
  static defaultProps={mappingLabel: "label", mappingChildren: "children", selectOnlyLeaf: false, selectedNodes: [], expandToSelectedNodes: false, defaultExpanded: []};
  state = {query:null, queryInput:""};
  timer = null;

// Constructor
  constructor(props) {
    super(props);
  }


// Operations
  render() {
    let defaultExpanded = this.props.defaultExpanded;
    if (!defaultExpanded || defaultExpanded.length === undefined) {
      defaultExpanded = [];
    } else if (defaultExpanded.length > 0 && isString(defaultExpanded[0])) {
      defaultExpanded = [defaultExpanded];
    }

    return (
      <div className="formula1-tree">
        <Form.Group controlId="Tree Node Search" className="formula1-tree-search">
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text><Glyphicon glyph="search" /></InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control type="text"
              className={"formula1-tree-search-input"}
              placeholder="Search"
              onChange={this.handleChange.bind(this)}
              value={this.state.queryInput} />
            <InputGroup.Append>
              <Button variant="outline-secondary" onClick={this.reset.bind(this)}><Glyphicon glyph="remove" /></Button>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>

        <TreeNode
          data={this.props.data}
          onSelect={(node) => this.onSelect(node)}
          query={this.state.query}
          mappingLabel={this.props.mappingLabel}
          mappingChildren={this.props.mappingChildren}
          selectOnlyLeaf={this.props.selectOnlyLeaf}
          selectedNodes={this.props.selectedNodes}
          expandToSelectedNodes={this.props.expandToSelectedNodes}
          defaultExpanded={defaultExpanded}
          showOnlySearchedNodes={this.props.showOnlySearchedNodes}
          level={0}
        />
      </div>
    );
  }

  handleChange(e) {
    e.stopPropagation();
    const self = this;
    const newQuery = e.target.value;
    self.setState({ queryInput: e.target.value });
    if (this.timer) {
      clearTimeout(this.timer);
    }
    let newQueryRegexp;
    try {
      //We use a regexp to search into the serialized tree structure as it's fast and practical to be able to use a regexp for search
      newQueryRegexp = newQuery.length >= 1 ? new RegExp(":\".*?" + newQuery + ".*?\"", "i") : null;
      this.timer = setTimeout(function () {
        self.setState({ query: newQueryRegexp });
      }, 750);
    }
    catch (e) { ""; } //Silent fail is intended to prevent errors thrown during the type of a regexp by the user
  }

  onSelect(node) {
    if (this.props.onSelect) {
      if (this.props.mappingValue) {
        if (Array.isArray(this.props.mappingValue)) {
          let value = {};
          this.props.mappingValue.map((item) => value[item] = node[item]);
          this.props.onSelect(value);
        } else {
          this.props.onSelect(node[this.props.mappingValue]);
        }
      } else {
        this.props.onSelect(node);
      }
    }
  }

  reset() {
    this.setState({query: null, queryInput: ""});
  }


}

// Exports

