/// <reference types="vite/client" />
/// <reference types="vite-plugin-pages/client-react" />
interface Window {
  // expose in the `electron/preload/index.ts`
  ipcRenderer: import('electron').IpcRenderer
}
