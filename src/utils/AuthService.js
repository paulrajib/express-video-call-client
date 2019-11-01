import decode from 'jwt-decode';
import axios from 'axios';
import { AuthStatus as AuthStatusAction } from '../actions';

var basePath = '/api';

export function login(email, password)
{
	return axios({
		method: 'post',
		url: basePath+'/users/auth',
		headers: {
			'Content-Type': 'application/json'
		},
		data: {
			email: email,
			password: password
		}
	});
}

export function register(email, password)
{
	return axios({
		method: 'post',
		url: basePath+'/users/register',
		headers: {
			'Content-Type': 'application/json'
		},
		data: {
			email: email,
			password: password
		}
	});
}

export function isLoggedIn()
{
	if(localStorage.getItem('token') !== null)
	{
		var token = localStorage.getItem('token');
		if(isTokenExpired(token))
		{
			return false;
		}
		else
		{
			return true;
		}
	}
	else
	{
		return false;
	}
}

export function getAccessToken()
{
	return localStorage.getItem('token');
}

export function setAccessToken(token)
{
	localStorage.setItem('token', token);
}

export function clearAccessToken()
{
	if(localStorage.getItem('token') !== null)
	{
		localStorage.removeItem('token');
	}
}

function getTokenExpirationDate(encodedToken)
{
	const token = decode(encodedToken);
	if (!token.exp) { return null; }

	const date = new Date(0);
	date.setUTCSeconds(token.exp);

	return date;
}

function isTokenExpired(token)
{
	const expirationDate = getTokenExpirationDate(token);
	return expirationDate < new Date();
}