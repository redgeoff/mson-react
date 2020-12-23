const tasksLocalStorage = {
  name: 'app.TasksLocalStorage',
  component: 'app.Tasks',
  store: {
    component: 'LocalStorageStore',
    storeName: 'tasksLocalStorage',
  },
};

export default tasksLocalStorage;
