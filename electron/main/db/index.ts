import { app } from 'electron';
import { join } from 'node:path';
import { Sequelize } from 'sequelize';
import { getVersion, setVersion } from '@electron/main/stores/version';
import { version } from '../../../package.json';
import { __DEV__ } from '../utils';

export const storage = __DEV__
  ? 'db.sqlite'
  : join(app.getPath('home'), '.lxelectron', 'db.sqlite');

export let sequelize: Sequelize;
/**
 * 初始化数据库
 * @returns 
 */
export async function sqlLiteInit() {
  return new Promise((resolve) => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage,
    });
    resolve(true);
  });
}
/**
 * 删除数据库表【删除历史记录】
 * @returns
 */
export async function sqlLiteDrop() {
  return new Promise((resolve) => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage,
    });
    resolve(true);
    // 进行同步，创建表
    sequelize
      .sync({ force: true })
      .then(() => {
        console.log('数据库模型已同步...');
        resolve(true);
      })
      .catch(err => {
        console.error('数据库模型同步出错：', err);
        resolve(false);
      });
  });
}
/**
 * 同步数据库模型【更新版本的时候】
 */
export async function checkDataBaseVersion() {
  return new Promise(resovle => {
    const curVersion = getVersion();
    if (curVersion !== version) {
      sequelize.sync({ alter: true }).then(() => {
        console.log('当前安装版本不一致，进行数据库数据迁移');
        setVersion(version);
        resovle(true);
      });
    } else {
      sequelize.sync().then(() => {
        console.log('数据库已同步...');
        resovle(true);
      });
    }
  });
}
// 创建数据库资源
sqlLiteInit();