import React from 'react';
import IconButton from './icon-button';
import Grid from '@material-ui/core/Grid';

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
    } = this.props;

    let updateButton = null;
    if (!forbidUpdate) {
      updateButton = <IconButton onClick={onEdit} icon="Edit" tooltip="Edit" />;
    }

    let deleteButton = null;
    if (!forbidDelete) {
      const title = archivedAt ? 'Restore' : 'Delete';
      deleteButton = (
        <IconButton onClick={onDelete} icon={title} tooltip={title} />
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
