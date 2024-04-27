/**
 * 监听主进程事件
 * @param eventName
 * @returns
 */
export const listener = function <T>(eventName: string): Promise<T> {
  return new Promise<T>((resolve) => {
    window.ipcRenderer.on(eventName, (_event, text) => {
      console.log(text)
      resolve(text as T);
    });
  });
};
/**
 * 给主进程发送数据
 * @param eventName
 * @param arg
 * @returns
 */
export const emiter = function <T>(
  eventName: string,
  ...args: any[]
): Promise<T> {
  return new Promise<T>(async (resolve) => {
    const answer = await window.ipcRenderer.invoke(eventName, args);
    resolve(answer);
  });
};
