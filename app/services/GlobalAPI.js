import axios from 'axios';
axios.defaults.timeout = 30000;
const API = {
  requestPOST: async (urlService, tokenBearer, data) => {
    return await axios
      .post(urlService, data, {
        headers: { Authorization: 'Bearer ' + tokenBearer },
      })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
        return { data: null };
      });
  },

};

export default API;
