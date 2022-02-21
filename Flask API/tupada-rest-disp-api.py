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


if __name__ == '__main__':
	# running in waitress WSGI
	print("running web service interface on WSGI...")
	time.sleep(2)
	print("service listening at http://{}:{}".format(HOST, DISPLAY_PORT))
	serve(app, host=HOST, port=DISPLAY_PORT, threads=THREADS)
