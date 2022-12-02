import { secondInstance } from '../api';

export const taskApi = {
  fetch: (params: any) => {
    return secondInstance
      .post('/Tasks/ListTasks/kaban', params)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.log(error);
      });
  },

  autoChangeColumn: (params: any) => {
    return secondInstance
      .post('/Tasks/changeColumnTask', {
        ...params,
      })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.log(error);
      });
  },

  createTask: (params: any) => {
    return secondInstance
      .post('/Tasks/create_a_new_task/', params)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.log(error);
      });
  },

  editTask: (params: any) => {
    return secondInstance
      .post('/Tasks/editTask', {
        ...params,
      })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.log(error);
      });
  },

  deleteTask: (params: any) => {
    return secondInstance
      .post('/Tasks/deleteTask', params)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.log(error);
      });
  },
};
