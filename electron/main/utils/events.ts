import { BrowserWindow } from "electron";
import { type MainIpcEvents, useEvents } from "electron-events";

const events = useEvents("browser") as MainIpcEvents;

/**
 * 添加窗口到事件系统中
 * @param name 
 * @param win 
 */
export function addWindow(name: string, win: BrowserWindow) {
  events.addWindow(name, win);
  win.on("close", () => events.removeWindow(name));
}
/**
 * 发送事件给渲染进程
 * @param winName 
 * @param name 
 * @param args 
 */
export function emitIPC(winName: string, name: string, ...args: any[]) {
  events.emitTo(winName, name, args);
}
/**
 * 处理渲染进程发送的事件
 * @param winName 
 * @param eventName 
 * @param cb 
 */
export function handleIPC(
  winName: string,
  eventName: string,
  cb: (...args: any[]) => void
) {
  events.handle(winName, eventName, cb);
}
