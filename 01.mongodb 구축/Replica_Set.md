## Overview

이 문서는 local 환경에서 MongoDB를 Replica Set으로 구축하는 방법을 작성한다.

## 참고

-   https://www.mongodb.com/docs/manual/tutorial/deploy-replica-set/
-   https://www.mongodb.com/docs/manual/tutorial/deploy-replica-set-for-testing/

## 환경

해당 실습은 MacOS에서 진행되었으면 MongoDB 5.0.12 버전을 사용한다.

Window나 Linux 계열의 다른 플랫폼에서 사용하더라도 binary의 옵션은 동일하여, 똑같이 실습 진행이 가능하다.

## 실습

### Binary 설치

https://www.mongodb.com/try/download/community

### 환경 준비

```bash
mkdir -p mongodb/data{1,2,3}
mkdir -p mongodb/config
mkdir -p mongodb/logs
```

### 실행 방법1. Binary 옵션 이용

```bash
cd ~/Downloads
cd mongodb-macos-x86_64-5.0.12
cd bin

# 각각 다른 터미널에서 실행한다.
mongod --replSet rs1 --port 27017 --bind_ip "0.0.0.0" --dbpath /Users/user/mongodb/data1  --oplogSize 128
mongod --replSet rs1 --port 27018 --bind_ip "0.0.0.0" --dbpath /Users/user/mongodb/data2  --oplogSize 128
mongod --replSet rs1 --port 27019 --bind_ip "0.0.0.0" --dbpath /Users/user/mongodb/data3  --oplogSize 128
```

### 실행 방법2. Config File 이용

```bash
vim mongodb/config/mongod1.conf
vim mongodb/config/mongod2.conf
vim mongodb/config/mongod3.conf
```

#### mongod1.conf

```yaml
net:
    port: 27017
    bindIp: 0.0.0.0

storage:
    dbPath: "/Users/user/mongodb/data1"
    directoryPerDB: true

replication:
    oplogSizeMB: 128
    replSetName: "rs1"

systemLog:
    path: "/Users/user/mongodb/logs/mongod1.log"
    destination: "file"
```

#### mongod2.conf

```yaml
net:
    port: 27018
    bindIp: 0.0.0.0

storage:
    dbPath: "/Users/user/mongodb/data2"
    directoryPerDB: true

replication:
    oplogSizeMB: 128
    replSetName: "rs1"

systemLog:
    path: "/Users/user/mongodb/logs/mongod2.log"
    destination: "file"
```

#### mongod3.conf

```yaml
net:
    port: 27019
    bindIp: 0.0.0.0

storage:
    dbPath: "/Users/user/mongodb/data3"
    directoryPerDB: true

replication:
    oplogSizeMB: 128
    replSetName: "rs1"

systemLog:
    path: "/Users/user/mongodb/logs/mongod3.log"
    destination: "file"
```

```bash
cd ~/Downloads
cd mongodb-macos-x86_64-5.0.12
cd bin

# 각각 다른 터미널에서 실행한다.
./mongod -f /Users/user/mongodb/config/mongod1.conf
./mongod -f /Users/user/mongodb/config/mongod2.conf
./mongod -f /Users/user/mongodb/config/mongod3.conf
```

### Replica Set Initiate

#### 멤버 접속

```bash
cd ~/Downloads
cd mongodb-macos-x86_64-5.0.12
cd bin

./mongo "mongodb://localhost:27017"
```

#### Replica Set Initiate and Check

```javascript
rs.initiate({
    _id: "rs1",
    members: [
        { _id: 0, host: "localhost:27017" },
        { _id: 1, host: "localhost:27018" },
        { _id: 2, host: "localhost:27019" },
    ],
});

rs.status;
```
