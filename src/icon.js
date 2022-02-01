import React from 'react';
import IconMui from '@material-ui/core/Icon';
import utils from './utils';

// Note: we use font icons instead of SVG icons as this allows us to support any icon dynamically
// without adding all icons to the JS bundle. The MaterialUI icons are about 54KB which is
// substantially smaller than their SVG counterparts.
//
// import * as Icons from '@material-ui/icons';

export default class Icon extends React.PureComponent {
  handleClick = (event) => {
    if (this.props.onClick) {
      this.props.onClick(event);
    }
  };

  // Convert to the font icon name so that we can use the SVG Icon names in the MSON. This allows us
  // switch between font and SVG icons without changing the MSON definitions.
  toFontIconName(svgIconName) {
    return utils.snakeCase(svgIconName);
  }

  render() {
    const { className, icon, role } = this.props;

    const iconContents = icon ? this.toFontIconName(icon) : null;

    return (
      <IconMui
        className={className}
        onClick={this.handleClick}
        aria-hidden={this.props['aria-hidden']}
        aria-label={this.props['aria-label']}
        role={role}
      >
        {iconContents}
      </IconMui>
    );
  }
}
