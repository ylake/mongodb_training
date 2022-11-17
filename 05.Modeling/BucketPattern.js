const addMinutes = (min, date) => {
	date.setMinutes(date.getMinutes() + min)
	return new Date(date.getTime())
}

const getRandomNumber = (min, max) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

arr = [];
date = new Date("2022-01-01T00:00:00.000Z");
for (range = 0; range < 60 * 24 * 30; range++){
	time = addMinutes(1, date)
	for (floor = 1; floor < 21; floor++){
		arr.push({
			sensor_id: floor,
			timestamp: time,
			temparature: getRandomNumber(17, 30)
		})
	}
}

db.sensor1.insertMany(arr)


db.sensor1.stats().size / 1024 / 1024


arr = [];
date = new Date("2022-01-01T00:00:00.000Z");
for (hour = 0; hour < 24 * 30; hour++)  {
	start_date = addMinutes(0, date)
	measurement = []
	for (sec = 0; sec < 60; sec++){
		time = addMinutes(1, date)
		measurement.push({
			timestamp: time,
			temparature: 0
		})
	}
	for (floor = 1; floor < 21; floor++){
		for (i = 0; i < 60; i++){
			measurement[i].temparature = getRandomNumber(17, 30)
		}
		arr.push({
			sensor_id: floor,
			start_date: start_date,
			end_date: addMinutes(0, date),
			measurements: measurement
		})
	}
}

db.sensor2.insertMany(arr)

db.sensor1.stats().size / 1024 / 1024
db.sensor2.stats().size / 1024 / 1024


db.createCollection(
	"sensor3",
	{
		timeseries: {
			timeField: "timestamp",
			metaField: "metadata",
			granularity: "minutes"
		}
	}
)


arr = [];
date = new Date("2022-01-01T00:00:00.000Z");
for (range = 0; range < 60 * 24 * 30; range++){
	time = addMinutes(1, date)
	for (floor = 1; floor < 21; floor++){
		arr.push({
			timestamp: time,
			metadata: {
				sensor_id: floor,
				temparature: getRandomNumber(17, 30)
			}
		})
	}
}

db.sensor3.insertMany(arr)


db.sensor1.stats().size / 1024 / 1024
db.sensor2.stats().size / 1024 / 1024
db.sensor3.stats().size / 1024 / 1024
