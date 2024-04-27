import { BrowserWindow, ipcMain, webContents } from "electron";

/**
 * 处理渲染进程发送的事件
 * @param winName
 * @param eventName
 * @param cb
 */
export const listener = ipcMain.handle;
/**
 * 发送事件给渲染进程
 * @param name
 * @param args
 */
export function emiter(channel: string, ...args: any[]) {
  const contents = webContents.getAllWebContents();
  for (const content of contents) {
    content.send(channel, args);
  }
}
/**
 * 发送事件给渲染进程【单个窗口】
 * @param win
 * @param name
 * @param args
 */
export function emiterOne(
  win: BrowserWindow | null,
  channel: string,
  ...args: any[]
) {
  win?.webContents.send(channel, args);
}
