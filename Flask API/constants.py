# All application related constants

MAIN_DB = "D:\\Tupada Database\\Tupada.db"

# users SQL
GET_USER    = "SELECT user_name, login_status, user_type FROM users WHERE user_name = '{}' AND password = '{}'"
LOCK_USER   = "UPDATE users SET login_status = 1 WHERE user_name = '{}'"
UNLOCK_USER = "UPDATE users SET login_status = 0 WHERE user_name = '{}'"
TOT_BETS    = "SELECT sum(wager_amount) FROM wagers WHERE teller_wager = '{}'"
TOT_CASHOUT = "SELECT sum(win_amount) FROM wagers WHERE teller_wager = '{}' AND wager_status = 'C'"

# wagers SQL
PLACE_BET = "INSERT INTO WAGERS (game_id, player_code, wager_date,wager_amount, wager_status, teller_wager, qrcode_id) VALUES ({}, '{}', '{}', {}, '{}', '{}', '{}')"


# games SQL
GET_GAME_TOTALS = "SELECT player_code, sum(wager_amount) FROM wagers WHERE game_id = {} GROUP by player_code ORDER BY player_code"


# Computation Constants
PLASADA = .05


