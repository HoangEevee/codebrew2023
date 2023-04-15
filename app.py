from flask import Flask

app = Flask(__name__)

from pymongo.mongo_client import MongoClient
uri = "mongodb+srv://jbdouz:yyJmlJ1QgVyvDLVR@cluster0.urf0zci.mongodb.net/?retryWrites=true&w=majority"
# Create a new client and connect to the server
client = MongoClient(uri)
# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

db = client.codebrew2023

people = db.people
notes = db.notes


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

if __name__ == "__main__":
    app.run(port=8000, debug=True)