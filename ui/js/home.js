'use strict';
import {url} from './conf';


// select existing html elements
const ul = document.querySelector('#list');

// get user data for admin check
const user = JSON.parse(sessionStorage.getItem('user'));

// create cat cards
const createCatCards = (cats) => {
  // clear ul
  ul.innerHTML = '';
  cats.forEach((cat) => {
    // create li with DOM methods
    const img = document.createElement('img');
    img.src = url + '/img/' + cat.filename;
    img.alt = cat.name;
    img.classList.add('resp');

    // open image in single.html
    img.addEventListener('click', () => {
      location.href = 'single.html?id=' + cat.post_id;
    });

    const figure = document.createElement('figure').appendChild(img);

    const h2 = document.createElement('h2');
    h2.innerHTML = post.name;

    const p1 = document.createElement('p');
    p1.innerHTML = `date: ${post.date}`;

    const p2 = document.createElement('p');
    p2.innerHTML = `location: ${post.location}`;

    const p3 = document.createElement('p');
    p3.innerHTML = `Name: ${post.name}`;

    const li = document.createElement('li');
    li.classList.add('light-border');

    li.appendChild(h2);
    li.appendChild(figure);
    li.appendChild(p1);
    li.appendChild(p2);
    li.appendChild(p3);
    ul.appendChild(li);
  });
};

// AJAX call
const getPost = async () => {
  try {
    const fetchOptions = {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    const response = await fetch(url + '/post', fetchOptions);
    const cats = await response.json();
    createCatCards(cats);
  } catch (e) {
    console.log(e.message);
  }
};
getPost();
