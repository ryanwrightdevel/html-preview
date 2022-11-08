const KEYCODE = {
  ESC: 27
}

const dialog = document.querySelector('.dialog');
const  dialogMask = dialog.querySelector('.dialog__mask');
const dialogWindow = dialog.querySelector('.dialog__window');
let previousActiveElement;

function  openDialog(){
  //grab a reference to the previous activeElement
  //we'll want to restore this when we close the dialog

  previousActiveElement = document.activeElement;

  //quick and dirty way to amke all of the siblings of the dialog inert
  Array.from(document.body.children).forEach((child => {
    if(child !== dialog)
      //remove an element from the accessibility and make sure
      //none of the elements are focusable
      //polyfill is available at https://github.com/WICG/inert
      //npm install --save wicg/inert
      child.inert = true;
  }))

  dialog.classList.add('opened');

  //listen for thing s that should close the dialog
  dialogMask.addEventListener('click', closeDialog);
  dialogWindow.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', closeDialog);
    document.addEventListener('keydown', checkCloseDialog);
  })

  //set focus to the button
  dialog.querySelector('button').focus();

}

function closeDialog(){
  dialogMask.removeEventListener('click', closeDialog);
  dialogWindow.querySelectorAll('button').forEach(btn => {
    btn.removeEventListener('click', closeDialog);
  });
  document.removeEventListener('keydown',checkCloseDialog);

  //undo inert
  Array.from(document.body.children).forEach((child => {
    if(child !== dialog)
      child.inert = false;
  }))

  dialog.classList.remove('opened')

  //restore focus
  previousActiveElement.focus();
}

function checkCloseDialog(e){
  if(e.keyCode === KEYCODE.ESC){
    closeDialog();
  }

  dialogWindow.query.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', closeDialog);
    document.addEventListener('keydown', checkCLoseDialog);
  })
}