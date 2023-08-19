export const BASE_URL = 'http://localhost:3000';

function checkResponse(res) { 

  if (!res.ok) { 

    return Promise.reject(`Ошибка: ${res.status}`); 

  } 

  return res.json(); 

};

export function register({email, password})  {
  console.log(email, password);
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },  
    body: JSON.stringify(
      {email, password,}
    ),
  })
  .then(checkResponse)
  .then((data) => {localStorage.setItem("jwt", data.token)
return data})
  }


export function authorize( {email, password} ) {
	return fetch(`${BASE_URL}/signin`, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
	  body: JSON.stringify({
      email: email,
      password: password,
    }),   
	})
  .then(checkResponse)
  .then((data) => {
    console.log(data.jwt)
    if (data.jwt) {
      localStorage.setItem("token" , data.jwt)
      return data
    }
  })
}

export function checkToken() {
   const token = localStorage.getItem('token')
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => res.json())
  .then(data => data)
}

