#!/usr/bin/python

from flask import Flask, request, jsonify
from flask_restful import Api
from flask_cors import CORS

from database  import *
from constants import *

app = Flask(__name__)
CORS(app)

api = Api(app)

def compute_payout(tot_amt_meron, tot_amt_wala):
	try:
		payout_meron = ((100-(100 * PLASADA))/tot_amt_meron) * (tot_amt_wala  - (tot_amt_wala  * PLASADA)) + 100
		payout_wala  = ((100-(100 * PLASADA))/tot_amt_wala)  * (tot_amt_meron - (tot_amt_meron * PLASADA)) + 100

		return payout_meron, payout_wala

	except:
		return 0, 0


def logger(message):
	print(message)


@app.route('/authenticate', methods=['POST'])
def validate_login():
	try:
		try:
			# API call using postman
			uname = request.form['user_name']
			pword = request.form['password']

		except:
			# API call via Angular
			uname = request.json['user_name']
			pword = request.json['password']

		db = SQLite(USER_DB)
		res = db.execute_query(GET_USER.format(uname, pword), return_one = True)

		return jsonify(res)

	except Exception as e:
		logger (str(e))
		return jsonify("Error")



@app.route('/terminate', methods=['POST'])
def terminate_login():
	try:
		try:
			# API call using PostMan
			uname = request.form['user_name']

		except:
			# API call via AngularJS
			uname = request.json['user_name']

		db = SQLite(USER_DB)
		db.execute_dml(UNLOCK_USER.format(uname))

		return 1

	except Exception as e:
		logger (str(e))
		return 0




if __name__ == '__main__':
	app.run(host="192.168.68.111")
