use test

db.ttl.insertMany([
	{
		msg: "Hello!",
		time: new ISODate()
	},
	{
		msg: "HelloWorld!",
		time: new ISODate()
	},
])

db.ttl.find()

db.ttl.createIndex(
	{time: 1},
	{expireAfterSeconds: 60}
)

db.ttl.getIndexes()

db.ttl.find()



db.unique.createIndex(
	{name: 1},
	{unique: true}
)


db.unique.insertMany([
	{name: "tom"},
	{name: "john"},
])

db.unique.insertOne(
	{name: "tom"}
)

db.unique.dropIndex(
	{name: 1}
)

db.unique.createIndex(
	{
		name: 1,
		age: 1
	},
	{unique: true}
)

db.unique.insertOne({
	name: "james",
	age: 23
})

db.unique.insertOne({
	name: "james",
	age: 24
})

db.sparse.insertOne({ x: 1 })
db.sparse.insertOne({ x: 2 })
db.sparse.insertOne({ y: 1 })

db.sparse.createIndex(
	{ x: 1 },
	{sparse: true}
)

db.sparse.find()

db.sparse.find().hint({x: 1})

db.sparse.dropIndex({ x: 1 })

db.sparse.createIndex(
	{ x: 1 },
	{
		partialFilterExpression: {
			x: {$exists: true}
		}
	}
)


db.sparse.find().hint({x: 1})

db.sparse.dropIndex({ x: 1 })

db.sparse.createIndex(
	{ x: 1 },
	{
		partialFilterExpression: {
			x: { $exists: true },
			x: {$gte: 2}
		}
	}
)

db.sparse.find().hint({x: 1})


db.hidden.insertOne({ a: 1 })
db.hidden.insertOne({ a: 2 })

db.hidden.createIndex(
	{ a: 1 },
	{hidden: true}
)

db.hidden.find(
	{a: 1}
).explain('executionStats')

db.hidden.unhideIndex({ a: 1 })


db.hidden.find(
	{a: 1}
).explain('executionStats')
