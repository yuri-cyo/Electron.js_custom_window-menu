const { ipcRenderer } = require('electron');

let btnWinMin = document.querySelector('#btnWinMin');
let btnWinMax = document.querySelector('#btnWinMax');
let btnWinClose = document.querySelector('#btnWinClose');

btnWinMin.addEventListener('click', () => {
    ipcRenderer.send('minimize-window');
});

btnWinMax.addEventListener('click', () => {
    ipcRenderer.send('maximize-window');
});

btnWinClose.addEventListener('click', () => {
    ipcRenderer.send('close-window');
});
