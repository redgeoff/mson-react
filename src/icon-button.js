import React, { useState, Fragment } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Icon from './icon';
import Tooltip from '@material-ui/core/Tooltip';

const TooltipIconButton = (props) => {
  const { onClick, icon, tooltipTitle } = props;

  const [hovered, setHovered] = useState(false);

  // NOTE: using Tooltips when we have 100 more items leads to a significant latency. We sidestep
  // this by only loading the tooltip on the initial mouse over.

  const button = (
    <IconButton onClick={onClick} onMouseEnter={() => setHovered(true)}>
      <Icon icon={icon} />
    </IconButton>
  );

  if (hovered) {
    return <Tooltip title={tooltipTitle}>{button}</Tooltip>;
  } else {
    return button;
  }
};

export default TooltipIconButton;
