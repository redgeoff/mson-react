import React, { useState } from 'react';
import IconButtonMui from '@mui/material/IconButton';
import Icon from './icon';
import Tooltip from '@mui/material/Tooltip';

const IconButton = (props) => {
  const { onClick, icon, tooltip } = props;

  const [hovered, setHovered] = useState(false);

  // NOTE: using Tooltips when we have 100 more items leads to a significant latency. We sidestep
  // this by only loading the tooltip on the initial mouse over.

  const button = (
    <IconButtonMui
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      aria-label={props['aria-label']}
    >
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
