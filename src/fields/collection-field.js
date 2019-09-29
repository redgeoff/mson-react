import React from 'react';
import Grid from '@material-ui/core/Grid';
import FormCard from '../form-card';
import FormDialog from '../form-dialog';
import attach from '../attach';
import Button from '../button';
import Typography from '@material-ui/core/Typography';
import ConfirmationDialog from '../confirmation-dialog';
import access from 'mson/lib/access';
import withStyles from '@material-ui/core/styles/withStyles';
import './collection-field.css';
import SelectOrder from './select-order';
import ButtonField from 'mson/lib/fields/button-field';
import Icon from '../icon';
import CommonField from './common-field';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import CollectionFieldCore from 'mson/lib/fields/collection-field';

const getItemStyle = (isDragging, draggableStyle, theme) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: theme.spacing(0.125),
  margin: `0 0 ${theme.spacing(0.125)}px 0`,

  // change background colour if dragging
  background: isDragging ? theme.palette.secondary[400] : undefined,

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = (isDraggingOver, theme) => ({
  background: isDraggingOver ? theme.palette.grey[300] : undefined,
  width: '100%'
});

// Note:
//   - We use a dialog to view/edit the forms as we want to be able to display just a few pieces
//     of data in the list and all the data when viewing/editing.

const styles = theme => ({
  root: {
    // Needed when field is nested in a form that is nested in a form, e.g. FormEditor
    width: '100%'
  },
  spacer: {
    backgroundColor: theme.palette.grey[300],
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    animation: 'fadeIn 1s infinite alternate'
  },
  footer: {
    // Create space at the footer so that it is more evident to the user that the next page has been
    // loaded
    height: 50,
    backgroundColor: theme.palette.grey[300],
    margin: theme.spacing(1),
    animation: 'fadeIn 1s infinite alternate'
  }
});

class CollectionField extends React.PureComponent {
  state = {
    confirmationOpen: false,
    sortBy: '',
    sortOrder: 'ASC'
  };

  handleClose = () => {
    this.props.component.set({ mode: null });
  };

  handleCancel = form => {
    const { component, preventReadAction } = this.props;
    if (component.get('skipRead') || preventReadAction) {
      component.set({ mode: null });
    } else {
      component.set({
        currentForm: form,
        mode: CollectionFieldCore.MODES.READ
      });
    }
  };

  handleClick = form => {
    const { component } = this.props;
    if (component.get('skipRead')) {
      component.set({
        currentForm: form,
        mode: CollectionFieldCore.MODES.UPDATE
      });
    } else {
      component.set({
        currentForm: form,
        mode: CollectionFieldCore.MODES.READ
      });
    }
  };

  handleEdit = form => {
    this.props.component.set({
      currentForm: form,
      mode: CollectionFieldCore.MODES.UPDATE
    });
  };

  handleNew = () => {
    this.props.component.set({
      currentForm: null,
      mode: CollectionFieldCore.MODES.CREATE
    });
  };

  handleSave = async () => {
    await this.props.component.save();
  };

  isOpen() {
    return !!this.props.mode;
  }

  handleDelete = async formToDelete => {
    const { component, preventDeleteAction } = this.props;

    const open = this.isOpen();
    if (formToDelete) {
      component.set({
        currentForm: formToDelete,
        mode: CollectionFieldCore.MODES.DELETE
      });
    } else {
      // Are we already focussed on this form
      formToDelete = component.get('form');
    }

    const archivedAt = formToDelete.getValue('archivedAt');

    // Are we restoring?
    if (archivedAt) {
      await component.restore(formToDelete);

      // Is the dialog open?
      if (open) {
        // Close it
        component.set({ mode: null });
      }
    } else {
      if (!preventDeleteAction) {
        this.setState({
          confirmationOpen: true,
          // confirmationTitle: `Are you sure you want to delete this ${singularLabel}?`
          confirmationTitle: 'Delete this?'
        });
      }
      component.set({ mode: null });
    }
  };

  handleConfirmationClose = async yes => {
    if (yes) {
      const { component } = this.props;
      await component.archive(component.get('form'));
    }
    this.setState({ confirmationOpen: false });
  };

  canCreate() {
    return access.canCreate(this.props.component.get('form'));
  }

  canUpdate() {
    return access.canUpdate(this.props.component.get('form'));
  }

  canArchive() {
    return access.canArchive(this.props.component.get('form'));
  }

