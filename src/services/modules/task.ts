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
};
