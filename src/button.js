import React from 'react';
import IconButton from './icon-button';
import LabelButton from './label-button';

const Button = (props) => {
  const {
    type,
    disabled,
    label,
    icon,
    fullWidth,
    variant,
    marginTop,
    onClick,
    tooltip,
  } = props;

  if (label || !icon) {
    return (
      <LabelButton
        type={type}
        disabled={disabled}
        label={label}
        icon={icon}
        fullWidth={fullWidth}
        variant={variant}
        marginTop={marginTop}
        onClick={onClick}
      />
    );
  } else {
    return <IconButton onClick={onClick} icon={icon} tooltip={tooltip} />;
  }
};

export default Button;
