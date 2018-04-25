const addListeners = function() {
  let button = document.querySelector('form button[type=button]');
  button.onclick = function(){
    window.location = '/typing.html';
  }
}

window.onload = addListeners;