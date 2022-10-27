import axios from 'axios';
import {Linking, Platform} from 'react-native';
const KEY_IOS = 'AIzaSyBnDOlN0danLY29uSdhuu2MfbpE4ieH4xQ';
const KEY_ANDROID = 'AIzaSyBnDOlN0danLY29uSdhuu2MfbpE4ieH4xQ';
const key = Platform.OS === 'ios' ? KEY_IOS : KEY_ANDROID;
const address = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${key}`;

export const serviceGetway = 'https://api.hanhchinhcong.net';
export const tokenGetway = '3bcd9fb7-2e0e-3adb-8ba9-ecab0e37916f';
export const pathGetway = 'covidnew';
export const tokenOpdt = '42e85059-aed1-331c-9249-27e64a7d23fa';
export const TTHD_URL = 'https://tintuchaiduongapi.hanhchinhcong.net/api';
export const TTHD_FILE = 'http://haiduong.gov.vn';

const demoToken =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MjkxODgwNDEsImV4cCI6MTcyMzg4MjQ0MSwic3ViIjoiY2hvdDEiLCJoYXNocHdkIjoiVTZUNUlkeUkvMjRrQkV2a0svcW4vUT09IiwiY29udGV4dCI6eyJ1c2VyIjp7InVzZXJOYW1lIjoiY2hvdDEiLCJkaXNwbGF5TmFtZSI6ImNob3QxIn19fQ.pa9hVLuqbQdB8OdhbsHu7Z7YyASSEloT6FJT5DmBuW0';
const id_ekyc = 'd65f5ac3-2e41-0dbe-e053-62199f0a5289';
const key_ekyc =
  'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAMOhvZZgryuiSTgf8WI1GP62M22NcEjhUN8X5tdGU02oovals31k4JYylwBY9WTrpNb/ylAJwX3r6QZl4EfntgsCAwEAAQ==';
const token_ekyc =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4ODQ4MTAwZi03ZDgxLTExZWMtOWE2MS03YjY1MmY2MTgwYTkiLCJhdWQiOlsicmVzdHNlcnZpY2UiXSwidXNlcl9uYW1lIjoidHVuZ2xhbW5ndXllbjkxQGdtYWlsLmNvbSIsInNjb3BlIjpbInJlYWQiXSwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3QiLCJuYW1lIjoidHVuZ2xhbW5ndXllbjkxQGdtYWlsLmNvbSIsInV1aWRfYWNjb3VudCI6Ijg4NDgxMDBmLTdkODEtMTFlYy05YTYxLTdiNjUyZjYxODBhOSIsImF1dGhvcml0aWVzIjpbIlVTRVIiXSwianRpIjoiZDViOTc4NDAtYjQyYi00NTA3LWJmNzQtZjY1MTAwMjExYjI4IiwiY2xpZW50X2lkIjoiYWRtaW5hcHAifQ.31x80dx6e7rXSyiRRPdGxcUUEGUFx840aBlTAnOeLcMAiLDcLizWVud_Li6twUvBWW_tFCZm83eKv7WpJkQ7DHeTBCn4JdOiI2GAWsTauqK_eY32p9aADGqu35XXaJghj-nQ7dnchz6TIX-JAbpFPOdnWR-TwEmaTZSsfY5hssvksFgbaaQXMB2JnirhDSrFaQVtLrm31QpQkMp7azLVRF_OOuy-FppjqZke62KiLWmhogzcfu2oDfAo5iLNUkjKdHCgjiINC77vPz9lxg8rC4CmOGoSGzD-MmMToA-93QNBTYOcsategA1KHHwWzdSZfg0chAHFb5SWezyoPU4x1A';
export const requestGET = async (URL) => {
  return await axios({
    method: 'GET',
    url: URL,
    timeout: 60000,
  })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return {data: []};
    });
};

export const requestPOST = async (URL, data) => {
  return await axios({
    method: 'POST',
    url: URL,
    data: data,
    timeout: 60000,
  })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return null;
    });
};

export const requestPATCH = async (URL, data) => {
  return await axios({
    method: 'PATCH',
    url: URL,
    data: data,
    timeout: 15000,
  })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      return {data: []};
    });
};

export const requestPOST_CC = async (URL, data, token) => {
  return await axios({
    method: 'POST',
    headers: {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'},
    url: URL,
    data: data,
    timeout: 15000,
  })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      return {data: []};
    });
};

export const requestPOSTWSO2 = async (URL, data) => {
  return await axios({
    method: 'POST',
    headers: {Authorization: 'Bearer 76faf6a5-b128-3a1e-b56b-4dc290239587', 'Content-Type': 'application/json'},
    url: URL,
    data: data,
    timeout: 15000,
  })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return {data: []};
    });
};

export const requestGET_AIC = async (URL) => {
  return await axios({
    method: 'GET',
    url: URL,
    timeout: 15000,
    headers: {
      CLIENTAPIKEY: 'e9b2a8e1-572f-4400-acc0-31e21357eb46',
    },
  })
    .then(function (response) {
      return response.data ? response.data.results : {data: []};
    })
    .catch(function (error) {
      return {data: []};
    });
};

export const requestPOST_AIC = async (URL, data) => {
  return await axios({
    method: 'POST',
    url: URL,
    data: data,
    timeout: 15000,
    headers: {
      CLIENTAPIKEY: 'e9b2a8e1-572f-4400-acc0-31e21357eb46',
    },
  })
    .then(function (response) {
      return response.data ? response.data.results : {data: []};
    })
    .catch(function (error) {
      return {data: []};
    });
};

export const requestGET_AIC_NAMDINH = async (URL) => {
  return await axios({
    method: 'GET',
    url: URL,
    timeout: 15000,
    headers: {
      CLIENTAPIKEY: '5ce554c2-1332-481e-97c2-5856d9612433',
    },
  })
    .then(function (response) {
      return response.data ? response.data.results : {data: []};
    })
    .catch(function (error) {
      return {data: []};
    });
};

export const requestPOST_AIC_NAMDINH = async (URL, data) => {
  return await axios({
    method: 'POST',
    url: URL,
    data: data,
    timeout: 15000,
    headers: {
      CLIENTAPIKEY: '5ce554c2-1332-481e-97c2-5856d9612433',
    },
  })
    .then(function (response) {
      return response.data ? response.data.results : {data: []};
    })
    .catch(function (error) {
      return {data: []};
    });
};

export const requestPOST_NETVIEW = async (URL, data, token) => {
  return await axios({
    method: 'POST',
    url: URL,
    data: data,
    timeout: 15000,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(function (response) {
      return response.data ? response.data : {data: null};
    })
    .catch(function (error) {
      return {data: null};
    });
};

export const getDirections = (oLat, oLong, dLat, dLong) => {
  var url = `https://www.google.com/maps/dir/?api=1&origin=${oLat},${oLong}&destination=${dLat},${dLong}`;
  Linking.canOpenURL(url)
    .then((supported) => {
      if (!supported) {
        console.log("Can't handle url: " + url);
      } else {
        console.log(url);
        return Linking.openURL(url);
      }
    })
    .catch((err) => console.error('An error occurred', err));
};

