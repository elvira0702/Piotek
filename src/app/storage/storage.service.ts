import {Injectable} from '@angular/core';

@Injectable()
export class StorageService {
  public name = 'myDataBase';
  public version = 1;
  public db: any = null;

  constructor() {
  }

  // 打开数据库
  // 参数：1.创建数据库后要创建的表格信息数组，2.3.4 为表格操作方法参数
  public openDataBase(create: Array<any> = [], callback) {
    const request = indexedDB.open(this.name, this.version);

    request.onsuccess = function (e) {
      this.db = e.target.result;
      callback();
    }.bind(this);
    request.onerror = function (e) {
      alert('数据库打开失败');
    };
    request.onupgradeneeded = function (e) {
      this.db = e.target.result;
      // 如果版本号变更，则删掉之前版本号的存储表格
      const storeNames = this.db.objectStoreNames;
      if (storeNames && storeNames.length > 0) {
        for (let i = 0; i < storeNames.length; i++) {
          this.db.deleteObjectStore(storeNames[i]);
        }
      }
      // 创建新的存储表格
      if (create.length > 0) {
        create.forEach(value => {
          // 创建数据库表
          this.createStore(value[0], value[1], value[2]);
        });
      }
      callback();
    }.bind(this);
  }

  // 建表 参数分别为（1.表名，2.要创建的索引的信息数组，可同时创建多个索引，格式为[[索引名,unique属性值（true/false）],...]，
  // 3.要向该表格内添加的数据对象数组
  public createStore(storeName: string, index: Array<any> = [], data: Array<any> = []) {
    const store = this.db.createObjectStore(storeName, {keyPath: 'id'});
    index.forEach(array => {
      store.createIndex(
        array[0],
        array[0],
        {unique: array[1]}
      );
    });
    for (let i = 0; i < data.length; i++) {
      store.add(data[i]);
    }
  }

  // 增
  public add_data(storeName, data) {
    const transaction = this.db.transaction(storeName, 'readwrite');
    const store = transaction.objectStore(storeName);

    // 添加数据：add方法的第一个参数是所要添加的数据，第二个参数是这条数据对应的键名（key）
    const request = data.forEach(value => store.add(value));
  }

  // 删
  public del_data(storeName, data) {
    const transaction = this.db.transaction(storeName, 'readwrite');
    const store = transaction.objectStore(storeName);

    // 删除数据：delete方法的参数是数据的键名（key）
    const request = data.forEach(key => store.delete(key));
  }

  // 改，更新
  public update_data(storeName, data) {
    const transaction = this.db.transaction(storeName, 'readwrite');
    const store = transaction.objectStore(storeName);

    // put()方法
    const request = data.forEach(value => store.put(value));
  }

  // 查
  public get_data(storeName, data, callback) {
    const transaction = this.db.transaction(storeName, 'readonly');
    const store = transaction.objectStore(storeName);
    const type = data[0], name = data[1], value = data[2];
    // 根据键名查询
    if (type === 'key') {
      const request = store.get(value);
      request.onerror = function () {
        alert('数据获取失败');
      };

      request.onsuccess = function (e) {
        callback(e.target.result);
      };
    } else {
      // 根据索引查询
      const index = store.index(name);

      const request = index.openCursor(value);
      const result: Array<any> = [];
      request.onsuccess = function (event) {
        const cursor = event.target.result;
        if (cursor) {
          result.push(cursor.value);
          cursor.continue();
        } else {
          callback(result);
        }
      };
      request.onerror = function () {
        alert('数据获取失败');
      };
    }
  }

  // 关闭数据库
  public close(): void {
    this.db.close();
  }

  // 删除数据库
  public deleteDB() {
      // 先关闭连接再删
      this.close();

      const req = indexedDB.deleteDatabase(this.name);
  }

  // 清楚全部数据
  public clearAllData(): Promise<any> {
    const storeNameList: Array<string> = new Array<string>();
    const storeNames = this.db.objectStoreNames;
    if (storeNames && storeNames.length > 0) {
      for (let i = 0; i < storeNames.length; i++) {
        storeNameList.push(storeNames[i]);
      }
    }
    return Promise.all(
      storeNameList.map((storeName) => {
        return this.clear(storeName);
      })
    );
  }

  // 清空数据
  public clear(storeName: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const transaction = this.db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);

      const req = store.clear();

      req.onsuccess = resolve;
      req.onerror = reject;
    });
  }
}
