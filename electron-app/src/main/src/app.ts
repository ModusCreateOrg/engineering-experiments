import {app, BrowserWindow, Tray, Menu} from 'electron';
import {platform} from 'os';
import {join} from 'path';
import {VersionObj} from '../typings';

const sys = platform() === 'darwin' ? 'm' : ~platform().indexOf('win') ? 'w' : 'l';
const baseDir = join(__dirname);

export default class AppClass {
    static mainWindow: BrowserWindow | null;
    static appIcon: Tray;
    static iconPath: string = join(baseDir, 'images', `favicon.${sys === 'w' ? 'ico' : 'png'}`);
  
    constructor() {
      app.setAppUserModelId(process.env.APP_NAME!);

      (async () => {
        await app.whenReady();
        this.createWindow();
        this.createDockIcon();
        this.createAppIcon();
      })();
  
      app.on('activate', () => {
        if (!AppClass.mainWindow) {
          this.createWindow();
          this.createAppIcon();
        }
      });
  
      // Quit when all windows are closed.
      app.on('window-all-closed', () => {
        // On OS X it is common for applications and their menu bar
        // to stay active until the user quits explicitly with Cmd + Q
        if (AppClass.appIcon) AppClass.appIcon.destroy();
        app.quit();
      });
    }

    private closeApp(): void {
      AppClass.appIcon.destroy();
      AppClass.mainWindow!.close();
    }

    private createAppIcon(): void {
      const contextMenu = Menu.buildFromTemplate([{
        label: 'Exit',
        click: this.closeApp
      }]);
      AppClass.appIcon = new Tray(AppClass.iconPath);
      AppClass.appIcon.setToolTip(process.env.APP_NAME!);
      AppClass.appIcon.setContextMenu(contextMenu);
      AppClass.appIcon.on('double-click', () => {
      });
    }

    private createDockIcon(): void {
      app.dock.setIcon(AppClass.iconPath);
    }
  
    createWindow(): void {
      // Create the browser window.
      AppClass.mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        frame: false,
        icon: AppClass.iconPath,
        webPreferences: {
          devTools: true,
          nodeIntegration: true,
          contextIsolation: false
        }
      });

      // and load the index.html of the app.
      AppClass.mainWindow.loadURL(process.env.ELECTRON_ENV === 'dev' ? 
        'http://localhost:3000':
        `file://${join(__dirname, 'index.html')}`
      );

      AppClass.mainWindow.webContents.on('did-finish-load', () => {
        (AppClass.mainWindow!).webContents.send('load', this.getVersion());
      });

      AppClass.mainWindow.on('closed', () => {
        AppClass.mainWindow = null;
      });

      // AppClass.mainWindow.webContents.openDevTools();
    }

    getVersion(): VersionObj {
      return ['chrome', 'node', 'electron'].reduce((ini, val) => ({
        ...ini,
        [val]: process.versions[val]
      }), {} as VersionObj);
    }
}
