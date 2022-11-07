db.restaurants.find(
	{borough: "Brooklyn"}
).explain('executionStats')


db.restaurants.find(
	{borough: "Brooklyn"},
	{name: 1, borough: 1}
).sort({ name: 1 }).explain('executionStats')

db.restaurants.createIndex({ borough: -1 })

db.restaurants.find(
	{borough: "Brooklyn"},
	{name: 1, borough: 1}
).sort({ name: 1 }).explain('executionStats')

db.restaurants.createIndex(
	{ name: 1, borough: -1 }
)

db.restaurants.find(
	{borough: "Brooklyn"},
	{name: 1, borough: 1}
).sort({ name: 1 }).explain('executionStats')


db.restaurants.find(
	{borough: "Brooklyn"},
	{name: 1, borough: 1}
).sort({ name: 1 }).explain('allPlansExecution')



db.restaurants.aggregate([
	{
		$match: {borough: "Brooklyn"}
	},
	{
		$group: {
			_id: "$cuisine",
			cnt: {$sum: 1}
		}
	},
	{
		$sort: {
			name: 1
		}
	}
]).explain('executionStats')


db.restaurants.aggregate([
	{
		$match: {borough: "Brooklyn", cuisine: "American"}
	}
]).explain('executionStats')



db.restaurants.aggregate([
	{
		$group: {
			_id: {cuisine: "$cuisine", borough: "$borough"}, 
			cnt: {$sum: 1}
		}
	},
	{
        $match: {"_id.borough": "Queens"}
    },
	{
		$sort: {
			"_id.borough": 1
		}
	}
]).explain('executionStats')
