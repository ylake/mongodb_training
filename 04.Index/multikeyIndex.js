use sample_weatherdata

show collections

db.data.getIndexes()

db.data.findOne()

db.data.createIndex({sections: -1})

db.data.getIndexes()

db.data.find({ sections: 'AG1' }).explain('executionStats')


use sample_training
show collections

db.grades.findOne()

db.grades.createIndex({"scores.type":1})

db.grades.getIndexes()

db.grades.find(
	{"scores.type": "exam"}
).explain('executionStats')


db.grades.dropIndex({"scores.type":1})

db.grades.getIndexes()

db.grades.createIndex(
	{class_id: 1, "scores.type": 1}
)

db.grades.find(
	{
		"scores.type": "exam",
		class_id: {
			$gte: 350
		}
	}
).explain("executionStats")
