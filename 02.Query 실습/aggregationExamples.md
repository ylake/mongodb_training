```javascript
db.orders.insertMany( [
	{ _id: 0, name: "Pepperoni", size: "small", price: 19,
	  quantity: 10, date: ISODate( "2021-03-13T08:14:30Z" ) },
	{ _id: 1, name: "Pepperoni", size: "medium", price: 20,
	  quantity: 20, date : ISODate( "2021-03-13T09:13:24Z" ) },
	{ _id: 2, name: "Pepperoni", size: "large", price: 21,
	  quantity: 30, date : ISODate( "2021-03-17T09:22:12Z" ) },
	{ _id: 3, name: "Cheese", size: "small", price: 12,
	  quantity: 15, date : ISODate( "2021-03-13T11:21:39.736Z" ) },
	{ _id: 4, name: "Cheese", size: "medium", price: 13,
	  quantity:50, date : ISODate( "2022-01-12T21:23:13.331Z" ) },
	{ _id: 5, name: "Cheese", size: "large", price: 14,
	  quantity: 10, date : ISODate( "2022-01-12T05:08:13Z" ) },
	{ _id: 6, name: "Vegan", size: "small", price: 17,
	  quantity: 10, date : ISODate( "2021-01-13T05:08:13Z" ) },
	{ _id: 7, name: "Vegan", size: "medium", price: 18,
	  quantity: 10, date : ISODate( "2021-01-13T05:10:13Z" ) }
])
 
db.orders.aggregate([
	{
		$match: {
			 size: "medium"
		 }
	},
	{
		$group: {
			_id: { $getField: "name" },
			totalQuantity: {
				$sum: {$getField: "quantity"}
			}
		}
	}
 ])


 db.orders.aggregate([
	{
		$match: {
			 size: "medium"
		 }
	},
	{
		$group: {
			_id: "$name",
			totalQuantity: {
				$sum: "$quantity"
			}
		}
	}
 ])


db.orders.aggregate([
	{
		$match: {
			date: {
				$gte: new ISODate("2020-01-30"),
				$lt: new ISODate("2022-01-30")
			 }
		 }
	},
	{
		$group: {
			_id: {
				$dateToString: {
					format: "%Y-%m-%d", date: "$date"
				}
			},
			totalOrderVaule: {
				$sum: {
					$multiply: ["$price", "$quantity"]
				}
			},
			averageOrderQuantity: {
				$avg: "$quantity"
			}
		}	 
	},
	{
		$sort: {
			totalOrderVaule: -1
		}
	}
 ])


 db.books.insertMany([
	{ "_id" : 8751, "title" : "The Banquet", "author" : "Dante", "copies" : 2 },
	{ "_id" : 8752, "title" : "Divine Comedy", "author" : "Dante", "copies" : 1 },
	{ "_id" : 8645, "title" : "Eclogues", "author" : "Dante", "copies" : 2 },
	{ "_id" : 7000, "title" : "The Odyssey", "author" : "Homer", "copies" : 10 },
	{ "_id" : 7020, "title" : "Iliad", "author" : "Homer", "copies" : 10 }
 ])

db.books.aggregate([
	{
		$group: {
			_id: "$author",
			books: {
				$push: "$title"
			}
		}
	}
])


db.books.aggregate([
	{
		$group: {
			_id: "$author",
			books: {
				$push: "$$ROOT"
			},
			totalCopies: {
				$sum: "$copies"
			}
		}
	}
])


db.books.aggregate([
	{
		$group: {
			_id: "$author",
			books: {
				$push: "$$ROOT"
			}
		}
	},
	{
		$addFields: {
			totalCopies : {$sum: "$books.copies"}
		}
	}
])


db.orders.drop()

db.orders.insertMany([
    { "productId" : 1,   "price" : 12,   },
    { "productId" : 2,   "price" : 20,   },
    { "productId" : 3,   "price" : 80,   }
])

 
db.products.insertMany([
    { "id" : 1,  "instock" : 120 },  
    { "id" : 2,  "instock" : 80  }, 
    { "id" : 3,  "instock" : 60  }, 
    { "id" : 4,  "instock" : 70  }
])


db.orders.aggregate([
	{
		$lookup: {
			from: 'products',
			localField: 'productId',
			foreignField: 'id',
			as: 'data'
		}
	},
	{
		$match: {
			$expr: {
				$lt: ['$data.instock', '$price']
			}
		}
	}
])

db.orders.aggregate([
	{
		$lookup: {
			from: 'products',
			localField: 'productId',
			foreignField: 'id',
			as: 'data'
		}
	},
	{
		$match: {
			$expr: {
				$lt: ['$data.instock', '$price']
			}
		}
	}
])


db.orders.aggregate([
	{
		$lookup: {
			from: 'products',
			localField: 'productId',
			foreignField: 'id',
			as: 'data'
		}
	},
	{
		$unwind: '$data'
	},
	{
		$match: {
			$expr: {
				$lt: ['$data.instock', '$price']
			}
		}
	}
])

db.orders.aggregate([
	{
		$lookup: {
			from: 'products',
			localField: 'productId',
			foreignField: 'id',
			as: 'data'
		}
	},
	{
		$unwind: '$data'
	},
	{
		$match: {
			$expr: {
				$gt: ['$data.instock', '$price']
			}
		}
	}
])

db.orders.aggregate([
	{
		$lookup: {
			from: 'products',
			localField: 'productId',
			foreignField: 'id',
			as: 'data'
		}
	},
	{
		$unwind: '$data'
	}
])


db.books.aggregate([
	{
		$group: {
			_id: "$author",
			books: {
				$push: "$$ROOT"
			}
		}
	},
	{
		$addFields: {
			totalCopies : {$sum: "$books.copies"}
		}
	},
	{
		$unwind: '$books'
	}
])


db.listingsAndReviews.aggregate([
	{
		$sample: {size: 3}
	},
	{
		$project: {
			name: 1,
			summary: 1
		}
	}
])


db.listingsAndReviews.aggregate([
	{
		$match: {
			property_type: "Apartment"
		}
	},
	{
		$sort: {
			number_of_reviews: -1
		}
	},
	{
		$skip: 0
	},
	{
		$limit: 5
	},
	{
		$project: {
			name: 1,
			number_of_reviews: 1
		}
	}
])

db.listingsAndReviews.aggregate([
	{
		$match: {
			property_type: "Apartment"
		}
	},
	{
		$sort: {
			number_of_reviews: -1
		}
	},
	{
		$skip: 5
	},
	{
		$limit: 5
	},
	{
		$project: {
			name: 1,
			number_of_reviews: 1
		}
	}
])

db.books.aggregate([
	{
		$group: {
			_id: "$author",
			books: {$push: "$title"}
		}
	},
	{
		$out: "authors"
	}
])
```
