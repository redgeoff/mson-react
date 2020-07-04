// NOTE: this file should only contain the component registrations

import ButtonField from './fields/button-field';
import BooleanField from './fields/boolean-field';
import Card from './card';
import ComponentField from './fields/component-field';
import CompositeField from './fields/composite-field';
import DateField from './fields/date-field';
import Field from './fields/field';
import Form from './form';
import FormField from './fields/form-field';
import Fragment from './fragment';
import Grid from './grid';
import GridItem from './grid-item';
import CollectionField from './fields/collection-field';
import ListField from './fields/list-field';
import ReCAPTCHAField from './fields/re-captcha-field';
import SelectField from './fields/select-field';
import Tabs from './tabs';
import TimeField from './fields/time-field';
import Text from './text';
import TextField from './fields/text-field';
import URLField from './fields/url-field';

export default {
  ButtonField,
  BooleanField,
  Card,
  ChainedSelectField: CompositeField,
  ChainedSelectListField: ListField,
  ComponentField,
  CompositeField,
  DateField,
  Field,
  Form,
  FormField,
  Fragment,
  Grid,
  GridItem,
  CollectionField,
  IdField: TextField,
  IntegerField: TextField,
  ListField,
  MoneyField: TextField,
  NumberField: TextField,
  PhoneField: TextField,
  ReCAPTCHAField,
  SelectField,
  SelectListField: ListField,
  Tabs,
  TimeField,
  Text,
  TextField,
  TextListField: ListField,
  URLField,
  User: Form,
};
