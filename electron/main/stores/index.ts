import { app } from "electron";
import { join } from "path";
import ElectronStore from "electron-store";

const store = new ElectronStore({
  name: "settings",
  cwd: join(app.getPath('home'), ".lxelectron", "store"),
});

export function setStore(key: string, value: any) {
  store.set(key, value);
}

export function getStore(key: string) {
  return store.get(key);
}

export function removeStore(key: string) {
  store.delete(key);
}
