db.grids.insertMany([
	{
		_id: 1,
		loc: [0,0]
	},
	{
		_id: 2,
		loc: [3,4]
	},
	{
		_id: 3,
		loc: [15,2]
	},
	{
		_id: 4,
		loc: [7,8]
	},
	{
		_id: 5,
		loc: {
			type: "Point",
			coordinates: [5,5]
		}
	},
	{
		_id: 6,
		loc: {
			type: "Point",
			coordinates: [14,8]
		}
	},
	{
		_id: 7,
		loc: {
			type: "LineString",
			coordinates: [
				[6, 6],
				[15,13]
			]
		}
	},
	{
		_id: 8,
		loc: {
			type: "LineString",
			coordinates: [
				[0, 12],
				[5,12]
			]
		}
	},
	{
		_id: 9,
		loc: {
			type: "Polygon",
			coordinates: [
				[
					[2, 2],
					[3,3],
					[4,2],
					[2,2]
				]
			]
		}
	},
	{
		_id: 10,
		loc: {
			type: "Polygon",
			coordinates: [
				[
					[9, 0],
					[5,13],
					[14,6],
					[9,0]
				]
			]
		}
	},
])

db.grids.find({
	loc: {
		$geoIntersects: {
			$geometry: {
				type: "Polygon",
				coordinates: [
					[
						[0,0],
						[10,0],
						[10,10],
						[0,10],
						[0,0],
					]
				]
			}
		}
	}
})

db.grids.find({
	loc: {
		$geoWithin: {
			$geometry: {
				type: "Polygon",
				coordinates: [
					[
						[0,0],
						[10,0],
						[10,10],
						[0,10],
						[0,0],
					]
				]
			}
		}
	}
})

db.grids.find({
	loc: {
		$near: {
			$geometry: {
				type: "Point",
				coordinates: [5, 5]
			},
			$maxDistance: 1000000000
		}
	}
})

db.grids.createIndex({loc: "2d"})
db.grids.createIndex({loc: "2dsphere"})

db.grids.drop()


db.grids.insertMany([
	{
		_id: 1,
		loc: [0,0]
	},
	{
		_id: 2,
		loc: [3,4]
	},
	{
		_id: 3,
		loc: [15,2]
	},
	{
		_id: 4,
		loc: [7,8]
	},
])


db.grids.find({
	loc: {
		$near: [5,5],
		$maxDistance: 10
	}
})

// 음식점이 있는 동네
var restaurant = db.restaurants.findOne()
db.neighborhoods.find(
	{
		geometry: {
			$geoIntersects: {
				$geometry: {
					type: "Point",
					coordinates: restaurant.address.coord
				}
			}
		}
	},
	{
		name: 1
	}
)

var neighborhood = db.neighborhoods.findOne()
db.restaurants.find(
	{
		"address.coord": {
			$geoWithin: {
				$geometry: neighborhood.geometry
			}
		}
	},
	{
		name: 1, _id: 0
	}
)

db.restaurants.createIndex({"address.coord": "2dsphere"})

db.restaurants.aggregate([
	{
		$geoNear: {
			near: {
				type: "Point",
				coordinates: [ -73.8845166, 40.744772 ]
			},
			key: "address.coord",
			maxDistance: 3000,
			query: {
				cuisine: "Hamburgers"
			},
			distanceField: "dist"
		}
	},
	{
		$project: {
			name: 1,
			cuisine: 1,
			dist: 1
		}
	},
	{
		$count: "cnt"
	}
])
