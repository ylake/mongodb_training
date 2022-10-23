from pymongo import MongoClient
from pymongo.read_concern import ReadConcern
from pymongo.write_concern import WriteConcern

conn = "mongodb://localhost:27017,localhost:27018,localhost:27019/?readPreference=secondary"

client = MongoClient(conn)
with client.start_session(causal_consistency=True) as session:
	db = client.test
	db.sales.with_options(write_concern=WriteConcern('majority')).insert_one({
		"name": "lotion",
		"price": 20000
	})

	query_filter = {"name": "lotion"}
	res = db.sales.with_options(read_concern=ReadConcern('majority')).find_one(query_filter)
	print(res)
