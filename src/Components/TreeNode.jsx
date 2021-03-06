///////////////////////////////////////////////////////////
// File        : TreeNode.js
// Description : 

// Imports : 

import React from "react";
import injectStyles from "react-jss";
import { Badge, Button, Glyphicon, Label } from "react-bootstrap";
import { intersection, find } from "lodash";

// import Glyphicon from "./Glyphicon"; // Not included in Bootstrap 4

let treeNodeStyles = {
  node: {
    listStyleType: "none",
    "& .formula1-tree-node-selector": {
      marginLeft: "3px"
    },
    "& .formula1-tree-node-expand:focus": {
      outline: "none"
    },
    "&.hidden": {
      display: "none"
    }
  },
  childrenList: {
    marginLeft: "20px",
    paddingLeft: 0
  },
  leafPlaceHolder: {
    width: "23px",
    display: "inline-block"
  },
  labelSelected: {
    display: "inline-block",
    marginRight: "4px",
    padding: "2px 3px 3px 2px",
    fontSize: "0.6em",
    verticalAlign: "middle"
  }
};

// Class Definition
export default
@injectStyles(treeNodeStyles)
class TreeNode extends React.Component {
// Attributes

// Constructor
  constructor(props) {
    super(props);
    this.matchesExpanded = [];
    if(props.expandToSelectedNodes && this.hasSelectedChildren(props.data)){
      this.state = {expand: true};
    } else if(props.query && props.data.children){
      this.state = {expand: props.query.test(JSON.stringify(props.data.children))};
    } else if(this.matchDefaultExpanded()){
      this.state = {expand: true};
    } else {
      this.state = {expand: false};
    }
  }


// Operations
  render() {
    let { classes, data, mappingLabel, mappingChildren, selectOnlyLeaf, selectedNodes, expandToSelectedNodes, showOnlySearchedNodes } = { ...this.props };

    let hideThisNode = false;
    //showOnlySearchedNodes: If search doesnt match the node and we want to hide parts of the tree that are not relevant to the search
    if (showOnlySearchedNodes && this.props.query) {
      let dataCopy = JSON.parse(JSON.stringify(data));
      if (dataCopy[mappingChildren]) {
        delete dataCopy[mappingChildren];
      }
      let match = this.props.query.test(JSON.stringify(dataCopy));
      if (!match && !this.state.expand) {
        hideThisNode = true;
      } else if (match && this.state.expand) {
        showOnlySearchedNodes = false;
      }
    }

    const label = data[mappingLabel];

    let children = undefined;

    let isSelected = this.props.selectedNodes.indexOf(this.props.data) !== -1;

    if (data[mappingChildren] && data[mappingChildren].length !== undefined) {
      if (this.state.expand) {
        children = data[mappingChildren].map((child, index) => {
          return (
            <TreeNode
              data={child}
              onSelect={this.props.onSelect}
              key={index}
              query={this.props.query}
              classes={this.props.classes}
              mappingLabel={mappingLabel}
              mappingChildren={mappingChildren}
              selectOnlyLeaf={selectOnlyLeaf}
              selectedNodes={selectedNodes}
              expandToSelectedNodes={expandToSelectedNodes}
              defaultExpanded={this.props.defaultExpanded}
              showOnlySearchedNodes={showOnlySearchedNodes}
              level={this.props.level + 1}
            />
          );
        });
      } else {
        children = [];
      }
    }

    return (
      <li className={`${classes.node} ${hideThisNode && "hidden"} formula1-tree-node`}>
        {children != undefined ?
          <Button className={"formula1-tree-node-expand"} bsStyle={"link"} bsSize={"xsmall"} onClick={this.toggle.bind(this)}>
            <Glyphicon glyph={this.state.expand?"minus":"plus"}/>
          </Button>
          /* Bootstrap 4
          <Button variant="light" className={"formula1-tree-node-expand"} size="sm" onClick={this.toggle.bind(this)}>
            <Glyphicon glyph={this.state.expand ? "minus" : "plus"} />
          </Button>
          */
          :
          <span className={classes.leafPlaceHolder} />
        }
        <a className={"formula1-tree-node-selector"} onClick={this.handleClickSelect.bind(this)} style={{ cursor: "pointer", textDecoration: "none", color: "inherit" }}>
          {isSelected?
            <Label bsStyle={"success"} className={classes.labelSelected}><Glyphicon glyph={"ok"}/></Label>
            :null}
          {label}
        </a>
        {/* Bootstrap 4
        <a className={"formula1-tree-node-selector"} onClick={this.handleClickSelect.bind(this)} style={{ cursor: "pointer", textDecoration: "none", color: "inherit" }}>
          {isSelected ?
            <Badge bsStyle={"success"} className={classes.labelSelected}><Glyphicon glyph={"ok"} /></Badge>
            : null}
          {label}
        </a>
        */}

        {(children != undefined && this.state.expand) &&
          <ul className={`${classes.childrenList} formula1-tree-node-children`}>{children}</ul>
        }
      </li>
    );
  }

  matchDefaultExpanded() {
    this.matchesExpanded = [];
    if (this.props.defaultExpanded && this.props.defaultExpanded.length > 0) {
      this.props.defaultExpanded.forEach(path => {
        if (path.length > this.props.level && (new RegExp(path[this.props.level], "gi")).test(this.props.data[this.props.mappingLabel])) {
          this.matchesExpanded.push(path);
        }
      });
    }
    return this.matchesExpanded.length > 0;
  }

  hasSelectedChildren(node) {
    return (node.children !== undefined && node.children.length !== 0) &&
      (intersection(this.props.selectedNodes, node.children).length > 0 ||
        find(node.children, child => this.hasSelectedChildren(child)));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.query !== this.props.query) {
      if (nextProps.query && nextProps.data.children) {
        this.setState({ expand: nextProps.query.test(JSON.stringify(nextProps.data.children)) });
      } else if (this.matchDefaultExpanded()) {
        this.setState({ expand: true });
      } else {
        this.setState({ expand: false });
      }
    }
  }

  handleClickSelect() {
    let { mappingChildren } = { ...this.props };
    if (this.props.selectOnlyLeaf && this.props.data[mappingChildren] !== undefined && this.props.data[mappingChildren].length > 0) {
      this.toggle();
    } else if (this.props.onSelect) {
      this.props.onSelect(this.props.data);
    }
  }

  toggle() {
    this.setState({ expand: !this.state.expand });
  }


}

// Exports

