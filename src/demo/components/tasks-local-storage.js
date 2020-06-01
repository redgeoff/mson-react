export default {
  name: 'app.TasksLocalStorage',
  component: 'app.Tasks',
  store: {
    component: 'LocalStorageStore',
    storeName: 'tasksLocalStorage',
  },
};
