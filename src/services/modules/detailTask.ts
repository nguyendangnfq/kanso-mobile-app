import { secondInstance } from '../api';

export const detailTaskApi = {
  fetchDetailTask: (params: any) => {
    return secondInstance
      .post('/Tasks/listAllDetailTask', params)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.log(error);
      });
  },

  createDetailTask: (params: any) => {
    return secondInstance
      .post('Tasks/createNewDetailTask', {
        taskOwner: params.idTask,
        title: params.title,
        idProjectOwner: params.idProjectOwner,
      })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.log(error);
      });
  },

  editDetailTask: (params: any) => {
    return secondInstance
      .post('/Tasks/editDetailTask', {
        idDetailTask: params.idDetailTask,
        name: params.name,
      })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.log(error);
      });
  },

  deleteDetailTask: (params: any) => {
    return secondInstance
      .post('/Tasks/deleteDetailTask', {
        ...params,
      })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.log(error);
      });
  },

  changeCompletedDetailTask: (params: any) => {
    return secondInstance
      .post('/Tasks/completeAndUncompleteDetailTask', {
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
