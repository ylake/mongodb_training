use sample_training

show collections

db.zips.findOne()

db.zips.getIndexes()

db.zips.find(
	{
		state: "LA",
		pop: {
			$gte: 40000
		}
	}
).sort({city: 1})


db.zips.find(
	{
		state: "LA",
		pop: {
			$gte: 40000
		}
	}
).sort({city: 1}).explain('executionStats')

db.zips.createIndex({ state: 1 })

db.zips.getIndexes()

db.zips.find(
	{
		state: "LA",
		pop: {
			$gte: 40000
		}
	}
).sort({ city: 1 }).explain('executionStats')


db.zips.createIndex({ state: 1, city: 1, pop: 1 })

db.zips.getIndexes()


db.zips.find(
	{
		state: "LA",
		pop: {
			$gte: 40000
		}
	}
).sort({ city: 1 }).explain('executionStats')



db.zips.find(
	{
		state: "LA",
		pop: {
			$gte: 40000
		}
	},
	{
		_id: 0,
		state: 1,
		pop: 1,
		city: 1
	}
).sort({ city: 1 }).explain('executionStats')
