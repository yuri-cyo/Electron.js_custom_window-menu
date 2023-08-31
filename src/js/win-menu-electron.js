// import { ipcRenderer } from 'electron';
const { ipcRenderer } = require('electron')
const ipc = ipcRenderer;

// const btnWinClose = document.querySelector('#btnWinClose')
console.log('qweqwe');

btnWinClose.addEventListener('click', ()=> {
    console.log('cl');
    ipc.send('closeApp')
})

// const { app, Menu } = require('electron')

// const isMac = process.platform ==='darwin'