import { app, BrowserWindow } from "electron";
import { fileURLToPath } from "node:url";
import path from "node:path";
import os from "node:os";

import { createWindow, recycleMainWindow, win } from "./windows/main";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

process.env.APP_ROOT = path.join(__dirname, "../..");

export const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
export const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
export const VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL;
export const preload = path.join(__dirname, "../preload/index.mjs");
export const indexHtml = path.join(RENDERER_DIST, "index.html");

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, "public")
  : RENDERER_DIST;

// Disable GPU Acceleration for Windows 7
if (os.release().startsWith("6.1")) app.disableHardwareAcceleration();

// Set application name for Windows 10+ notifications
if (process.platform === "win32") app.setAppUserModelId(app.getName());

if (!app.requestSingleInstanceLock()) {
  app.quit();
  process.exit(0);
}
// 当应用准备好的时候开始创建窗口
app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  // 回收主窗口
  recycleMainWindow()
  if (process.platform !== "darwin") app.quit();
});

app.on("second-instance", () => {
  if (win) {
    // 当运行第二个实例时,将会聚焦到mainWindow这个窗口
    if (win.isMinimized()) win.restore();
    win.focus();
  }
});

app.on("activate", () => {
  const allWindows = BrowserWindow.getAllWindows();
  if (allWindows.length) {
    allWindows[0].focus();
  } else {
    createWindow();
  }
});