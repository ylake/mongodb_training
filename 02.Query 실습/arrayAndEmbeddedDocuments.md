```javascript
db.sales.findOne({
	customer: {
		gender: 'M',
		age: 50,
		email: 'keecade@hem.uy',
		satisfaction: 5
	}
})

db.sales.findOne({
	customer: {
		satisfaction: 5,
		gender: 'M',
		age: 50,
		email: 'keecade@hem.uy',
	}
})


db.sales.findOne({
	"customer.email": "keecade@hem.uy"
})
db.sales.findOne({
	"customer.age": {$lt: 20}
})


db.inventory.insertMany([
	{ item: "journal", qty: 25, tags: ["blank", "red"], dim_cm: [ 14, 21 ] },
	{ item: "notebook", qty: 50, tags: ["red", "blank"], dim_cm: [ 14, 21 ] },
	{ item: "paper", qty: 100, tags: ["red", "blank", "plain"], dim_cm: [ 14, 21 ] },
	{ item: "planner", qty: 75, tags: ["blank", "red"], dim_cm: [ 22.85, 30 ] },
	{ item: "postcard", qty: 45, tags: ["blue"], dim_cm: [ 10, 15.25 ] },
	{ item: "postcard", qty: 45, tags: ["blue", "red"], dim_cm: [ 13, 14 ] }
]);
 
db.inventory.find({
	tags: ['red', 'blank']
})


db.inventory.find({
	tags: { $all: ['red', 'blank'] }
})

db.inventory.find({
	tags: { $in: ['red', 'blank'] }
})

db.inventory.find({
	tags: 'blue'
})

db.inventory.find({
	dim_cm: {$gt: 15}
})

db.inventory.find({
	dim_cm: {$gt: 15, $lt: 20}
})

db.inventory.find({
	dim_cm: {$elemMatch: {$gt: 15, $lt: 20}}
})

db.inventory.find({
	"dim_cm.1": {$lt: 20}
})

db.inventory.find({
	tags: {$size: 3}
})


db.sales.find({
	"items.name": 'binder',
	"items.quantity": {$lte: 6}
})

db.sales.find({
	items: {
		$elemMatch: {
			name: "binder",
			quantity: {$lte: 6}
		}
	}
})

db.sales.find(
	{
		items: {
			$elemMatch: {
				name: "binder",
				quantity: {$lte: 6}
			}
		}
	},
	{
		saleDate: 1,
		"items.$": 1,
		storeLocation: 1,
		customer: 1
	}
)



db.students.insertMany([
	{_id: 1, grades: [85, 80, 80]},
	{_id: 2, grades: [88, 90, 92]},
	{_id: 3, grades: [85, 100, 90]}
])

db.students.updateOne(
	{ _id: 1, grades: 80 },
	{$set: {"grades.$": 82}}
)

db.students.updateMany(
	{},
	{$inc: {"grades.$[]": 10}}
)


db.students.insertMany([
	{
		_id: 4,
		grades: [
			{ grade: 80, mean: 75, std: 8 },
			{ grade: 85, mean: 90, std: 5 },
			{ grade: 85, mean: 85, std: 8 },
		]
	}
])


db.students.updateOne(
	{ _id: 4, "grades.grade": 85 },
	{$set: {"grades.$.std": 6}}
)

db.students.updateOne(
	{ _id: 4, grades: {$elemMatch: {grade: {$gte: 85}}} },
	{$set: {"grades.$[].grade": 100}}
)


db.students.insertMany([
	{
		_id: 6,
		grades: [
			{ grade: 90, mean: 75, std: 8 },
			{ grade: 87, mean: 90, std: 6 },
			{ grade: 85, mean: 85, std: 8 },
		]
	}
])

db.students.updateMany(
	{ _id: 6 },
	{ $set: {"grades.$[element].grade": 100}},
	{ arrayFilters: [{"element.grade": {$gte: 87}}] }
)


db.students.insertOne(
	{
		_id: 7,
	grades : [
		{ type: "quiz", questions: [ 10, 8, 5 ] },
		{ type: "quiz", questions: [ 8, 9, 6 ] },
		{ type: "hw", questions: [ 5, 4, 3 ] },
		{ type: "exam", questions: [ 25, 10, 23, 0 ] },
	]
	}
)

db.students.updateOne(
	{ _id: 7 },
	{ $inc: { "grades.$[].questions.$[score]": 2 } },
	{arrayFilters: [{score: {$gte: 8}}]}
)


db.shopping.insertMany([
	{
		_id: 1,
		cart: ['bannana', 'cheeze', 'milk'],
		coupons: ['10%', '20%', '30%']
	},
	{
		_id: 2,
		cart: [],
		coupons: []
	}
])


db.shopping.updateOne(
	{ _id: 1 },
	{$addToSet: {cart: 'beer'}}
)

db.shopping.updateOne(
	{ _id: 1 },
	{$addToSet: {cart: ['beer', 'candy']}}
)

db.shopping.updateOne(
	{ _id: 1 },
	{ $addToSet: { cart: { $each: ['beer', 'candy'] } } }
)

db.shopping.updateOne(
	{ _id: 1 },
	{$pull: {cart: 'beer'}}
)

db.shopping.updateOne(
	{ _id: 1 },
	{$pull: {cart: {$in: [['beer', 'candy'], 'milk']}}}
)


db.shopping.updateOne(
	{ _id: 1 },
	{$pop: {cart: -1}}
)


db.shopping.updateOne(
	{ _id: 1 },
	{$pop: {cart: 1, coupons: -1}}
)


db.shopping.updateOne(
	{ _id: 1 },
	{$push: {cart: 'popcorn'}}
)

db.shopping.updateOne(
	{ _id: 1 },
	{ $push: { coupons: { $each: ['25%', '35%'] } } }
)

db.shopping.updateMany(
	{},
	{
		$push: {
			coupons: {
				$each: ['90%', '70%'],
				$position: 0
			}
		}
	}
)

db.shopping.updateMany(
	{},
	{
		$push: {
			coupons: {
				$each: ['15%', '20%'],
				$position: 0,
				$slice: 5
			}
		}
	}
)

db.shopping.updateMany(
	{},
	{
		$push: {
			coupons: {
				$each: ['90%', '99%'],
				$position: -1,
				$sort: -1,
				$slice: 5
			}
		}
	}
)
```
