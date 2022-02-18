Python verion is 3.x

Below need to be installed using PIP
API dependencies
	- waitress (WSGI server)
	- flask

Ensure to update app.config.js and constants.py
	app.config.js
		API_URL  = IP : PORT of the API (http://192.168.68.111:5000)
		BASE_URL = IP : PORT of the application (http://192.168.68.111:80)
		COMPANY  = The company name

	constants.py
		MAIN_DB =  The path to the SQL lite DB
		PLASADA = The application constant to indicate the % commission
		HOST    = The IP address of the API
		PORT    = The port of the API
		THREADS = Number of threads the WSGI server will use

		**** DONT CHANGE ANYTHING UNDER DATABASE QUERIES ****



Application Server
	- Windows IIS
	- configure the IIS webroot to point to the /Angular directory
	- Configure Windows Defender with Advance Security to allow access from other IP
		- Create new inbound rules
		- https://manage.accuwebhosting.com/knowledgebase/2886/How-to-Configure-IIS-to-Access-Your-Website-using-an-IP-Address.html#:~:text=Go%20to%20Start%20%E2%86%92%20Administrative,current%20bindings%20of%20that%20website.&text=Click%20on%20Add%20button%20to%20add%20a%20new%20binding


