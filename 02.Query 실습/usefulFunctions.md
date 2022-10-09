### bulkWrite
```javascript
db.bulk.bulkWrite(
	[
		{insertOne: {doc: 1, order: 1}},
		{insertOne: {doc: 2, order: 2}},
		{insertOne: {doc: 3, order: 3}},
		{insertOne: {doc: 4, order: 4}},
		{insertOne: {doc: 4, order: 5}},
		{insertOne: {doc: 5, order: 6}},
		{
			deleteOne: {
				filter: {doc: 3}
			}
		},
		{
			updateOne: {
				filter: { doc: 2 },
				update: {
					$set: {doc: 12}
				}
			}
		}
	]
)


db.bulk.bulkWrite(
	[
		{insertOne: {doc: 1, order: 1}},
		{insertOne: {doc: 2, order: 2}},
		{insertOne: {doc: 3, order: 3}},
		{insertOne: {doc: 4, order: 4}},
		{insertOne: {doc: 4, order: 5}},
		{insertOne: {doc: 5, order: 6}},
		{
			updateOne: {
				filter: { doc: 2 },
				update: {
					$set: {doc: 3}
				}
			}
		},
		{
			deleteMany: {
				filter: {doc: 3}
			}
		},
	],
	{ordered: false}
)
```

### Count Documents
```javascript
db.bulk.countDocuments()

db.bulk.estimatedDocumentCount()
```

### Distinct
```javascript
db.bulk.distinct("doc")
```

### Find And Modify
```javascript
db.bulk.findAndModify({
	query: { doc: 4 },
	update: { $inc: {doc: 1} }
})

db.bulk.findAndModify({
	query: { doc: 5 },
	sort: {order: -1},
	update: { $inc: {doc: 1} }
})

db.sequence.insertOne({ seq: 0 })

db.sequence.findAndModify({
	query: {},
	sort: { seq: -1 },
	update: { $inc: {seq: 1}}
})
```

### Get Index
```javascript
db.bulk.createIndex({ doc: 1 })

db.bulk.getIndexes()
```

### Replace One
```javascript
db.bulk.updateOne({ doc: 1 }, { $set: { _id: 1 } })
db.bulk.replaceOne({ doc: 1 }, {_id: 1, doc: 13})
db.bulk.replaceOne({ doc: 1 }, {doc: 13})
```
