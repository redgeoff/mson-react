import React, { useEffect, useState } from 'react';
import Button from './button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import DialogContent from '@material-ui/core/DialogContent';
import Component from './component';
import useComponent from './use-component';
import CollectionFieldCore from 'mson/lib/fields/collection-field';
import usePrevious from './use-previous';

const { CREATE, UPDATE, DELETE, RESTORE } = CollectionFieldCore.MODES;

function EditButtons(props) {
  const { disableSave, onCancel } = props;

  // We use type=submit so that the form is submitted when the user presses enter
  return (
    <div>
      <Button type="submit" label="Save" icon="Save" disabled={disableSave} />
      <Button label="Cancel" icon="Cancel" onClick={onCancel} />
    </div>
  );
}

function ViewButtons(props) {
  const { forbidUpdate, forbidDelete, onEdit, onDelete, onCancel, value } =
    props;

  return (
    <div>
      {forbidUpdate ? null : (
        <Button label="Edit" icon="Edit" onClick={onEdit} />
      )}
      {forbidDelete ? null : (
        <Button
          label={value && value.archivedAt ? 'Restore' : 'Delete'}
          icon={value && value.archivedAt ? 'Restore' : 'Delete'}
          onClick={onDelete}
        />
      )}
      <Button label="Close" icon="Cancel" onClick={onCancel} />
    </div>
  );
}

function Buttons(props) {
  const {
    disableSave,
    onCancel,
    forbidUpdate,
    forbidDelete,
    onEdit,
    onDelete,
    value,
    previousMode,
    mode,
  } = props;

  let buttons = null;

  // Note: we analyze the previousMode so that the user isn't flashed with new buttons immediately
  // after they click save or close the dialog
  if (
    mode === UPDATE ||
    mode === CREATE ||
    (mode === null && (previousMode === UPDATE || previousMode === CREATE))
  ) {
    buttons = <EditButtons disableSave={disableSave} onCancel={onCancel} />;
  } else if (!forbidUpdate || !forbidDelete) {
    buttons = (
      <ViewButtons
        forbidUpdate={forbidUpdate}
        forbidDelete={forbidDelete}
        onEdit={onEdit}
        onDelete={onDelete}
        onCancel={onCancel}
        value={value}
      />
    );
  }

  return buttons && <DialogActions>{buttons}</DialogActions>;
}

function FormDialog(props) {
  const [saveClicked, setSaveClicked] = useState(false);
  const [previousMode, setPreviousMode] = useState(false);

  const {
    onClose,
    onCancel,
    currentForm,
    onEdit,
    onSave,
    onDelete,
    component,
    forbidUpdate,
    forbidDelete,
    mode,
  } = props;

  const { err, dirty, value, disableSubmit } = useComponent(component, [
    'err',
    'dirty',
    'value',
    'disableSubmit',
  ]);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const prevMode = usePrevious(mode);

  // If the mode or err changes then allow the user to click save
  useEffect(() => setSaveClicked(false), [mode, err]);

  useEffect(() => setPreviousMode(prevMode), [mode, prevMode]);

  function handleClose(withCancelButton) {
    // Prevent the user from losing data when pressing esc or clicking outside dialog
    if (withCancelButton || mode !== UPDATE) {
      if (mode === UPDATE) {
        if (onCancel) {
          onCancel(currentForm);
        }
      } else {
        if (onClose) {
          onClose(currentForm);
        }
      }
    }
  }

  function handleEdit() {
    if (onEdit) {
      onEdit(currentForm);
    }
  }

  function handleSave(event) {
    // Stop the form from refreshing the page
    event.preventDefault();

    // Should the submit action be disabled? For example, we may be editing in a nested dialog
    if (!disableSubmit) {
      if (onSave) {
        onSave();
      }

      // Disable the save button so that the user sees that something is being processed
      setSaveClicked(true);
    }
  }

  function handleDelete() {
    if (onDelete) {
      onDelete(currentForm);
    }
  }

  function isOpen() {
    // Don't show the dialog when restoring
    return mode === DELETE || mode === RESTORE ? false : !!mode;
  }

  const disableSave =
    component.hasErrorForTouchedField() || !dirty || saveClicked;

  const open = isOpen();

  return (
    <Dialog
      // fullScreen will be true on a small screen
      fullScreen={fullScreen}
      open={open}
      onClose={() => handleClose(false)}
      aria-labelledby="form-dialog-title"
    >
      {/* We use a form element so that we can submit the form on enter */}
      <form onSubmit={handleSave}>
        <DialogContent>
          <Component component={component} formTag={false} mode={mode} />
        </DialogContent>

        <Buttons
          disableSave={disableSave}
          onCancel={() => handleClose(true)}
          forbidUpdate={forbidUpdate}
          forbidDelete={forbidDelete}
          onEdit={handleEdit}
          onDelete={handleDelete}
          value={value}
          previousMode={previousMode}
          mode={mode}
        />
      </form>
    </Dialog>
  );
}

export default FormDialog;
