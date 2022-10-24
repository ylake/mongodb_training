from pymongo import MongoClient
from pymongo.read_concern import ReadConcern
from pymongo.write_concern import WriteConcern
import certifi

conn = "mongodb+srv://mongodb_user:__PWD__@cluster0.v6fiw3s.mongodb.net/"
client = MongoClient(conn, tlsCAFile=certifi.where())

# client.test.orders.drop()
# client.test.inventory.drop()
# client.test.inventory.insert_one({"name": "pencil", "qty": 1000})

def callback(session):
	orders = session.client.test.orders
	inventory = session.client.test.inventory
	order = 200

	orders.insert_one(
		{"name": "pencil", "qty": order}, 
		session=session
	)
	inventory.update_one(
		{
			"name": "pencil",
			"qty": {"$gte": order}
		},
		{"$inc": {"qty": order * -1}},
		session=session
	)

with client.start_session() as session:
	session.with_transaction(callback, read_concern=ReadConcern('majority'), write_concern=WriteConcern('majority'))
	print(session.client.test.orders.find_one({"name": "pencil"}))
	print(session.client.test.inventory.find_one({"name": "pencil"}))
