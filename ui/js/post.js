'use strict';
import {url} from '../../conf.js';

// select existing html elements
const addForm = document.querySelector('#postCatForm');
const userList = document.querySelector('.add-owner');

// submit post cat form
addForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const fd = new FormData(addForm);
  const fetchOptions = {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + sessionStorage.getItem('token'),
    },
    body: fd,
  };
  const response = await fetch(url + '/post', fetchOptions);
  const json = await response.json();
  alert(json.message);
  location.href = 'front.html';
});
