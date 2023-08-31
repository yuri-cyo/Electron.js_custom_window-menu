import { ipcRenderer } from 'electron';
const ipc = ipcRenderer;

// const closeBtn = document.querySelector('#btnWinClose')

btnWinClose.addEventListener('click', ()=> {
    ipc.send('closeApp')
})