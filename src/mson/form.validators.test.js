import Form from './form';
import TextField from './fields/text-field';

const createForm = () => {
  return new Form({
    fields: [
      new TextField({ name: 'firstName', label: 'First Name', required: true }),
      new TextField({
        name: 'middleName',
        label: 'Middle Name',
        required: true
      }),
      new TextField({ name: 'lastName', label: 'Last Name', required: true })
    ],
    validators: [
      {
        selector: {
          firstName: {
            value: 'Jim'
          }
        },
        error: {
          field: 'firstName',
          error: 'cannot be {{firstName.value}}'
        }
      },
      {
        selector: {
          lastName: {
            value: {
              $eq: 'Jones'
            }
          }
        },
        error: {
          field: 'lastName',
          error: 'cannot be Jones'
        }
      },
      {
        selector: {
          middleName: {
            value: {
              $eq: '{{firstName.value}}'
            }
          }
        },
        error: {
          field: 'middleName',
          error: 'cannot be same as {{firstName.value}}'
        }
      }
    ]
  });
};

it('should validate', () => {
  const form = createForm();

  form.setValues({
    firstName: 'Jim',
    middleName: 'Slim',
    lastName: 'Jones'
  });
  form.validate();
  expect(form.getErrs()).toEqual([
    {
      field: 'firstName',
      error: 'cannot be Jim'
    }
  ]);

  form.setValues({
    firstName: 'Jimmy',
    middleName: 'Slim',
    lastName: 'Jones'
  });
  form.validate();
  expect(form.getErrs()).toEqual([
    {
      field: 'lastName',
      error: 'cannot be Jones'
    }
  ]);

  form.setValues({
    firstName: 'Jimmy',
    middleName: 'Jimmy',
    lastName: 'Joneson'
  });
  form.validate();
  expect(form.getErrs()).toEqual([
    {
      field: 'middleName',
      error: 'cannot be same as Jimmy'
    }
  ]);
});

it('validate should adjust when fields removed', async () => {
  const form1 = createForm();
  form1.removeField('middleName');
  form1.setValues({
    firstName: 'First',
    lastName: 'Last'
  });
  form1.validate();
  expect(form1.getErrs()).toEqual([]);

  const form2 = createForm();
  form2.removeField('firstName');
  form2.setValues({
    middleName: 'Middle',
    lastName: 'Last'
  });
  form2.validate();
  expect(form2.getErrs()).toEqual([]);
});
