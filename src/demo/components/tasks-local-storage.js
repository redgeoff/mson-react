const tasksLocalStorage = {
  name: 'app.TasksLocalStorage',
  component: 'app.Tasks',
  // store: {
  //   component: 'LocalStorageStore',
  //   storeName: 'tasksLocalStorage',
  // },
  store: {
    component: 'MemoryStore',
  },
};

export default tasksLocalStorage;
