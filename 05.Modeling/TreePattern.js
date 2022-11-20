use tree

db.employees.insertMany([
	{
		_id: 1,
		name: "Eliot",
		position: "CEO"
	},
	{
		_id: 2,
		name: "Ron",
		position: "Center Lead",
		reportsTo: "Eliot"
	},
	{
		_id: 3,
		name: "Tom",
		position: "Team Lead",
		reportsTo: "Ron"
	},
	{
		_id: 4,
		name: "Bred",
		position: "Team Member",
		reportsTo: "Tom"
	},
	{
		_id: 5,
		name: "Don",
		position: "Team Member",
		reportsTo: "Tom"
	},
	{
		_id: 6,
		name: "Carl",
		position: "Team Member",
		reportsTo: "Tom"
	}
])


db.employees.aggregate([
	{
		$graphLookup: {
			from: "employees",
			startWith: "$reportsTo",
			connectFromField: "reportsTo",
			connectToField: "name",
			depthField: "depth",
			as: "reportingHierarchy"
		}
	}
])



db.products.insertMany([
	{
		_id: 0,
		name: "Yonex ezone",
		price: 300000,
		category: "Tenis Racket"
	},
	{
		_id: 1,
		name: "Samsung Gaming 24",
		price: 260000,
		category: "Gaming Monitor"
	},
])

db.categories.insertMany([
	{
		category_name: "Tenis Racket",
		ancestor_categories: [
			"Tenis",
			"Sports",
			"Outdoor"
		]
	},
	{
		category_name: "Gaming Monitor",
		ancestor_categories: [
			"Monitor",
			"Computer",
			"Electronics",
			"Home"
		]
	},
])


db.products.aggregate([
	{
		$graphLookup: {
			from: "categories",
			startWith: "$category",
			connectFromField: "ancestor_categories",
			connectToField: "category_name",
			as: "categories"
		}
	}
])



db.categories.insertMany([
	{
		category_name: "Tenis",
		ancestor_categories: [
			"Sports",
			"Outdoor"
		]
	},
	{
		category_name: "Sports",
		ancestor_categories: [
			"Sports",
		]
	},
	{
		category_name: "Outdoor",
		ancestor_categories: [
		]
	},
])


db.products.aggregate([
	{
		$graphLookup: {
			from: "categories",
			startWith: "$category",
			connectFromField: "ancestor_categories",
			connectToField: "category_name",
			as: "categories"
		}
	}
])
