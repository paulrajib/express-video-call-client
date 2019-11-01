import store from '../redux/store.js';
import axios from 'axios';

export function sendRequest(url, method, data = null)
{
	var accessToken = store.getState().AccessToken.accessToken;
	var headers = {
		'Content-Type': 'application/json'
	};
	if(accessToken !== null)
	{
		headers.Authorization = 'JWT '+accessToken;
	}
	
	var conf = {
			url: url,
			method: method,
			headers: headers
	};
	if(data !== null)
	{
		conf.data = data;
	}
	return axios(conf);
}