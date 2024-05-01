import { getStore, removeStore, setStore } from '.';

const VERSION_KEYS = 'database_version';

export function setVersion(version: string) {
  setStore(VERSION_KEYS, version);
}

export function getVersion() {
  return getStore(VERSION_KEYS);
}

export function removeVersion() {
  removeStore(VERSION_KEYS);
}