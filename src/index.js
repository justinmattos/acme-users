const faker = require('faker');

const userList = document.querySelector('#user-list');

let users = JSON.parse(window.localStorage.users);
let curr = window.location.hash.slice(1) * 1;

if (!users) {
  users = new Array(10).fill('').map(() => faker.helpers.userCard());
  window.localStorage.users = JSON.stringify(users);
}

const populateUsers = () => {
  userList.innerHTML = '';
  for (let idx in users) {
    const user = users[idx];
    const newLi = document.createElement('li');
    const newA = document.createElement('a');
    newA.href = `#${idx * 1 + 1}`;
    newA.innerHTML = user.name;
    userList.appendChild(newLi);
    newLi.appendChild(newA);
    if (curr === idx * 1 + 1) {
      const newUl = document.createElement('ul');
      newLi.appendChild(newUl);
      [user.username, user.email, user.phone, user.website]
        .map((detail) => {
          const userLi = document.createElement('li');
          userLi.innerHTML = detail;
          return userLi;
        })
        .forEach((userLi) => newUl.appendChild(userLi));
    }
  }
};

populateUsers();

window.addEventListener('hashchange', () => {
  curr = window.location.hash.slice(1) * 1;
  populateUsers();
});
