import React from 'react';
import Button from './button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import DialogContent from '@material-ui/core/DialogContent';
import Component from './component';
import attach from './attach';
import CollectionFieldCore from 'mson/lib/fields/collection-field';

class FormDialog extends React.PureComponent {
  state = { saveClicked: false, previousMode: null };

  handleClose = (withCancelButton) => {
    // Prevent the user from losing data when pressing esc or clicking outside dialog
    const { mode, onClose, onCancel, currentForm } = this.props;
    if (withCancelButton || mode !== 'update') {
      if (mode === 'update') {
        if (onCancel) {
          onCancel(currentForm);
        }
      } else {
        if (onClose) {
          onClose(currentForm);
        }
      }
    }
  };

  handleEdit = () => {
    if (this.props.onEdit) {
      this.props.onEdit(this.props.currentForm);
    }
  };

  handleSave = (event) => {
    // Stop the form from refreshing the page
    event.preventDefault();

    // Should the submit action be disabled? For example, we may be editing in a nested dialog
    if (!this.props.disableSubmit) {
      if (this.props.onSave) {
        this.props.onSave();
      }

      // Disable the save button so that the user sees that something is being processed
      this.setState({ saveClicked: true });
    }
  };

  handleDelete = () => {
    if (this.props.onDelete) {
      this.props.onDelete(this.props.currentForm);
    }
  };

  isOpen() {
    const { mode } = this.props;
    if (
      mode === CollectionFieldCore.MODES.DELETE ||
      mode === CollectionFieldCore.MODES.RESTORE
    ) {
      // Don't show the dialog when restoring
      return false;
    } else {
      return !!mode;
    }
  }

  componentDidUpdate(prevProps) {
    // If the mode or err changes then allow the user to click save
    if (
      this.props.mode !== prevProps.mode ||
      this.props.err !== prevProps.err
    ) {
      this.setState({ saveClicked: false });
    }

    if (this.props.mode !== prevProps.mode) {
      this.setState({ previousMode: prevProps.mode });
    }
  }

  render() {
    const {
      mode,
      component,
      forbidUpdate,
      forbidDelete,
      value,
      fullScreen,
    } = this.props;

    const { saveClicked, previousMode } = this.state;

    const disableSave =
      component.hasErrorForTouchedField() ||
      !component.get('dirty') ||
      saveClicked;

    const open = this.isOpen();

    let buttons = null;

    // Note: we analyze the previousMode so that the user isn't flashed with new buttons immediately
    // after they click save or close the dialog
    if (
      mode === 'update' ||
      mode === 'create' ||
      (mode === null &&
        (previousMode === 'update' || previousMode === 'create'))
    ) {
      buttons = (
        <div>
          {/* We use type=submit so that the form is submitted when the user presses enter */}
          <Button
            type="submit"
            label="Save"
            icon="Save"
            disabled={disableSave}
          />
          <Button
            label="Cancel"
            icon="Cancel"
            onClick={() => this.handleClose(true)}
          />
        </div>
      );
    } else if (!forbidUpdate || !forbidDelete) {
      buttons = (
        <div>
          {forbidUpdate ? (
            ''
          ) : (
            <Button label="Edit" icon="Edit" onClick={this.handleEdit} />
          )}
          {forbidDelete ? (
            ''
          ) : (
            <Button
              label={value.archivedAt ? 'Restore' : 'Delete'}
              icon={value.archivedAt ? 'Restore' : 'Delete'}
              onClick={this.handleDelete}
            />
          )}
          <Button
            label="Close"
            icon="Cancel"
            onClick={() => this.handleClose(true)}
          />
        </div>
      );
    }

    return (
      <Dialog
        // fullScreen will be true on a small screen
        fullScreen={fullScreen}
        open={open}
        onClose={() => this.handleClose(false)}
        aria-labelledby="form-dialog-title"
      >
        {/* We use a form element so that we can submit the form on enter */}
        <form onSubmit={this.handleSave}>
          <DialogContent>
            <Component component={component} formTag={false} mode={mode} />
          </DialogContent>
          {buttons ? <DialogActions>{buttons}</DialogActions> : ''}
        </form>
      </Dialog>
    );
  }
}

FormDialog = withMobileDialog()(FormDialog);
FormDialog = attach(['err', 'dirty', 'value', 'mode', 'disableSubmit'])(
  FormDialog
);
export default FormDialog;
