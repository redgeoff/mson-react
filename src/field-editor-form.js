import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Form from './form';
import withStyles from '@mui/styles/withStyles';
import Field from './fields/field';
import compiler from 'mson/lib/compiler';
import each from 'lodash/each';
import attach from './attach';
import ComponentField from 'mson/lib/fields/component-field';

const styles = (theme) => ({
  form: {
    overflowY: 'scroll',
    maxHeight: 'calc(100vh - 390px)',
    marginTop: theme.spacing(3),
  },
});

class FieldEditorForm extends React.PureComponent {
  state = {
    field: null,
  };

  handleValueChange = (value) => {
    const form = this.props.component;
    let { field } = this.state;
    let component = null;

    // Is the field changing?
    if (!field || value.componentName !== field.getClassName()) {
      if (field) {
        // Prevent listener leak
        field.destroy();
      }

      if (value.componentName) {
        component = compiler.newComponent({
          component: value.componentName,
        });

        // Is the component a field?
        if (component.isField) {
          field = component;
        } else {
          // e.g. Text component is not a field
          field = new ComponentField({ content: component });
        }

        // Auto validate so that the user can preview how the validation will work
        const validate = () => {
          field.clearErr();
          field.validate();
        };
        field.on('value', validate);
        field.on('touched', validate);
      } else {
        field = null;
      }
    }

    if (field) {
      // Set field values using form values. The corresponding values may not exist if the field was
      // just changed.
      const values = form.getValues({ default: false });
      component =
        field.getClassName() === 'ComponentField'
          ? field.get('content')
          : field;
      each(values, (value, name) => {
        if (component.has(name)) {
          component.set({ [name]: value });
        }
      });
    }

    this.setState({ field });
  };

  componentDidMount() {
    // Note: we use a listener on value instead of attaching to value as a shallow compare of value
    // would not trigger a state change.
    this.props.component.on('value', this.handleValueChange);

    // Initialize with the current value
    this.handleValueChange(this.props.component.getValues());
  }

  componentWillUnmount() {
    this.props.component.removeListener('value', this.handleValueChange);
  }

  render() {
    const { component, classes, formTag, mode } = this.props;
    const { field } = this.state;

    let preview = null;
    if (field && mode !== 'read') {
      preview = (
        <Card className={classes.card}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Preview
            </Typography>
            <Field component={field} />
          </CardContent>
        </Card>
      );
    }

    if (mode !== 'read') {
      return (
        <React.Fragment>
          <div className={classes.preview}>{preview}</div>
          <div className={classes.form}>
            <Form component={component} formTag={formTag} mode={mode} />
          </div>
        </React.Fragment>
      );
    } else if (field) {
      // Disable so that the user can edit the field with a click
      return <Field component={field} disabled={true} />;
    } else {
      return null;
    }
  }
}

FieldEditorForm = withStyles(styles)(FieldEditorForm);
FieldEditorForm = attach(['mode'])(FieldEditorForm);

export default FieldEditorForm;
