```bash
mongo --nodb --no rc
```

MongoDB 접속 없이 shell을 실행한다.


```javascript
MongoRunner.dataPath = "/Users/user/fastcampus/mongodb/shardData/"

st = ShardingTest({
	name: "test-shard",
	chunkSize: 1,
	shards: 3,
	rs: {
		nodes: 3,
		oplogSize: 10
	},
	other: {
		enableBalancer: true
	}
})
```
Sharded Cluster를 구축한다.



```javascript
arr = []
for (i = 0; i < 100000; i++){
	document = {
		index: i,
		text: "text" + i
	}
	arr.push(document);
}

db.testing.insertMany(arr);

sh.status()

sh.enableSharding('test')

db.testing.createIndex({ index: 1 })

sh.shardCollection("test.testing", { index: 1 })

sh.status()


db.testing.createIndex({ text: "hashed" })

sh.reshardCollection("test.testing", { text: "hashed" })


sh.status()
```
접속 후 Sharding을 수행한다.
