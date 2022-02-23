#!/usr/bin/python
from waitress import serve
from datetime import datetime
from flask import Flask, request, jsonify
from flask_restful import Api
from flask_cors import CORS

import time
import sys

import logging
import logging.handlers

from database import *
from constants import *

app = Flask(__name__)
CORS(app)

api = Api(app)

# initialize logger instance
try:
	log_file = LOG_FILE

	logger  = logging.getLogger('LOG')
	logger.setLevel(logging.INFO)
	rfh = logging.handlers.TimedRotatingFileHandler(filename=log_file, when='midnight')
	fmtr = logging.Formatter('%(asctime)s | %(message)s')
	rfh.setFormatter(fmtr)
	logger.addHandler(rfh)

except Exception as e:
	print('ERROR: Failed to initialize transaction logger. ' + str(e))
	sys.exit(1)



# Logic for computing the payout amount
def compute_payout(tot_amt_meron, tot_amt_wala):
	try:
		payout_meron = ((100-(100 * PLASADA))/tot_amt_meron) * (tot_amt_wala  - (tot_amt_wala  * PLASADA)) + 100
		payout_wala  = ((100-(100 * PLASADA))/tot_amt_wala)  * (tot_amt_meron - (tot_amt_meron * PLASADA)) + 100

		return payout_meron, payout_wala

	except:
		return 0, 0


# web service to get the active game
@app.route('/getactivegame', methods=["POST"])
def get_active_game():
	try:
		db = SQLite(MAIN_DB)

		has_active = db.execute_query(COUNT_ACTIVE, return_one=True)
		if has_active[0] == 0:
			return jsonify("No Active")

		else:
			res = db.execute_query(GET_ACTIVE, return_one=True)
			return jsonify(res)

	except Exception as e:
		logger.error(str(e))
		return jsonify("Error")



@app.route('/getaggregates', methods=['POST'])
def get_aggregates():
	try:
		try:
			# API call using postman
			game_id = request.form['game_id']

		except:
			# API call via Angular
			game_id = request.json['game_id']

		db = SQLite(MAIN_DB)

		try:
			tot_games = db.execute_query(GET_GAME_TOTALS.format(game_id))
			m_pay, w_pay = compute_payout(tot_games[0][1], tot_games[1][1])
		except:
			tot_games = [['M',0], ['W',0]]
			m_pay = 0
			w_pay = 0

		return jsonify([tot_games, m_pay, w_pay])

	except Exception as e:
		logger.error(str(e))
		return jsonify("Error")



@app.route('/getalastnextgames', methods=['POST'])
def	get_last_next_ten_games():
	try:
		db = SQLite(MAIN_DB)
		last_10 = db.execute_query(GET_LAST_10_GAMES)
		next_10 = db.execute_query(GET_NEXT_10_GAMES)

		return jsonify([last_10, next_10])

	except Exception as e:
		logger.error(str(e))
		return jsonify("Error")



if __name__ == '__main__':
	#app.run(host=HOST, port=DISPLAY_PORT)
	# running in waitress WSGI
	print("running web service interface on WSGI...")
	time.sleep(2)
	print("service listening at http://{}:{}".format(HOST, DISPLAY_PORT))
	serve(app, host=HOST, port=DISPLAY_PORT, threads=THREADS)
