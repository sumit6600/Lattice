# hospitalTask-

cd server

npm start : server will run in 3000 port

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Dependcies uses in this sql-nodejs server

 "@hapi/joi" : to use for validation purpose
    "body-parser" : to get a api request in json form
    "dotenv" : to hide secert key
    "jsonwebtoken"    : for jwt key to verify
    "multer"s.1", :  to upload a picture 
    "mysql" : for databae purpose
    "nodemon" : auto start server
    
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------  
    API-ENDPOINT
    
    .Patient-register
    http://localhost:3000/register
    
   .DoctorLogin
   http://localhost:3000/register/token
   
   .DoctorRegister
   http://localhost:3000/register/find
   
   .API-2ndTask
   http://localhost:3000/register/hospital
  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Postman-collection
  
  {
	"info": {
		"_postman_id": "7fb40506-5956-4a42-80d5-915ea07133e8",
		"name": "LatticeTask",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
	},
	"item": [
		{
			"name": "patientRegister",
			"request": {
				"auth": {
					"type": "noauth"
				},
				"method": "POST",
				"header": [],
				"body": {
					"mode": "formdata",
					"formdata": [
						{
							"key": "name",
							"value": "sumit",
							"type": "text"
						},
						{
							"key": "email",
							"value": "sumit555@gmail.com",
							"type": "text"
						},
						{
							"key": "password",
							"value": "dhsj",
							"type": "text",
							"disabled": true
						},
						{
							"key": "mobile",
							"value": "995866349312",
							"type": "text"
						},
						{
							"key": "address",
							"value": "bjm",
							"type": "text"
						},
						{
							"key": "password",
							"value": "Sumit12@",
							"type": "text"
						},
						{
							"key": "myField",
							"type": "file",
							"src": "/C:/Users/amit singh/Downloads/forest-simon-Pvq2Ik6yv6E-unsplash.jpg"
						}
					]
				},
				"url": {
					"raw": "http://localhost:3000/register",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						"register"
					]
				}
			},
			"response": []
		},
		{
			"name": "DoctorLogin",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n    \"name\" : \"sumit\"\r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:4000/register/token",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "4000",
					"path": [
						"register",
						"token"
					]
				}
			},
			"response": []
		},
		{
			"name": "DoctorRegister",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{ \r\n\r\n    \"name\" :\"Abhishek\" ,\r\n    \"hospitalName\" :4\r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:3000/register/find",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						"register",
						"find"
					]
				}
			},
			"response": []
		},
		{
			"name": "2-API-TASK",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n  \"hospitalName\" :3\r\n\r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:3000/register/hospital",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						"register",
						"hospital"
					]
				}
			},
			"response": []
		}
	]
}
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  
  
  
  
  
  
  NOTE : - I have try to implement  this project by using mysql as a database and my preferable database is mongodb , MY-sql is my learning phase
     thank you 
