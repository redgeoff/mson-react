import React, { useEffect, useRef, useState } from 'react';
import Button from './button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import DialogContent from '@material-ui/core/DialogContent';
import Component from './component';
import useComponent from './use-component';
import CollectionFieldCore from 'mson/lib/fields/collection-field';

// TODO: move to shared space
// Credit: https://usehooks.com/usePrevious/
function usePrevious(value) {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef();

  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes

  // Return previous value (happens before update in useEffect above)
  return ref.current;
}

const { CREATE, UPDATE, DELETE, RESTORE } = CollectionFieldCore.MODES;

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

  useEffect(() => {
    // If the mode or err changes then allow the user to click save
    setSaveClicked(false);
  }, [mode, err]);

  useEffect(() => {
    setPreviousMode(prevMode);
  }, [mode, prevMode]);

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
    if (mode === DELETE || mode === RESTORE) {
      // Don't show the dialog when restoring
      return false;
    } else {
      return !!mode;
    }
  }

  const disableSave =
    component.hasErrorForTouchedField() || !dirty || saveClicked;

  const open = isOpen();

  let buttons = null;

  // Note: we analyze the previousMode so that the user isn't flashed with new buttons immediately
  // after they click save or close the dialog
  if (
    mode === UPDATE ||
    mode === CREATE ||
    (mode === null && (previousMode === UPDATE || previousMode === CREATE))
  ) {
    buttons = (
      <div>
        {/* We use type=submit so that the form is submitted when the user presses enter */}
        <Button type="submit" label="Save" icon="Save" disabled={disableSave} />
        <Button
          label="Cancel"
          icon="Cancel"
          onClick={() => handleClose(true)}
        />
      </div>
    );
  } else if (!forbidUpdate || !forbidDelete) {
    buttons = (
      <div>
        {forbidUpdate ? (
          ''
        ) : (
          <Button label="Edit" icon="Edit" onClick={handleEdit} />
        )}
        {forbidDelete ? (
          ''
        ) : (
          <Button
            label={value && value.archivedAt ? 'Restore' : 'Delete'}
            icon={value && value.archivedAt ? 'Restore' : 'Delete'}
            onClick={handleDelete}
          />
        )}
        <Button label="Close" icon="Cancel" onClick={() => handleClose(true)} />
      </div>
    );
  }

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
        {buttons ? <DialogActions>{buttons}</DialogActions> : ''}
      </form>
    </Dialog>
  );
}

export default FormDialog;
