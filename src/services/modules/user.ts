import { secondInstance } from '../api';

export const userApi = {
  login: (params: any) => {
    const url = '/login/';
    return secondInstance
      .post(url, params)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.log(error);
      });
  },

  //   register: (params: any) => {
  //     const url = '/register/';
  //   },
};
