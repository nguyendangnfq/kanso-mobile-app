import { secondInstance } from '../api';

export const projectApi = {
  createProject: (params: any) => {
    return secondInstance
      .post('/project/create_a_project', params)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.log(error);
      });
  },
};
