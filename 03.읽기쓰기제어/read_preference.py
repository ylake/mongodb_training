from pymongo import MongoClient
from pymongo.read_preferences import ReadPreference
import certifi

conn = "mongodb+srv://__USER__:__PWD__@__ENDPOINT__/"
# conn = "mongodb+srv://__USER__:__PWD__@__ENDPOINT__/?readPreference=secondary"
client = MongoClient(conn, tlsCAFile=certifi.where())
db = client.test

db.fruits.insert_many([
	{
		"name": "melon",
		"qty": 1000,
		"price": 16000
	},
	{
		"name": "starberry",
		"qty": 100,
		"price": 10000
	},
	{
		"name": "grape",
		"qty": 1500,
		"price": 5000
	},
])

query_filter = {"name": "melon"}
while True:
	res = db.fruits.with_options(read_preference=ReadPreference.SECONDARY).find_one(query_filter)
	# res = db.fruits.find_one(query_filter)
	print(res)
