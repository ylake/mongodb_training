db.cafe.insertMany([
	{
		_id: 1,
		name: "IT Community",
		desc: "A Cafe where developer's share information.",
		created_at: ISODate("2018-08-09"),
		last_article: ISODate("2022-06-01T10:56:32.000Z"),
		level: 5,
		members: [
			{
				id: "tom93",
				first_name: "Tom",
				last_name: "Park",
				phone: "000-0000-1234",
				joined_at: ISODate("2018-09-12"),
				job: "DBA"
			},
			{
				id: "asddwd12",
				first_name: "Jenny",
				last_name: "Kim",
				phone: "000-0000-1111",
				joined_at: ISODate("2018-10-02"),
				job: "Frontend Dev"
			},
			{
				id: "candy12",
				first_name: "Zen",
				last_name: "Ko",
				phone: "000-0000-1233",
				joined_at: ISODate("2019-01-01"),
				job: "DA"
			}
		]
	},
	{
		_id: 2,
		name: "Game Community",
		desc: "Share information about games.",
		created_at: ISODate("2020-01-23"),
		last_article: ISODate("2022-06-02T10:56:32.000Z"),
		level: 4,
		members: [
			{
				id: "tom93",
				first_name: "Tom",
				last_name: "Park",
				phone: "000-0000-1234",
				joined_at: ISODate("2020-09-12"),
				job: "DBA"
			},
			{
				id: "asddwd12",
				first_name: "Jenny",
				last_name: "Kim",
				phone: "000-0000-1111",
				joined_at: ISODate("2021-10-01"),
				job: "Frontend Dev"
			},
			{
				id: "java1",
				first_name: "Kevin",
				last_name: "Shin",
				phone: "000-0000-1133",
				joined_at: ISODate("2022-08-10"),
				job: "Game Dev"
			}
		]
	},
]);



