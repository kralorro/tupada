# All application related constants

USER_DB = "D:\\Tupada Database\\Tupada.db"

# Login Page
GET_USER    = "SELECT user_name, login_status, user_type FROM users WHERE user_name = '{}' AND password = '{}'"
LOCK_USER   = "UPDATE users SET login_status = 1 WHERE user_name = '{}'"
UNLOCK_USER = "UPDATE users SET login_status = 0 WHERE user_name = '{}'"


# Computation Constants
PLASADA = .05


