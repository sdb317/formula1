/*global QUnit */
/* eslint-disable no-console */

import React from "react";
import ReactDOM from "react-dom";

import { observable, computed } from "mobx";
import { observer } from "mobx-react";

import Tree from "./Components/Tree";

import Associations from "./TestData/Associations.json";
import Options from "./TestData/Options.json";

@observer
class Component extends React.Component {
  childComponents = [];
  associations = Associations;
  options = Options;

  constructor(props) {
    super(props);
  }

  render() {
    console.log("Component.render");
    return (
      <div>
        <div>Formula1</div>
        <Tree
          data={this.associations}
          onSelect={this.onSelect.bind(this)} 
          mappingLabel="name"
          mappingValue={["value","type"]}
          selectOnlyLeaf={true}
          showOnlySearchedNodes={true}
          defaultExpanded={['.','.']}
          ref={(childComponent) => { this.childComponents.push(childComponent); }}
        />
      </div>
    );
  }

  onSelect(data) {
    console.log(JSON.stringify(data));
  }
}

QUnit.module("Test", function (hooks) {
  console.clear();
  try {
    this.component = ReactDOM.render(<Component />, document.getElementById("react"));
  } catch (error) {
    debugger;
  }

  hooks.before(function (assert) {
    console.log("QUnit.hooks.before");
    assert.ok(true, "before");
  });

  QUnit.test("renderedParent", function (assert) {
    console.log("QUnit." + assert.test.testName);
    assert.ok(typeof this.component.props == "object", "passed");
  });

  QUnit.test("rendered", function (assert) {
    console.log("QUnit." + assert.test.testName);
    assert.ok(this.component.childComponents.length > 0, "passed");
  });

  // hooks.after(function (assert) { // Not getting called here for some reason
  //   console.log("QUnit.hooks.after");
  //   ReactDOM.unmountComponentAtNode(document.getElementById("react"));
  //   assert.ok(true, "after");
  // });
});

