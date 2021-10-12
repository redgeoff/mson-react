import React from 'react';
import classNames from 'classnames';
import Select from 'react-select';
import { emphasize } from '@mui/material/styles';
import withStyles from '@mui/styles/withStyles';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import MenuItem from '@mui/material/MenuItem';
import Icon from '../icon';

const styles = (theme) => ({
  input: {
    display: 'flex',
    padding: 0,
    minWidth: 240, // A good default for most labels
    height: 'auto',
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',

    // Adjust for MUI label
    marginTop: theme.spacing(2) + 5,
  },
  chip: {
    margin: `${theme.spacing(1)} ${theme.spacing(0.25)}`,
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.mode === 'light'
        ? theme.palette.grey[300]
        : theme.palette.grey[700],
      0.08
    ),
  },
  noOptionsMessage: {
    padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
  },
  singleValue: {
    fontSize: theme.typography.subtitle1.fontSize,
  },
  // placeholder: {
  //   position: 'absolute',
  //   left: 2,
  //   fontSize: theme.typography.subtitle1.fontSize
  // },
  paper: {
    position: 'absolute',
    zIndex: 1,

    // Adjust for MUI label
    // marginTop: theme.spacing.unit * 7
    marginTop: theme.spacing(1),
  },
  root: {
    // Allow for help icon to be placed on right of field
    display: 'inline-flex',
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    color: theme.palette.text.secondary,
  },
});

function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

function Control(props) {
  const optionalProps = {};
  if (props.selectProps.fullWidth) {
    optionalProps.fullWidth = true;
  }
  return (
    <TextField
      {...optionalProps}
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          // We need to specify the aria-label so that this element is the one that receives focus
          // for the target field label
          'aria-label': props.selectProps.ariaLabel,
          ...props.innerProps,
        },
      }}
      {...props.selectProps.textFieldProps}
    />
  );
}

function Option(props) {
  return (
    <MenuItem
      ref={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400,
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

// Note: kept in case we want to implement the placeholder in the future
// function Placeholder(props) {
//   return (
//     <Typography
//       color="textSecondary"
//       className={props.selectProps.classes.placeholder}
//       {...props.innerProps}
//     >
//       {props.children}
//     </Typography>
//   );
// }

function SingleValue(props) {
  return (
    <Typography
      className={classNames(
        props.selectProps.classes.singleValue,
        props.selectProps.isDisabled ? props.selectProps.classes.disabled : null
      )}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function ValueContainer(props) {
  return (
    <div className={props.selectProps.classes.valueContainer}>
      {props.children}
    </div>
  );
}

function MultiValue(props) {
  return (
    <Chip
      tabIndex={-1}
      label={props.children}
      className={classNames(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused,
        [props.selectProps.classes.disabled]: props.selectProps.isDisabled,
      })}
      onDelete={props.removeProps.onClick}
      deleteIcon={
        <Icon
          icon="Cancel"
          aria-label="Remove"
          role="button"
          aria-hidden="false"
        />
      }
    />
  );
}

function Menu(props) {
  return (
    <Paper
      square
      className={props.selectProps.classes.paper}
      {...props.innerProps}
    >
      {props.children}
    </Paper>
  );
}

const components = {
  Control,
  Menu,
  MultiValue,
  NoOptionsMessage,
  Option,
  // Placeholder,
  SingleValue,
  ValueContainer,
};

class AutoCompleteSelect extends React.Component {
  render() {
    const {
      classes,
      options,
      isClearable,
      placeholder,
      onChange,
      onBlur,
      onFocus,
      onInputChange,
      value,
      isDisabled,
      fullWidth,
      isMulti,
      id,
    } = this.props;

    const selectStyles = {
      dropdownIndicator: (base) => ({
        ...base,
        cursor: 'pointer',
      }),
      clearIndicator: (base) => ({
        ...base,
        cursor: 'pointer',
      }),

      // Needed so that the menu appears above any dialog windows
      menuPortal: (base) => ({
        ...base,
        zIndex: 2000,
      }),
    };

    return (
      <Select
        id={id}
        className={classNames(classes.root, fullWidth && classes.fullWidth)}
        classes={classes}
        styles={selectStyles}
        options={options}
        components={components}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        onInputChange={onInputChange}
        placeholder={placeholder}
        isClearable={isClearable}
        isDisabled={isDisabled}
        fullWidth={fullWidth}
        isMulti={isMulti}
        // Needed so that the menu is not clipped by the app's root level overflow:hidden or when it
        // appears in a dialog window
        menuPortalTarget={document.body}
        // Specify ariaLabel instead of aria-label as it is the Control that needs to render the
        // aria-label
        ariaLabel={this.props['aria-label']}
      />
    );
  }
}

export default withStyles(styles)(AutoCompleteSelect);
