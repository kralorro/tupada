#!/usr/bin/python
from waitress import serve
from datetime import datetime
from flask import Flask, request, jsonify
from flask_restful import Api
from flask_cors import CORS
import string
import random

from database import *
from constants import *

app = Flask(__name__)
CORS(app)

api = Api(app)

def logger(message):
	print(message)


# Logic for computing the payout amount
def compute_payout(tot_amt_meron, tot_amt_wala):
	try:
		payout_meron = ((100-(100 * PLASADA))/tot_amt_meron) * (tot_amt_wala  - (tot_amt_wala  * PLASADA)) + 100
		payout_wala  = ((100-(100 * PLASADA))/tot_amt_wala)  * (tot_amt_meron - (tot_amt_meron * PLASADA)) + 100

		return payout_meron, payout_wala

	except:
		return 0, 0

# generate random string
def generate_token():
	return ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(10))


# function to place bet on any player
def insert_bet(game_id, player_code, wager_amount, teller_wager):
	try:
		today = datetime.now()
		date_1 = today.strftime("%Y-%m-%d %H:%M:%S")
		wager_date =  date_1
		wager_status = "O"
		qrcode_id = today.strftime("%Y%m%d%H%M%S")+ player_code + generate_token()

		# game_id, player_code, wager_date,wager_amount, wager_status, teller_wager, qrcode_id
		sql = PLACE_BET.format(game_id, player_code, wager_date, wager_amount, wager_status, teller_wager, qrcode_id)

		db = SQLite(MAIN_DB)
		db.execute_DML(sql)

		return qrcode_id

	except Exception as e:
		logger(str(e))
		return "Error"



# web service for placing bet
@app.route('/placebet', methods=['POST'])
def place_bet():
	try:
		try:

			# API call using postman
			username = request.form['username']
			bet_amount = request.form['bet_amount']
			game_id = request.form['game_id']
			player_code = request.form['player_code']


		except:
			# API call via Angular
			username = request.json['username']
			bet_amount = request.json['bet_amount']
			game_id = request.json['game_id']
			player_code = request.json['player_code']

		return jsonify(insert_bet(game_id, player_code, bet_amount, username))

	except Exception as e:
		logger (str(e))
		return jsonify("Error")



# web service to get aggregated data
@app.route('/getaggregates', methods=['POST'])
def get_aggregates():
	try:
		try:
			# API call using postman
			username = request.form['username']
			game_id = request.form['game_id']

		except:
			# API call via Angular
			username = request.json['username']
			game_id = request.json['game_id']

		db = SQLite(MAIN_DB)
		tot_b = db.execute_query(TOT_BETS.format(username), return_one = True)
		tot_c = db.execute_query(TOT_CASHOUT.format(username), return_one = True)

		try:
			tot_games = db.execute_query(GET_GAME_TOTALS.format(game_id))
			m_pay, w_pay = compute_payout(tot_games[0][1], tot_games[1][1])
		except:
			tot_games = [['M',0], ['W',0]]
			m_pay = 0
			w_pay = 0

		return jsonify([tot_b, tot_c, tot_games, m_pay, w_pay])

	except Exception as e:
		logger(str(e))
		return jsonify("Error")



# web service for login
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

		db = SQLite(MAIN_DB)
		res = db.execute_query(GET_USER.format(uname, pword), return_one = True)

		return jsonify(res)

	except Exception as e:
		logger (str(e))
		return jsonify("Error")



# web service for logout
@app.route('/terminate', methods=['POST'])
def terminate_login():
	try:
		try:
			# API call using PostMan
			uname = request.form['user_name']

		except:
			# API call via AngularJS
			uname = request.json['user_name']

		db = SQLite(MAIN_DB)
		db.execute_dml(UNLOCK_USER.format(uname))

		return 1

	except Exception as e:
		logger (str(e))
		return jsonify("Error")



# web service to get the active game
@app.route('/getactivegame', methods=["POST"])
def get_active_game():
	try:
		db =SQLite(MAIN_DB)

		has_active = db.execute_query(COUNT_ACTIVE, return_one=True)
		if has_active[0] == 0:
			return jsonify("No Active")

		else:
			res = db.execute_query(GET_ACTIVE, return_one=True)
			return jsonify(res)

	except Exception as e:
		logger(str(e))
		return jsonify("Error")


# web service for getting betting results
@app.route('/getbetresults', methods=["POST"])
def get_bet_results():
	try:
		try:
			# API call using PostMan
			id = request.form['id']

		except:
			# API call via AngularJS
			id = request.json['id']

		db =SQLite(MAIN_DB)
		url = BET_DETAILS.format(id)

		res = db.execute_query(url, return_one=True)

		return jsonify(res)

	except Exception as e:
		logger(str(e))
		return jsonify("Error")



if __name__ == '__main__':
	# running in waitress WSGI
	serve(app, host=HOST, port=PORT, threads=THREADS)

