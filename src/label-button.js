import React from 'react';
import ButtonMui from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Icon from './icon';

const useStyles = makeStyles((theme) => ({
  leftIcon: {
    marginRight: theme.spacing(1),
  },
  marginTop: {
    marginTop: theme.spacing(3),
  },
}));

const handleClick = (onClick) => {
  if (onClick) {
    onClick();
  }
};

const Button = (props) => {
  const classes = useStyles();

  const {
    type,
    disabled,
    label,
    icon,
    fullWidth,
    variant,
    marginTop,
    onClick,
  } = props;

  const className = marginTop !== false ? classes.marginTop : null;

  return (
    <ButtonMui
      className={className}
      type={type}
      color="primary"
      disabled={disabled}
      onClick={() => handleClick(onClick)}
      fullWidth={fullWidth}
      variant={variant}
    >
      {icon ? <Icon className={classes.leftIcon} icon={icon} /> : null}
      {label}
    </ButtonMui>
  );
};

export default Button;
