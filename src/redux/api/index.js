import { mainURl } from '../constanst';
export default class Api {
  static getToken = async data => {
    var formdata = new FormData();
    formdata.append('grant_type', 'password');
    formdata.append('client_id', '2');
    formdata.append(
      'client_secret',
      'UtjTgffhEHELdKHPggA6feRwByUtcDbWrUJs2LJy',
    );
    formdata.append('username', data.email);
    formdata.append('password', data.password);
    formdata.append('scope', '*');

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };
    const response = await fetch(
      'https://stimuli.craftsweb.co.in/oauth/token',
      requestOptions,
    )
      .then(response => response.text())
      .then(result => JSON.parse(result))
      .catch(error => error);
    return response;
  };
  static API_POST = async data => {
    var myHeaders = {
      Authorization: `Bearer ${data.token}`,
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
    };

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: data.formdata,
      redirect: 'follow',
    };
    console.log(`${mainURl}${data.url}`);
    return await fetch(`${mainURl}${data.url}`, requestOptions)
      .then(response => response.text())
      .then(result => JSON.parse(result))
      .catch(error => console.log('error', error));
  };
  static API_GET = async data => {
    try {
      let params = data.params;
      var myHeaders = {
        Authorization: `Bearer ${data.token}`,
      };
      const queryString = Object.keys(params)
        .map(
          key =>
            encodeURIComponent(key) + '=' + encodeURIComponent(params[key]),
        )
        .join('&');

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      };
      const response = await fetch(
        `${mainURl}${data.url}?${queryString}`,
        requestOptions,
      );
      return await response.json();
    } catch (err) {
      console.log('error in Api ===>', err);
      return null;
    }
  };
  static API_POST_JSON = async data => {
    try {
      const myHeaders = {
        Authorization: `Bearer ${data.token}`, // agar token chahiye
        'Content-Type': 'application/json',
        Accept: 'application/json',
      };

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(data.body), // JSON body
        redirect: 'follow',
      };

      console.log(`${mainURl}${data.url}`);
      const response = await fetch(`${mainURl}${data.url}`, requestOptions);
      const result = await response.json();
      return result;
    } catch (error) {
      console.log('error', error);
      throw error;
    }
  };
}
