import React from 'react';
import withStyles from '@mui/styles/withStyles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Component from './component';
import attach from './attach';
import FormCardButtons from './form-card-buttons';

const styles = (theme) => ({
  paper: {
    margin: theme.spacing(1),
    padding: theme.spacing(2),
  },
  content: {
    flex: 1,
    cursor: 'pointer',
  },
});

// Use PureComponent so that we avoid unnecessary re-rendering
class FormCard extends React.PureComponent {
  handleClick = (event) => {
    if (this.props.onClick) {
      this.props.onClick(event, this.props.component);
    }
  };

  handleEdit = (event, id) => {
    if (this.props.onEdit) {
      this.props.onEdit(event, this.props.component);
    }
  };

  handleDelete = (event) => {
    // this.handleMoreClose();
    if (this.props.onDelete) {
      this.props.onDelete(this.props.component);
    }
  };

  render() {
    const {
      classes,
      component,
      forbidUpdate,
      forbidDelete,
      editable,
      disabled,
      value,
      buttons,
      id,
    } = this.props;

    let cardButtons;
    if (buttons) {
      cardButtons = <Component component={buttons} />;
    } else {
      cardButtons = (
        <FormCardButtons
          forbidUpdate={forbidUpdate}
          forbidDelete={forbidDelete}
          editable={editable}
          disabled={disabled}
          archivedAt={value.archivedAt}
          onEdit={(event) => this.handleEdit(event)}
          onDelete={(event) => this.handleDelete(event)}
          id={id}
        />
      );
    }

    return (
      <div>
        <Paper className={classes.paper}>
          <Grid container wrap="nowrap">
            <Grid
              item
              className={classes.content}
              onClick={(event) => this.handleClick(event)}
              role="button"
              aria-label={this.props['aria-label']}
              id={id}
            >
              <Component component={component} formTag={false} mode="read" />
            </Grid>
            {cardButtons}
          </Grid>
        </Paper>
      </div>
    );
  }
}

FormCard = withStyles(styles)(FormCard);
export default attach(['value'])(FormCard);