export const TextToSpeech = async (text) => {
  return await axios
    .post(address, {
      input: {
        text: text,
      },
      audioConfig: {
        audioEncoding: 'MP3',
      },
      voice: {
        languageCode: 'vi-VN',
        name: 'vi-VN-Standard-A',
        ssmlGender: 'FEMALE',
      },
    })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      return null;
    });
};
export const TextToSpeechLanguage = async (text, languageCode, voidName) => {
  return await axios
    .post(address, {
      input: {
        text: text,
      },
      audioConfig: {
        audioEncoding: 'MP3',
      },
      voice: {
        languageCode: languageCode,
        name: voidName,
        ssmlGender: 'FEMALE',
      },
    })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      return null;
    });
};

export const Register = async (URL, origin, data) => {
  try {
    const config = {
      method: 'post',
      url: URL,
      headers: {
        Origin: origin,
        'Content-Type': 'application/json',
      },
      data: data,
    };

    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.log('loi');
    console.log(error);
    return null;
  }
};
export const requestPOST_TK = async (URL, data, token) => {
  return await axios({
    method: 'POST',
    headers: {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'},
    url: URL,
    data: data,
    timeout: 15000,
  })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      return {data: []};
    });
};
export const requestPUT_TK = async (URL, data, token) => {
  return await axios({
    method: 'PUT',
    headers: {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'},
    url: URL,
    data: data,
    timeout: 15000,
  })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      return {data: []};
    });
};
export const requestGET_TK = async (URL, token) => {
  return await axios({
    method: 'GET',
    headers: {Authorization: `Bearer ${token}`},
    url: URL,
    timeout: 15000,
  })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      return {data: null};
    });
};
export const requestDELETE_TK = async (URL, token) => {
  return await axios({
    method: 'DELETE',
    headers: {Authorization: `Bearer ${token}`},
    url: URL,
    timeout: 15000,
  })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      return {data: []};
    });
};

