# Example-js-migration-MySQL-to-MongoDB
An example of migrating MySQL data to MongoDB

### Method
We export the queried data from MySQL database then insert the data into MongoDB database

### Quick Start & Code Description

##### 1. **`git clone`** this project

##### 2. **`npm install {node_package} --save`** to install the node packages need

![Imgur](https://i.imgur.com/6CHc8Fn.jpg)

##### 3. Database Setup

3-1 MySQL Database Connection Setup

The basic variables you need would be `host`, `user`, `password`. For other variables, check out [Connection 
Options](https://github.com/mysqljs/mysql#connection-options).

![Imgur](https://i.imgur.com/ihjEugM.png)

3-2 MongoDB Connection Setup

This is a local host connection, you may change it to other external connections, the URL would be like **`mongodb://USERNAME:PASSWORD@HOST:PORT/DATABASE`**.

![Imgur](https://i.imgur.com/uWvGJme.png)

##### 4. API Routes

Not a very significant part, it's just to make sure that you have data in the database and is connected.

![Imgur](https://i.imgur.com/dhmcSvM.png)
