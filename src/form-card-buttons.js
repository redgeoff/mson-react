import React from 'react';
import IconButton from './icon-button';
import Grid from '@mui/material/Grid';

// FUTURE: support for hamburger menus
export default class FormCardButtons extends React.PureComponent {
  render() {
    const {
      forbidUpdate,
      forbidDelete,
      editable,
      disabled,
      archivedAt,
      onEdit,
      onDelete,
      id,
    } = this.props;

    let updateButton = null;
    if (!forbidUpdate) {
      updateButton = (
        <IconButton
          onClick={onEdit}
          icon="Edit"
          tooltip="Edit"
          aria-label={`Edit ${id}`}
          size="large"
        />
      );
    }

    let deleteButton = null;
    if (!forbidDelete) {
      const title = archivedAt ? 'Restore' : 'Delete';
      deleteButton = (
        <IconButton
          onClick={onDelete}
          icon={title}
          tooltip={title}
          aria-label={`Delete ${id}`}
          size="large"
        />
      );
    }

    if (editable && !disabled && (!forbidUpdate || !forbidDelete)) {
      return (
        <Grid item>
          {updateButton}
          {deleteButton}
        </Grid>
      );
    } else {
      return null;
    }
  }
}
