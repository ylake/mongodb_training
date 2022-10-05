## Overview

이 문서는 CRUD의 기본 사용방법과 주의사항을 확인할 수 있는 실습을 담고 있다.

## 환경

MongoDB Atlas에서 5.0버전을 사용한다.

## 실습

### Insert One

```javascript
db.employee.insertOne({
    name: "lake",
    age: 21,
    dept: "Database",
    joinDate: new ISODate("2022-10-05"),
    salary: 400000,
});
```

### Insert Many

```javascript
db.employee.insertMany([
    {
        name: "ocean",
        age: 45,
        dept: "Network",
        joinDate: new ISODate("1999-11-15"),
        salary: 10000,
        resignationDate: new ISODate("2002-12-23"),
    },
    {
        name: "river",
        age: 34,
        dept: "DevOps",
        isNegotiating: true,
    },
]);
```

### Insert One vs Insert Many

```javascript
// insertOne
for (i = 0; i < 300; i++) {
    db.insertTest.insertOne({ a: i });
}

// insertMany
var docs = [];
for (i = 0; i < 300; i++) {
    docs.push({ a: i });
}
db.insertTest.insertMany(docs);
```

-   2개 이상의 Document를 생성하는 경우 가능하면 insertMany함수를 활용하는 것이 좋다.
-   속도차이가 Document 수에 비례해서 많이난다.

### Update One

```javascript
db.employee.updateOne(
    { name: "river" },
    {
        $set: {
            salary: 350000,
            dept: "Database",
            joinDate: new ISODate("2022-12-31"),
        },
        $unset: {
            isNegotiating: "",
        },
    }
);
```

### Update Many

```javascript
db.employee.updateMany(
    { resignationDate: { $exists: false } },
    {
        $mul: { salary: Decimal128("1.1") },
    }
);
```

### Delete One

```javascript
db.employee.deleteOne({ name: "river" });
```

### Delete Many

```javascript
db.employee.deleteMany({});
```

### Drop Collection

```javascript
db.employee.drop();
```
