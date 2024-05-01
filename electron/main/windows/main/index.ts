import { BrowserWindow, shell } from "electron";
import { join } from "path";
import { update } from "@electron/main/update";
import { VITE_DEV_SERVER_URL, indexHtml, preload } from "@electron/main";
import { listener } from "@electron/main/utils/events";
import { createNewWindow } from "@electron/main/utils/window";

export let win: BrowserWindow | null = null;

export async function createWindow() {
  win = new BrowserWindow({
    show: false,
    titleBarStyle: "hiddenInset",
    title: "Electron+React快速开发模板",
    icon: join(process.env.VITE_PUBLIC, "favicon.ico"),
    webPreferences: {
      preload,
      nodeIntegration: true,
      backgroundThrottling: true,
    },
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(indexHtml);
  }

  // 高速渲染进程加载完毕了
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  // 链接通过浏览器打开而不是在应用中打开
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("https:")) shell.openExternal(url);
    return { action: "deny" };
  });

  win.on("ready-to-show", () => win?.show());

  // 自动更新配置
  update(win);
}
/**
 * 回收该窗口
 */
export function recycleMainWindow() {
  win = null;
}

// 监听创建窗口事件
listener("open-win", (events, args) => {
  createNewWindow(args[0]);
});
