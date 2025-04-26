import json
from flask import Flask, render_template, request, Response
from flask_cors import CORS
import motor 

app = Flask(__name__)
CORS(app)

@app.route('/servo/', methods=['GET'])
def move():
    if request.method == 'GET':
        motor.move_default()
        return 'motor moved to default positions: 3, 12'

@app.route('/ping/', methods=['GET'])
def ping():
    if request.method == 'GET':
        return 'Raspi Pong'

@app.route('/servo/item/<item>', methods=['POST'])
def move_to_position(item):
	if request.method == 'POST':
		item = json.loads(request.data)
		item = item["data"]
		motor.move_position(item["a"], item["b"])
		return 'motor moved to position: ' + item["a"] +" "+ item["b"]

if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True, use_reloader=False, port=8084)

