import { secondInstance } from '../api';

export const boardApi = {
  fetchAllBoard: (params: any) => {
    return secondInstance
      .post('/Job/ListJobs', params)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.log(error);
      });
  },
  deleteBoard: (params: any) => {
    return secondInstance
      .post('/Job/deleteJob', params)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.log(error);
      });
  },
  createBoard: (params: any) => {
    return secondInstance
      .post('Job/create_a_Job', params)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.log(error);
      });
  },

  editBoard: (params: any) => {
    console.log(params);
    return secondInstance
      .post('/Job/edit_Job', params)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.log(error);
      });
  },
};
