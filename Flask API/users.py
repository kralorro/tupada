#!/usr/bin/python
import sys

from database import SQLite
from security import Crypto
from constants import *


class Users:
    def __init__(self, database, cypher_key):
        self.__database = database
        self.__cypher = cypher_key


    def create(self, user_name, password, user_type):
        try:
            c = Crypto(key=self.__cypher)
            enc_pword = c.encrypt(password)
            sql = "INSERT INTO users (user_name, password, user_type, date_created, login_status)" \
                  "VALUES ('{}', '{}', '{}', DATETIME('now'), 0)".format(user_name, enc_pword, user_type)

            db = SQLite(self.__database)
            db.execute_DML(sql)

            return (1, "User {} succesfully created".format(user_name))

        except Exception as e:
            return (0, str(e))
            #sys.exit(0)


    def update_password(self, user_name, new_password):
        try:
            c = Crypto(key=self.__cypher)
            enc_pword = c.encrypt(new_password)
            sql = "UPDATE users SET password = '{}' WHERE user_name = '{}'".format(enc_pword, user_name)

            db = SQLite(self.__database)
            db.execute_DML(sql)

            return (1, "Password for {} succesfully updated".format(user_name))
        except Exception as e:
            return (0, str(e))
            #sys.exit(0)



if __name__ == "__main__":
    u = Users(MAIN_DB, CYPHER_KEY)
    print ("User provisioning back-end. Select Options")
    print ("  1. Create Users")
    print ("  2. Update Password")
    print ("  X. Exit")

    options = {'1':u.create, '2': u.update_password}

    choice = input("Enter Choice: ")
    while True:
        if choice.upper() == 'X':
            sys.exit()

        if choice == '1':
            print(options.get(choice)(input("Enter Username: "), input("Enter Password: "), input("Enter Acct. Type: ")))

        elif choice == '2':
            print(options.get(choice)(input("Enter Username: "), input("Enter New Password: ")))

        else:
            print ("Invalid choice")

        choice = input("What to do next? ")
