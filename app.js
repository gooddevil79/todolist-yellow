'use strict';
//////// Selectors ////////
const btnAdd = document.querySelector('.add-button');
const todoInput = document.querySelector('.todo-input');
const taskList = document.querySelector('.tasks-list');
const alertModal = document.querySelector('.modal-alert');
const overlay = document.querySelector('.overlay');
const closeModalBTN = document.querySelector('.close-modal-btn');
const filterOption = document.querySelector('.filter-todos');
///sound///
let snd = new Audio('click.mp3'); // buffers automatically when created
snd.play();
///////// functions /////////
const addTask = function (e) {
  snd.play();
  e.preventDefault();

  if (todoInput.value === '') {
    alertModal.classList.remove('hidden-alert');
    overlay.classList.remove('hidden-overlay');
  } else {
    const todoDiv = `  
    <div class="task-item">
    <li class="task-text">${todoInput.value}</li>
    <button class="check"><i class="fas fa-check"></i></button>
    <button class="delete"><i class="fas fa-trash"></i></button>
  </div>`;
    todoInput.value = '';
    taskList.insertAdjacentHTML('afterbegin', todoDiv);
  }
  console.log(taskList);
};

const deletCheck = function (e) {
  const item = e.target;
  if (item.classList[0] === 'delete') {
    snd.play();
    const task = item.parentNode;
    task.classList.add('delete-animation');
    task.addEventListener('transitionend', function () {
      task.remove();
    });
  } else if (item.classList[0] === 'check') {
    snd.play();
    console.log(item);
    item.parentElement.classList.toggle('done');
  }
};
const closeModal = function () {
  snd.play();
  alertModal.classList.add('hidden-alert');
  overlay.classList.add('hidden-overlay');
};
const filterTask = function (e) {
  snd.play();
  const todos = taskList.children;

  Array.from(todos).forEach(function (todo) {
    switch (e.target.value) {
      case 'all':
        todo.style.display = 'flex';
        break;
      case 'completed':
        if (todo.classList.contains('done')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
      case 'uncompleted':
        if (!todo.classList.contains('done')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
    }
  });
};
//////// Event Listenrers ////////
btnAdd.addEventListener('click', addTask);
taskList.addEventListener('click', deletCheck);
closeModalBTN.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
filterOption.addEventListener('click', filterTask);