const generateRandomString = (num) => {
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
	let result = '';
	const charactersLength = characters.length;
	for (let i = 0; i < num; i++){
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

jobs = ["DBA", "SE", "DA", "FE", "BE"];
jobs[Math.floor(Math.random()* jobs.length)]

date = new Date();
new Date(date - Math.floor(Math.random() * 10000000000))

arr = [];
for (i = 0; i < 100000; i++){
	document = {
		id: generateRandomString(5),
		first_name: generateRandomString(10),
		last_name: generateRandomString(15),
		phone: "000-0000-1234",
		joined_at: new Date(date - Math.floor(Math.random() * 10000000000)),
		job: jobs[Math.floor(Math.random()* jobs.length)]
	}
	arr.push(document)
}


db.cafe.updateOne(
	{ _id: 2 },
	{
		$addToSet: {
			members: {$each: arr}
		}
	}
)

db.cafe.stats().size / 1024 / 1024

db.cafe.aggregate([
	{
		$project: {
			arrSize: {
				$size: "$members"
			}
		}
	}
])


db.members.insertMany([
	{
		id: "tom93",
		first_name: "Tom",
		last_name: "Park",
		phone: "000-0000-1234",
		job: "DBA",
		joined_cafes: [
			{
				_id: 1,
				name: "IT Community",
				desc: "A Cafe where developer's share information.",
				created_at: ISODate("2018-08-09"),
				last_article: ISODate("2022-06-01T10:56:32.000Z"),
				level: 5,
				joined_at: ISODate("2018-09-12")
			},
			{
				_id: 2,
				name: "Game Community",
				desc: "Share information about games.",
				created_at: ISODate("2020-01-23"),
				last_article: ISODate("2022-06-02T10:56:32.000Z"),
				level: 4,
				joined_at: ISODate("2020-09-12")
			}
		]
	},
	{
		id: "asddwd12",
		first_name: "Jenny",
		last_name: "Kim",
		phone: "000-0000-1111",
		job: "Frontend Dev",
		joined_cafes: [
			{
				_id: 1,
				name: "IT Community",
				desc: "A Cafe where developer's share information.",
				created_at: ISODate("2018-08-09"),
				last_article: ISODate("2022-06-01T10:56:32.000Z"),
				level: 5,
				joined_at: ISODate("2018-10-02"),
			},
			{
				_id: 2,
				name: "Game Community",
				desc: "Share information about games.",
				created_at: ISODate("2020-01-23"),
				last_article: ISODate("2022-06-02T10:56:32.000Z"),
				level: 4,
				joined_at: ISODate("2021-10-01")
			}
		]
	},
	{
		id: "candy12",
		first_name: "Zen",
		last_name: "Ko",
		phone: "000-0000-1233",
		job: "DA",
		joined_cafes: [
			{
				_id: 1,
				name: "IT Community",
				desc: "A Cafe where developer's share information.",
				created_at: ISODate("2018-08-09"),
				last_article: ISODate("2022-06-01T10:56:32.000Z"),
				level: 5,
				joined_at: ISODate("2019-01-01")
			}
		]
	},
	{
		id: "java1",
		first_name: "Kevin",
		last_name: "Shin",
		phone: "000-0000-1133",
		job: "Game Dev",
		joined_cafes: [
			{
				_id: 2,
				name: "Game Community",
				desc: "Share information about games.",
				created_at: ISODate("2020-01-23"),
				last_article: ISODate("2022-06-02T10:56:32.000Z"),
				level: 4,
				joined_at: ISODate("2022-08-10")
			}
		]
	}
])



arr = [];
for (i = 0; i < 300000; i++){
	document = {
		id: generateRandomString(5),
		first_name: generateRandomString(10),
		last_name: generateRandomString(15),
		phone: "000-0000-1234",
		job: jobs[Math.floor(Math.random() * jobs.length)],
		joined_cafes: [
			{
				_id: 2,
				name: 'Game Community',
				desc: 'Share information about games.',
				created_at: ISODate("2020-01-23T00:00:00.000Z"),
				last_article: ISODate("2022-06-02T10:56:32.000Z"),
				level: 4,
				joined_at: new Date(date - Math.floor(Math.random() * 10000000000)),
			}
		]
	}
	arr.push(document)
}

db.members.insertMany(arr)


date = new Date()
db.cafe.updateOne(
	{ _id: 1 },
	{$set: {last_article: date}}
)

db.cafe.updateOne(
	{ _id: 2 },
	{$set: {last_article: date}}
)

db.members.updateMany(
	{
		"joined_cafes._id": 1
	},
	{
		$set: {
			"joined_cafes.$.last_article": date
		}
	}
)


db.members.updateMany(
	{
		"joined_cafes._id": 2
	},
	{
		$set: {
			"joined_cafes.$.last_article": date
		}
	}
)

db.cafe.deleteMany({})
db.members.deleteMany({})




db.cafe.insertMany([
	{
		_id: 1,
		name: "IT Community",
		desc: "A Cafe where developer's share information.",
		created_at: ISODate("2018-08-09"),
		last_article: ISODate("2022-06-01T10:56:32.000Z"),
		level: 5
	},
	{
		_id: 2,
		name: "Game Community",
		desc: "Share information about games.",
		created_at: ISODate("2020-01-23"),
		last_article: ISODate("2022-06-02T10:56:32.000Z"),
		level: 4
	},
]);



db.members.insertMany([
	{
		id: "tom93",
		first_name: "Tom",
		last_name: "Park",
		phone: "000-0000-1234",
		job: "DBA",
		joined_cafes: [1, 2]
	},
	{
		id: "asddwd12",
		first_name: "Jenny",
		last_name: "Kim",
		phone: "000-0000-1111",
		job: "Frontend Dev",
		joined_cafes: [1,2]
	},
	{
		id: "candy12",
		first_name: "Zen",
		last_name: "Ko",
		phone: "000-0000-1233",
		job: "DA",
		joined_cafes: [1]
	},
	{
		id: "java1",
		first_name: "Kevin",
		last_name: "Shin",
		phone: "000-0000-1133",
		job: "Game Dev",
		joined_cafes: [2]
	}
])

db.cafe.aggregate([
	{
		$lookup: {
			from: "members",
			localField: "_id",
			foreignField: "joined_cafes",
			as: "members",
			pipeline: [
				{
					$match: {
						job: "DBA"
					}
				},
				{
					$project: {
						_id: 0,
						id: 1,
						job: 1
					}
				}
			]
		}
	},
	{
		$project: {
			name: 1,
			desc: 1,
			created_at: 1,
			joinedMemberJob: {
				$first: "$members.job"
			},
			cnt: {
				$size: "$members"
			}
		}
	}
])


arr = [];
for (i = 0; i < 300000; i++){
	document = {
		id: generateRandomString(5),
		first_name: generateRandomString(10),
		last_name: generateRandomString(15),
		phone: "000-0000-1234",
		job: jobs[Math.floor(Math.random() * jobs.length)],
		joined_cafes: [2]
	}
	arr.push(document)
}

db.members.insertMany(arr)


db.cafe.aggregate([
	{
		$lookup: {
			from: "members",
			localField: "_id",
			foreignField: "joined_cafes",
			as: "members",
			pipeline: [
				{
					$match: {
						job: "DBA"
					}
				},
				{
					$project: {
						_id: 0,
						id: 1,
						job: 1
					}
				}
			]
		}
	},
	{
		$project: {
			name: 1,
			desc: 1,
			created_at: 1,
			joinedMemberJob: {
				$first: "$members.job"
			},
			cnt: {
				$size: "$members"
			}
		}
	}
]).explain('executionStats')


db.members.createIndex({ "joined_cafes": 1 })


db.cafe.aggregate([
	{
		$lookup: {
			from: "members",
			localField: "_id",
			foreignField: "joined_cafes",
			as: "members",
			pipeline: [
				{
					$match: {
						job: "DBA"
					}
				},
				{
					$project: {
						_id: 0,
						id: 1,
						job: 1
					}
				}
			]
		}
	},
	{
		$project: {
			name: 1,
			desc: 1,
			created_at: 1,
			joinedMemberJob: {
				$first: "$members.job"
			},
			cnt: {
				$size: "$members"
			}
		}
	}
]).explain('executionStats')



db.cafe.deleteMany({})
db.members.deleteMany({})
	



db.cafe.insertMany([
	{
		_id: 1,
		name: "IT Community",
		desc: "A Cafe where developer's share information.",
		created_at: ISODate("2018-08-09"),
		last_article: ISODate("2022-06-01T10:56:32.000Z"),
		level: 5
	},
	{
		_id: 2,
		name: "Game Community",
		desc: "Share information about games.",
		created_at: ISODate("2020-01-23"),
		last_article: ISODate("2022-06-02T10:56:32.000Z"),
		level: 4
	},
]);



db.members.insertMany([
	{
		id: "tom93",
		first_name: "Tom",
		last_name: "Park",
		phone: "000-0000-1234",
		job: "DBA",
		joined_cafes: [
			{
				_id: 1,
				name: "IT Community",
				desc: "A Cafe where developer's share information.",
				created_at: ISODate("2018-08-09"),
			},
			{
				_id: 2,
				name: "Game Community",
				desc: "Share information about games.",
				created_at: ISODate("2020-01-23"),
			}
		]
	},
	{
		id: "asddwd12",
		first_name: "Jenny",
		last_name: "Kim",
		phone: "000-0000-1111",
		job: "Frontend Dev",
		joined_cafes: [
			{
				_id: 1,
				name: "IT Community",
				desc: "A Cafe where developer's share information.",
				created_at: ISODate("2018-08-09"),
			},
			{
				_id: 2,
				name: "Game Community",
				desc: "Share information about games.",
				created_at: ISODate("2020-01-23"),
			}
		]
	},
	{
		id: "candy12",
		first_name: "Zen",
		last_name: "Ko",
		phone: "000-0000-1233",
		job: "DA",
		joined_cafes: [
			{
				_id: 1,
				name: "IT Community",
				desc: "A Cafe where developer's share information.",
				created_at: ISODate("2018-08-09"),
			}
		]
	},
	{
		id: "java1",
		first_name: "Kevin",
		last_name: "Shin",
		phone: "000-0000-1133",
		job: "Game Dev",
		joined_cafes: [
			{
				_id: 2,
				name: "Game Community",
				desc: "Share information about games.",
				created_at: ISODate("2020-01-23"),
			}
		]
	}
])


arr = [];
for (i = 0; i < 300000; i++){
	document = {
		id: generateRandomString(5),
		first_name: generateRandomString(10),
		last_name: generateRandomString(15),
		phone: "000-0000-1234",
		job: jobs[Math.floor(Math.random() * jobs.length)],
		joined_cafes: [
			{
				_id: 2,
				name: 'Game Community',
				desc: 'Share information about games.',
				created_at: ISODate("2020-01-23T00:00:00.000Z"),
			}
		]
	}
	arr.push(document)
}

db.members.insertMany(arr)

db.members.aggregate([
	{
		$match: {
			job: "DBA"
		}
	},
	{
		$unwind: "$joined_cafes"
	},
	{
		$group: {
			_id: "$joined_cafes._id",
			joined_cafes: {
				$first: "$joined_cafes"
			},
			joinedMemberJob: {
				$first: "$job"
			},
			cnt: {
				$sum: 1
			}
		}
	},
	{
		$project: {
			_id: 0,
			name: "$joined_cafes.name",
			desc: "$joined_cafes.desc",
			create_at: "$joined_cafes.created_at",
			joinedMemberJob: 1,
			cnt: 1
		}
	}
]).explain('executionStats')


db.members.createIndex({job: 1})
