# All application related constants

MAIN_DB = "D:\\Tupada Database\\Tupada.db"

# users SQL
GET_USER    = "SELECT user_name, login_status, user_type FROM users WHERE user_name = '{}' AND password = '{}'"
LOCK_USER   = "UPDATE users SET login_status = 1 WHERE user_name = '{}'"
UNLOCK_USER = "UPDATE users SET login_status = 0 WHERE user_name = '{}'"



# wagers SQL
PLACE_BET = "INSERT INTO WAGERS (game_id, player_code, wager_date,wager_amount, wager_status, teller_wager, qrcode_id) VALUES ({}, '{}', '{}', {}, '{}', '{}', '{}')"


# Computation Constants
PLASADA = .05


