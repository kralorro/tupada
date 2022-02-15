#!/usr/bin/python
import os
import sqlite3


class SQLite:
    def __init__(self, database, db_init_script=""):
        self.__database = database
        self.__db_init_script = db_init_script


    def __create_or_open_db(self, db_file):
        db_is_new = not os.path.exists(db_file)
        conn = sqlite3.connect(db_file)
        if db_is_new:
            conn.execute(self.__db_init_script)
        return conn


    def execute_query(self, sql_statement, param={}, return_one=False):
        conn = self.__create_or_open_db(self.__database)
        cursor = conn.cursor()
        cursor.execute(sql_statement, param)

        if return_one:
            return cursor.fetchone()
        else:
            return cursor.fetchall()


    def execute_DML(self, dml_statement, param=[]):
        conn = self.__create_or_open_db(self.__database)
        #cursor = conn.cursor()
        conn.execute(dml_statement, param)
        conn.commit()


    def get_table_data(self, table_name):
        conn = self.__create_or_open_db(self.__database)
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM {}".format(table_name))
        return cursor.fetchall()

