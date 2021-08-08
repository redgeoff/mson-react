import Form from 'mson/lib/form';
import { TextField, EmailField, ButtonField } from 'mson/lib/fields';
import compiler from 'mson/lib/compiler';
import globals from 'mson/lib/globals';

// Note: you can also use the following instead of the import above
// const Form = compiler.getCompiledComponent('Form');

class ContactNoMSON extends Form {
  create(props) {
    super.create(props);

    this.set({
      fields: [
        new TextField({
          name: 'firstName',
          label: 'First Name',
          required: true,
          block: false,
        }),
        new TextField({ name: 'lastName', label: 'Last Name', required: true }),
        new EmailField({ name: 'email', label: 'Email' }),
        new ButtonField({
          name: 'import',
          label: 'Import',
          icon: 'ImportContacts',
        }),
        new ButtonField({
          name: 'submit',
          label: 'Submit',
          type: 'submit',
          icon: 'Save',
        }),
        new ButtonField({ name: 'cancel', label: 'Cancel', icon: 'Cancel' }),
      ],
    });

    this.on('import', () => {
      this.setValues({
        firstName: 'Prince',
        lastName: 'Nelson',
        email: 'prince@example.com',
      });
    });

    this.on('submit', () => {
      // TODO: do something like contact an API

      const values = this.getValues();
      console.log('submitting', values);

      globals.displaySnackbar(
        `Submitted ${values.firstName} ${values.lastName}`
      );

      // Clear the values, in case we return to the Contact form later
      this.reset();
    });

    this.on('cancel', () => {
      // Redirect home
      globals.redirect('/');
    });
  }
}

compiler.registerComponent('app.ContactNoMSON', ContactNoMSON);
