///////////////////////////////////////////////////////////
// File        : Tree.js
// Description : 

// Imports : 

import React from "react";

/**
 * Glyphicon component
 * @class Glyphicon
 * @property {string} glyph required - glyphicon to display {@link https://getbootstrap.com/docs/3.3/components/#glyphicons}
 */

// Class Definition
export default
class Glyphicon extends React.Component {
  static defaultProps = {
    className: [],
    glyph: "warning-sign",
    onClick: null,
  };

  render() {
    let className = [];
    let { glyph, onClick } = this.props;
    const glyphicon = `glyphicon glyphicon-${glyph}`;
    className = className.concat(this.props.className);
    className.push(glyphicon);
    return (
      <span className={className.join(" ")} onClick={onClick}></span>
    );
  }
}
