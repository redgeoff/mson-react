import React, { useState } from 'react';
import IconButtonMui from '@material-ui/core/IconButton';
import Icon from './icon';
import Tooltip from '@material-ui/core/Tooltip';

const IconButton = (props) => {
  const { onClick, icon, tooltip } = props;

  const [hovered, setHovered] = useState(false);

  // NOTE: using Tooltips when we have 100 more items leads to a significant latency. We sidestep
  // this by only loading the tooltip on the initial mouse over.

  const button = (
    <IconButtonMui onClick={onClick} onMouseEnter={() => setHovered(true)}>
      <Icon icon={icon} />
    </IconButtonMui>
  );

  if (hovered && tooltip) {
    return <Tooltip title={tooltip}>{button}</Tooltip>;
  } else {
    return button;
  }
};

export default IconButton;
