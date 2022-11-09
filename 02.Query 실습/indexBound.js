db.survey.insertMany([
	{item: "ABC", ratings: [2, 9], category_id: 10},
	{item: "XYZ", ratings: [4, 3], category_id: 10},
	{item: "ABC", ratings: [9], category_id: 20},
	{item: "ABC", ratings: [9, 10], category_id: 30},
	{item: "ABC", ratings: [2, 4], category_id: 30}
])

for (var i = 0; i < 15; i++){
	arr = []
	db.survey.find({}, { _id: 0 }).forEach(function (document) {
		arr.push(document);
	})
	db.survey.insertMany(arr)
}

db.survey.createIndex({ category_id: 1 })

db.survey.find({
	category_id: {
		$gt: 15,
		$lt: 25
	}
}).explain('executionStats')


db.survey.createIndex({ ratings: 1 })


db.survey.find({
	ratings: {
		$gte: 3,
		$lte: 6
	}
}).explain('executionStats')


db.survey.find({
	ratings: {
		$elemMatch: {
			$gte: 3,
			$lte: 6
		}
	}
}).explain('executionStats')

db.survey.drop()

db.survey.createIndex({ ratings: 1 })


db.survey.find({
	ratings: {
		$gte: 3,
		$lte: 6
	}
})

db.survey.find({
	ratings: {
		$elemMatch: {
			$gte: 3,
			$lte: 6
		}
	}
})

db.survey.find({
	$and: [
		{ ratings: { $not: {$lt: 3} }},
		{ ratings: { $not: {$gt: 6} }},
	]
}).explain('executionStats')

db.survey.find({
	$and: [
		{ ratings: {$elemMatch: {$gte: 3, $lte: 6}} },
		{ ratings: { $not: {$lt: 3} }},
		{ ratings: { $not: {$gt: 6} }}
	]
}).explain('executionStats')