  componentDidUpdate(prevProps) {
    if (this.props.bufferTopId !== prevProps.bufferTopId) {
      // Resize the spacer now that the newly prepended items have been rendered
      this.props.component._infiniteLoader.resizeSpacer(this.props.bufferTopId);
    }

    if (this.props.spacerHeight !== prevProps.spacerHeight) {
      this.props.component._infiniteLoader.setSpacerResizing(false);
    }

    if (this.props.change !== prevProps.change) {
      this.props.component.set({ isLoading: false });
    }
  }

  canDrag() {
    const { forbidOrder, showArchived, searchString, order } = this.props;

    // Can we order by dragging?
    return !forbidOrder && !showArchived && !searchString && !order;
  }

  cards(canUpdate, canArchive) {
    const {
      component,
      forbidUpdate,
      forbidDelete,
      forbidOrder,
      editable,
      disabled,
      useDisplayValue,
      theme
    } = this.props;

    // Force to 1 colum when ordering allowed
    const maxColumns = forbidOrder === false ? 1 : this.props.maxColumns;

    const maxGrids = 12 / maxColumns;

    let cards = [];

    let index = 0;
    for (const form of component.getForms()) {
      // TODO: Rendering should not change form. Use utils.getIfDefined() in form to allow passing
      // in of editable via React layer
      form.setEditable(false);

      // We need to use the id for the key as we use the same list of cards when toggling
      // showArchive
      const key = form.getUniqueId();

      // Note: we use an id instead of ref so that more of our logic can be reused across different
      // frameworks. We use the form id so that we have a consistent way of referencing the element
      // for things like infinite loading.
      const id = component.getUniqueItemId(form.getValue('id'));

      const item = (
        <Grid item xs={12} sm={maxGrids} lg={maxGrids} key={key} id={id}>
          <FormCard
            onClick={() => this.handleClick(form)}
            onEdit={() => this.handleEdit(form)}
            onDelete={this.handleDelete}
            component={form}
            forbidUpdate={forbidUpdate || !canUpdate || useDisplayValue}
            forbidDelete={forbidDelete || !canArchive || useDisplayValue}
            editable={editable}
            disabled={disabled}
          />
        </Grid>
      );

      if (this.canDrag()) {
        cards.push(
          <Draggable key={id} draggableId={id} index={index++}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={getItemStyle(
                  snapshot.isDragging,
                  provided.draggableProps.style,
                  theme
                )}
              >
                {item}
              </div>
            )}
          </Draggable>
        );
      } else {
        cards.push(item);
      }
    }

    return cards;
  }

  handleOrdering = props => {
    // TODO: shouldn't the ordering just be in the field and not have to be in this state?
    this.setState(props, () => {
      this.props.component.set({
        order: this.state.sortBy
          ? [[this.state.sortBy, this.state.sortOrder]]
          : null
      });
    });
  };

  sortOptions() {
    const { component } = this.props;
    if (component && component.get('form')) {
      const form = component.get('form');
      const fieldsCanAccess = access.fieldsCanAccess('read', form);
      const fields = [];
      form.eachField(field => {
        const name = field.get('name');

        // Do we have access to the field? Allowed to sort? Not hidden? Not a button?
        if (
          fieldsCanAccess[name] !== undefined &&
          !field.get('forbidSort') &&
          !field.get('hidden') &&
          !(field instanceof ButtonField)
        ) {
          fields.push({
            value: (form.isDefaultField(name) ? '' : 'fieldValues.') + name,
            label: field.get('label')
          });
        }
      });
      return fields;
    }
  }

  header(numCards) {
    const {
      forbidCreate,
      editable,
      disabled,
      component,
      forbidSort,
      store,
      useDisplayValue
    } = this.props;

    const { sortBy, sortOrder } = this.state;

    const singularLabel = component.getSingularLabel();

    const reachedMax = component.reachedMax();

    const canCreate = this.canCreate();

    const showNewButton =
      editable &&
      !disabled &&
      !useDisplayValue &&
      !forbidCreate &&
      !reachedMax &&
      canCreate;

    const canOrder = !forbidSort;

    const sortOptions = this.sortOptions();

    // Sorting only works when there is a backing store
    const hasStore = !!store;
    const showOrder = numCards > 0 && hasStore;

    return (
      <Grid container spacing={0}>
        <Grid item xs={12} sm={6} lg={6}>
          {showNewButton ? (
            <Button
              aria-label="new"
              onClick={this.handleNew}
              icon="Add"
              label={'New ' + singularLabel}
              marginTop={false}
            />
          ) : null}
        </Grid>
        <Grid item xs={12} sm={6} lg={6} align="right">
          {showOrder && canOrder ? (
            <SelectOrder
              onChange={this.handleOrdering}
              sortBy={sortBy}
              sortOrder={sortOrder}
              options={sortOptions}
            />
          ) : null}
        </Grid>
      </Grid>
    );
  }

  onDragEnd = result => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    if (result.destination.index !== result.source.index) {
      this.props.component.moveAndSaveForm({
        sourceIndex: result.source.index,
        destinationIndex: result.destination.index
      });
    }
  };

  // TODO: how to prevent re-rendering of all form-cards when dialog open state is changed? Or, does
  // it not really matter as we are using PureComponents?
  field() {
    const {
      forbidUpdate,
      forbidDelete,
      component,
      spacerHeight,
      classes,
      isLoading,
      form,
      currentForm,
      noResults,
      disabled,
      accessEditable,
      useDisplayValue,
      theme,
      preventUpdate,
      preventDeleteAction
    } = this.props;

    const dis = accessEditable === false || disabled;

    const { confirmationOpen, confirmationTitle } = this.state;

    const label = component.get('label').toLowerCase();

    const canUpdate = this.canUpdate();
    const canArchive = this.canArchive();

    const spacerStyle = { height: spacerHeight };

    const spacerId = component.get('spacerId');

    let cards = this.cards(canUpdate, canArchive);

    let cardContainer = cards;

    if (this.canDrag()) {
      cardContainer = (
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver, theme)}
              >
                {cards}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      );
    }

    const searchString = component.get('searchString');

    // Is the user searching and there are no records?
    const showNoRecords = searchString && noResults;

    const header = this.header(cards.length);

    return (
      <div>
        {header}

        {showNoRecords ? (
          <Typography variant="h4">
            <Icon icon="Info" /> No {label} found
          </Typography>
        ) : null}

        <div id={spacerId} className={classes.spacer} style={spacerStyle} />

        <Grid container spacing={0}>
          {cardContainer}
        </Grid>

        {isLoading ? <div className={classes.footer} /> : null}

        {/* TODO: would it be better to have a single, global FormDialog instance? Or, is it better
        to have multiple instances so that you can have different memory spaces. Currenly we have a
        hybrid where we have a dialog per form. There is almost certainly more overhead in having an
        instance per record, right? */}
        <FormDialog
          component={form}
          currentForm={currentForm}
          onClose={this.handleClose}
          onCancel={this.handleCancel}
          onSave={this.handleSave}
          onEdit={this.handleEdit}
          onDelete={this.handleDelete}
          forbidUpdate={
            forbidUpdate ||
            !canUpdate ||
            dis ||
            useDisplayValue ||
            preventUpdate
          }
          forbidDelete={
            forbidDelete ||
            !canArchive ||
            dis ||
            useDisplayValue ||
            preventDeleteAction
          }
        />

        <ConfirmationDialog
          open={confirmationOpen}
          onClose={this.handleConfirmationClose}
          title={confirmationTitle}
        />
      </div>
    );
  }

  render() {
    const { component, hideLabel, classes } = this.props;

    const isBlank = component.isBlank();

    return (
      <span className={classes.root}>
        {!hideLabel && (
          <CommonField
            component={component}
            inlineLabel="true"
            shrinkLabel={!isBlank}
          />
        )}
        {this.field()}
      </span>
    );
  }
}

CollectionField = withStyles(styles, { withTheme: true })(CollectionField);
CollectionField = attach([
  'change',
  'label',
  'singularLabel',
  'forbidCreate',
  'forbidUpdate',
  'forbidDelete',
  'forbidSort',
  'forbidOrder',
  'editable',
  'disabled',
  'spacerHeight',
  'bufferTopId',
  'isLoading',
  'form',
  'currentForm',
  'mode',
  'noResults',
  'store',
  'maxColumns',
  'useDisplayValue',
  'hideLabel',
  'showArchived',
  'searchString',
  'order',
  'preventReadAction',
  'preventUpdate',
  'preventDeleteAction'
])(CollectionField);
export default CollectionField;
