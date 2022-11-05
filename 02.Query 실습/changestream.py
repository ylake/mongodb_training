import pymongo
import certifi

conn = "mongodb+srv://mongodb_user:__PWD__@cluster0.v6fiw3s.mongodb.net/"
client = pymongo.MongoClient(conn, tlsCAFile=certifi.where())
db = client.test

pipeline = [
	{"$match": {"fullDocument.status": "argent"}}
]

stream = client.watch(pipeline=pipeline)
for document in stream:
	print(document)
