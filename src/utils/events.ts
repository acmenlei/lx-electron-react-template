const useEvents = () => window.electronAPI.ipcEvents;

export const events = useEvents();

/**
 * 监听主进程事件
 * @param eventName 
 * @returns 
 */
export const mainListener = function <T>(eventName: string): Promise<T> {
  return new Promise<T>((resolve) => {
    events.on("main", eventName, (text) => {
      resolve(text as T);
    });
  });
};
/**
 * 给主进程发送数据
 * @param winName 
 * @param eventName 
 * @param arg 
 * @returns 
 */
export const mainEmiter = function <T>(
  eventName: string,
  ...args: any[]
): Promise<T> {
  return new Promise<T>(async (resolve) => {
    const answer = await events.invokeTo('main', eventName, args);
    resolve(answer);
  });
};
