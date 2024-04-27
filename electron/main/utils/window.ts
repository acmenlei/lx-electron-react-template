import { BrowserWindow } from "electron";
import { addWindow } from "./event";
import { VITE_DEV_SERVER_URL, indexHtml, preload } from "..";

export const createNewWindow = (name: string) => {
  const childWindow = new BrowserWindow({
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  addWindow(name, childWindow);

  if (VITE_DEV_SERVER_URL) {
    childWindow.loadURL(`${VITE_DEV_SERVER_URL}#${name}`);
  } else {
    childWindow.loadFile(indexHtml, { hash: name });
  }
}