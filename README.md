# parking-management-backend-express
# parking-management-backend-express
Backend Readme:

Prerequisite:
A free MongoDB Atlas(https://cloud.mongodb.com/) and also install Campass for desktop
DB Setup: 
1. Open create a cluster.
2. Click on Connect and then Click on Connect Using MongoDB Campass, Copy the url and paste in Compass, add your password
   in <password> field. Once it is connected, you will find 2 dummy collections local and users.
3. in Atlas click on connect again and then on connect your application. Copy the Url. We will use it later.


Project setup:
1. Clone the repo and do npm install
2. In config folder, open config.env file. Enter the copied URL in above step in MONG_URL field.
3. enter password in <password> field and add db name (parking) in <dbname>
4. in terminal enter npm run dev. A console message Connected to mongo db will be displayed indicates project is setup.


For sample initialisation of parking zones and parking spaces you can either use Frontend Initialize section
or run seeder.js.
In console type node seeder -i to import sample user Data in db
and node seeder -d to delete all data in db  and other collections in db. 

(run seeder -i to import User Data before sigining in through FE)

Click the below link to view the api documentation.
https://documenter.getpostman.com/view/12796081/TVev55Gk



