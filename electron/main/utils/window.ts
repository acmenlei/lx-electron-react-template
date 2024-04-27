import { BrowserWindow } from "electron";
import { VITE_DEV_SERVER_URL, indexHtml, preload } from "..";

export const createNewWindow = (name: string) => {
  let childWindow = new BrowserWindow({
    webPreferences: {
      preload,
      nodeIntegration: true,
    },
  });

  childWindow.on("closed", () => {
    childWindow = null as any;
  })

  if (VITE_DEV_SERVER_URL) {
    childWindow.loadURL(`${VITE_DEV_SERVER_URL}#${name}`);
  } else {
    childWindow.loadFile(indexHtml, { hash: name });
  }
}