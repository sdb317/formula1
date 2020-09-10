///////////////////////////////////////////////////////////
// File        : Tree.js
// Description : 

// Imports : 

import React from "react";
import injectStyles from "react-jss";

const styles = {
  "@global": {
  },
  glyphicon: {
    position: "relative",
    top: "1px",
    display: "inline-block",
    fontFamily: "Glyphicons Halflings",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "1",
    // -webkit-font-smoothing: antialiased,
    // -moz-osx-font-smoothing: grayscale,
  },
  plus: {
    "&:before": {
      content: "'\x2b'"
    }
  },
}

/**
 * Glyphicon component
 * @class Glyphicon
 * @property {string} glyph required - glyphicon to display {@link https://getbootstrap.com/docs/3.3/components/#glyphicons}
 */

// Class Definition
export default
@injectStyles(styles)
class Glyphicon extends React.Component {
  static defaultProps = {
    className: [],
    glyph: "warning-sign",
    onClick: null,
  };

  render() {
    let className = [];
    let { classes, glyph, onClick } = this.props;
    // const glyphicon = `glyphicon glyphicon-${glyph}`;
    // className = className.concat(this.props.className);
    // className.push(glyphicon);
    return (
      // <span className={className.join(" ")} onClick={onClick}></span>
      <span className={`${classes.glyphicon} ${classes.plus}`} onClick={onClick}></span>
    );
  }
}
