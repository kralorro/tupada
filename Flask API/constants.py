# All application related constants

# application constants
HOST    = "0.0.0.0"
PORT    = 5000
THREADS = 10
DISPLAY_PORT = 5100

LOG_FILE = "D:\\Tupada Logs\\Tupada.log"

# [database constants]
MAIN_DB = "D:\\Tupada Database\\Tupada.db"

# [computation constants]
PLASADA = .05

# [database queries]
# users SQL
#GET_USER    = "SELECT user_name, login_status, user_type FROM users WHERE user_name = '{}' AND password = '{}'"
GET_USER    = "SELECT user_name, login_status, user_type, password FROM users WHERE user_name = '{}'"
LOCK_USER   = "UPDATE users SET login_status = 1 WHERE user_name = '{}'"
UNLOCK_USER = "UPDATE users SET login_status = 0 WHERE user_name = '{}'"
TOT_BETS    = "SELECT sum(wager_amount) FROM wagers WHERE teller_wager = '{}'"
TOT_CASHOUT = "SELECT sum(win_amount) FROM wagers WHERE teller_cashout = '{}' AND wager_status = 'C'"

# wagers SQL
PLACE_BET = "INSERT INTO WAGERS (game_id, player_code, wager_date,wager_amount, wager_status, teller_wager, qrcode_id) VALUES ({}, '{}', '{}', {}, '{}', '{}', '{}')"
BET_DETAILS = "SELECT a.game_id, a.player_code, a.wager_amount, a.win_amount, b.game_winner, a.wager_status " \
              "FROM wagers a, games b " \
              "WHERE a.game_id = b.game_id " \
              "AND qrcode_id = '{}'"
UPDATE_CASHOUT_STATUS = "UPDATE wagers " \
                        "SET wager_status = 'C', date_last_updated = DATETIME('now'), teller_cashout = '{}' " \
                        "WHERE qrcode_id = '{}'"

# games SQL
GET_GAME_TOTALS = "SELECT player_code, sum(wager_amount) FROM wagers WHERE game_id = {} GROUP by player_code ORDER BY player_code"
GET_ACTIVE = "SELECT game_id, player_meron, player_wala FROM games WHERE game_status = 'A'"
COUNT_ACTIVE = "SELECT count(1) FROM games WHERE game_status = 'A'"



