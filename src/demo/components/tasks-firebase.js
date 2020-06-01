export default {
  name: 'app.TasksFirebase',
  component: 'app.Tasks',
  store: {
    component: 'FirebaseStore',
    apiKey: 'AIzaSyCJfqjdBBrXtwkXla6uMX3LZGOLDAgTEx0',
    authDomain: 'mson-contacts.firebaseapp.com',
    projectId: 'mson-contacts',
    collection: 'tasks',
  },
};
