import { BrowserWindow, shell } from "electron";
import { join } from "path";
import { update } from "@electron/main/update";
import { emiter, listener } from "@electron/main/utils/events";
import { createNewWindow } from "@electron/main/utils/window";
import { VITE_DEV_SERVER_URL, indexHtml, preload } from "@electron/main";

export let win: BrowserWindow | null = null;

export async function createWindow() {
  win = new BrowserWindow({
    title: "Electron+React快速开发模板",
    icon: join(process.env.VITE_PUBLIC, "favicon.ico"),
    webPreferences: {
      preload,
      // Warning: Enable nodeIntegration and disable contextIsolation is not secure in production
      nodeIntegration: true,
      // Read more on https://www.electronjs.org/docs/latest/tutorial/context-isolation
      // contextIsolation: false,
    },
  });

  if (VITE_DEV_SERVER_URL) {
    // #298
    win.loadURL(VITE_DEV_SERVER_URL);
    // Open devTool if the app is not packaged
    win.webContents.openDevTools();
  } else {
    win.loadFile(indexHtml);
  }

  // Test actively push message to the Electron-Renderer
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("https:")) shell.openExternal(url);
    return { action: "deny" };
  });

  // 自动更新配置
  update(win);
}
/**
 * 回收该窗口
 */
export function recycleMainWindow() {
  win = null;
}

listener("open-win", (events, args) => {
  emiter("test", 1);
  createNewWindow(args[0]);
});
