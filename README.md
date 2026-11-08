This is a project that tests the API Endpoints created for the calls application. Server listens to PORT 8000 and can be tested on Postman.

Language: JavaScript (Node.js)

Features:
  Basic:
    -Get all Calls with GET
    -Get a certain Call by ID using GET
    -Archive a Non Archived Call and vice versa using PATCH
  Advanced:
    -Save changes to archive status in the data.json file
    -Add Notes to Calls
    -Delete Calls from the JSON file
    -Filter Calls with GET

Running the "index.js" file initiates the server. Test case code can be found on /api endpoints/api_endpoints.js