import { secondInstance } from '../api';

export const userApi = {
  login: (params: any) => {
    const url = '/login';
    return secondInstance
      .post(url, params)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.log(error);
      });
  },

  register: (params: any) => {
    const url = '/register';
    return secondInstance
      .post(url, params)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.log(error);
      });
  },

  userInfo: async (params: any) => {
    const url = '/user';
    return await secondInstance
      .post(url, {
        owner: params,
      })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.log(error);
      });
  },

  editUser: (params: any) => {
    return secondInstance
      .post('/user/editUserInfo', {
        owner: params.owner,
        display_name: params.display_name,
        bio: params.bio,
        company: params.company,
        location: params.location,
        email: params.email,
      })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.log(error);
      });
  },

  checkRole: async (params: any) => {
    const url = '/user/checkRoleUserInProject';
    return secondInstance
      .post(url, {
        id: params.id,
        idProject: params.idProject,
      })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.log(error);
      });
  },
};
