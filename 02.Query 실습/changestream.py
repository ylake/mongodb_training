import pymongo
import certifi

conn = "mongodb+srv://__USER__:__PWD__@__URI__"
client = pymongo.MongoClient(conn, tlsCAFile=certifi.where())
db = client.test

pipeline = [
	{"$match": {"fullDocument.status": "argent"}}
]

stream = client.watch(pipeline=pipeline)
for document in stream:
	print(document)
