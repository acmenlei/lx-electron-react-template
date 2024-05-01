import { BrowserWindow } from "electron";
import { VITE_DEV_SERVER_URL, indexHtml, preload } from "..";
/**
 * 创建新窗口
 * @param name
 */
export const createNewWindow = (name: string) => {
  let childWindow = new BrowserWindow({
    show: false,
    title: name,
    webPreferences: {
      preload,
      nodeIntegration: true,
    },
  });

  childWindow.on("closed", () => {
    childWindow = null as any;
  });

  childWindow.on('ready-to-show', () => childWindow.show())

  if (VITE_DEV_SERVER_URL) {
    childWindow.loadURL(`${VITE_DEV_SERVER_URL}#${name}`);
  } else {
    childWindow.loadFile(indexHtml, { hash: name });
  }
};
/**
 * 固定工作区
 * @param targetWindow
 */
export const fixedWorkArea = (targetWindow: BrowserWindow) => {
  targetWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
};
/**
 * 固定层级到程序坞｜Tab栏之上
 * @param targetWindow
 */
export const fixedOnDock = (targetWindow: BrowserWindow) => {
  targetWindow.setAlwaysOnTop(true, "normal", 20);
};
