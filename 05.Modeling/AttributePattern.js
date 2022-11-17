db.users.insertOne({
	_id: "tom",
	joinDate: new Date(),
	server: "Sevilla",
	job: "merchant",
	logInfo: []
})

log = {
	loginTime: new Date(),
	visits: [],
	sails: [],
	trades: [],
	battles: [],
	quests: [],
	fishings: [],
	gambles: [],
	castings: [],
	farmings: []
}

log.visits.push({
	location: "Barcelona",
	time: new Date()
})
log.visits.push({
	location: "Sevilla",
	time: new Date()
})
log.visits.push({
	location: "London",
	time: new Date()
})

log.trades.push({
	item: "Musket",
	qty: 50,
	price: 1800
})
log.trades.push({
	item: "Musket",
	qty: -50,
	price: 2300
})

log.quests.push({
	name: "Cave Invenstigation",
	reward: 50000
})

db.users.updateOne(
	{ _id: "tom" },
	{
		$addToSet: {
			logInfo: log
		}
	}
)

db.users.find()
db.users.drop()

log.user = "tom"
log.logoutTime = new Date()
db.logs.insertOne(log)

db.logs.find()
db.logs.drop()




date = new Date()
log = {
	user: 'tom',
	loginTime: date,
	logoutTime: new Date(),
	actions: [
		{ action: "visit", value: "Barcelona", time: date },
		{ action: "visit", value: "Sevilla", time: date },
		{ action: "visit", value: "London", time: date },
		{ action: "trade", value: "Musket", type: "buy", qty: 50, price: 1800 },
		{ action: "trade", value: "Musket", type: "sell", qty: 50, price: 2300 },
		{ action: "quest", value: "Cave Investigation", reward: 50000, status: "In Progress" }
	]
}

db.logs.insertOne(log);
db.logs.find()

db.logs.createIndex({"actions.action": 1, "actions.value": 1})
