import { app, BrowserWindow, ipcMain, Menu } from 'electron'
import path from 'node:path'

const ipc = ipcMain

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, '../dist')
process.env.PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public')


let win: BrowserWindow | null
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']

function createWindow() {
  win = new BrowserWindow({
    width: 1280,
    height: 800,
    icon: path.join(process.env.PUBLIC, '../logo.svg'),

    minWidth: 320,
    minHeight: 180,
    frame: false,
    // icon: '/path/to/logo.svg',
    // icon: path.join(__dirname, '/icon.svg',),
    // icon: path.join(__dirname, 'assets', 'icon', 'icon.svg'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  })
  
  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })
      //! Close custom win-menu
  Menu.setApplicationMenu(null)
  ipc.on('closeApp', ()=> {
    console.log('custom-close');
  })
  
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    win.loadFile(path.join(process.env.DIST, 'index.html'))
  }
}
    
app.on('window-all-closed', () => {
  win = null
})


app.whenReady().then(createWindow)
