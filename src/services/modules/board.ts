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
};
