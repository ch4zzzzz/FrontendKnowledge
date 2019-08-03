# IndexedDB

IndexedDB是一种低级API，用于客户端存储大量结构化数据(包括, 文件/ blobs)。该API使用索引来实现对该数据的高性能搜索。虽然 [Web Storage](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Storage_API) 对于存储较少量的数据很有用，但对于存储更大量的结构化数据来说，这种方法不太有用。

特点：

* IndexedDB是一个事务型数据库系统，是一个基于JavaScript的面向对象的数据库。
* 允许存储和检索用**键**索引的对象
* 可以存储[结构化克隆算法](https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/The_structured_clone_algorithm)支持的任何对象
* 使用IndexedDB执行的操作是异步执行的，以免阻塞应用程序
* IndexedDB 支持事务（transaction），这意味着一系列操作步骤之中，只要有一步失败，整个事务就都取消，数据库回滚到事务发生之前的状态，不存在只改写一部分数据的情况
* IndexedDB 受到同源限制，每一个数据库对应创建它的域名。网页只能访问自身域名下的数据库，而不能访问跨域的数据库。
* 存储空间大，数据是希望长久保留的，只有的当用户选择清除才会被删除掉

## 使用方法

```javascript
// 连接数据库
// `IDBFactory.open(name, version)`
const DBOpenRequest = window.indexedDB.open("toDoList", 4);
let db;

DBOpenRequest.onerror = function(event) {
  // do something...
};

DBOpenRequest.onsuccess = function(event) {
  
  // do something...
    
  // store the result of opening the database in the db
  // variable. This is used a lot later on, for opening
  // transactions and suchlike.
  db = DBOpenRequest.result;
    
  const transaction = db.transaction('my-store-name', 'readwrite');
  transaction.oncomplete = function(event) {
    // do something...
  };

  transaction.onerror = function(event) {
    // do something...
  };
};

// 当一个新版本的数据库被创建时执行
DBOpenRequest.onupgradeneeded = function(event) {
  var db = event.target.result;

  db.onerror = function(event) {
    note.innerHTML += "<li>Error loading database.</li>";
  };
  // 创建表
  // Create an objectStore for this database

  var objectStore = db.createObjectStore("toDoList", { keyPath: "taskTitle" });

  // define what data items the objectStore will contain

  objectStore.createIndex("hours", "hours", { unique: false });
  objectStore.createIndex("minutes", "minutes", { unique: false });
  objectStore.createIndex("day", "day", { unique: false });
  objectStore.createIndex("month", "month", { unique: false });
  objectStore.createIndex("year", "year", { unique: false });

  objectStore.createIndex("notified", "notified", { unique: false });
};
```

## 对比`Web Storage`

* `Web Storage`存储空间比较小（最大一般为5M）
* `Web Storage`只能存储字符型数据，`IndexedDB`可以存储结构化克隆算法支持的任何对象

## 参考资料

<https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API>

<https://developers.google.com/web/ilt/pwa/working-with-indexeddb#reading_data>

<https://juejin.im/post/5c8e6fa8e51d453ec75168cd#heading-16>