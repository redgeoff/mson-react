// TODO: make full width of field include right margin if there is help?

import React from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Icon from '../icon';

export default class HelpToolTip extends React.PureComponent {
  render() {
    const { help } = this.props;

    // Note: we use disableTouchListener as otherwise the user needs to press and hold before the
    // tooltip appears, something that is not intuitive. With this configuration, the user can just
    // click the button to view the tooltip.
    return (
      <Tooltip disableTouchListener title={help}>
        <IconButton aria-label="Help" size="large">
          <Icon icon="HelpOutline" />
        </IconButton>
      </Tooltip>
    );
  }
}