export const requestPOST_COVID = async (URL, data, tkGetway, userToken) => {
  return await axios({
    method: 'POST',
    headers: {
      Authorization: `Bearer ${tkGetway}`,
      'Content-Type': 'application/json',
      userTokenKey: demoToken,
    },
    url: URL,
    data: data,
    timeout: 15000,
  })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      return {data: []};
    });
};
export const requestPUT_COVID = async (URL, data, tkGetway, userToken) => {
  return await axios({
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${tkGetway}`,
      'Content-Type': 'application/json',
      userTokenKey: demoToken,
    },
    url: URL,
    data: data,
    timeout: 15000,
  })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      return {data: []};
    });
};
export const requestGET_COVID = async (URL, tkGetway, userToken) => {
  return await axios({
    method: 'GET',
    headers: {
      Authorization: `Bearer ${tkGetway}`,
      userTokenKey: demoToken,
    },
    url: URL,
    timeout: 15000,
  })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      return {data: null};
    });
};
export const requestPOST_EKYC = async (URL, data) => {
  return await axios({
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token_ekyc}`,
      'Token-id': id_ekyc,
      'Token-key': key_ekyc,
      'mac-address': 'tsdmartcity',
    },
    url: `https://api.idg.vnpt.vn` + URL,
    data: data,
    timeout: 15000,
  })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return {data: []};
    });
};

export const requestPOST_CD = async (URL, data, token = null) => {
  try {
    const config = {
      method: 'POST',
      url: URL,
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            tenant: 'root',
          }
        : {
            'Content-Type': 'application/json',
            tenant: 'root',
          },
      data: data,
    };

    const response = await axios(config);

    return response;
  } catch (error) {
    return error?.response ?? null;
  }
};

export const requestPUT_CD = async (URL, data, token = null) => {
  try {
    const config = {
      method: 'PUT',
      url: URL,
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            tenant: 'root',
          }
        : {
            'Content-Type': 'application/json',
            tenant: 'root',
          },
      data: data,
    };

    const response = await axios(config);
    return response;
  } catch (error) {
    return error?.response ?? null;
  }
};

export const request_CD = async (URL, data = null, method = 'POST', token = null) => {
  try {
    const config = {
      method: method ? method : 'POST',
      url: URL,
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            tenant: 'root',
          }
        : {
            'Content-Type': 'application/json',
            tenant: 'root',
          },
      data: data,
    };
    const response = await axios(config);
    return response;
  } catch (error) {
    return error?.response ?? null;
  }
};

export const requestGET_CD = async (URL, token = null) => {
  try {
    const config = {
      method: 'GET',
      url: URL,
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            tenant: 'root',
          }
        : {
            'Content-Type': 'application/json',
            tenant: 'root',
          },
    };
    const response = await axios(config);
    return response;
  } catch (error) {
    return error?.response ?? null;
  }
};

export const requestDELETE_CD = async (URL, token = null) => {
  try {
    const config = {
      method: 'DELETE',
      url: URL,
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            tenant: 'root',
          }
        : {
            'Content-Type': 'application/json',
            tenant: 'root',
          },
    };
    const response = await axios(config);
    return response;
  } catch (error) {
    return error?.response ?? null;
  }
};
