# Example-js-migration-MySQL-to-MongoDB

This is an example tested of migrating MySQL data to MongoDB on local. 

You may also use external host to migrate your data, which was also tested to works successfully.

External tools such as **MySQL Workbench** and **Robo 3T** may help you check if you have successfully migrate your data.

### Method
We export the queried data from MySQL database then insert the data into MongoDB database

### Quick Start & Code Description

### 1. **`git clone`** this project

### 2. **`npm install {node_package} --save`** to install the node packages need

![Imgur](https://i.imgur.com/6CHc8Fn.jpg)

### 3. Database Setup

3-1 MySQL Database Connection Setup

The basic variables you need would be `host`, `user`, `password`. For other variables, check out [Connection 
Options](https://github.com/mysqljs/mysql#connection-options).

![Imgur](https://i.imgur.com/ihjEugM.png)

3-2 MongoDB Connection Setup

This is a local host connection, you may change it to other external connections, the URL would be like **`mongodb://USERNAME:PASSWORD@HOST:PORT/DATABASE`**.

![Imgur](https://i.imgur.com/uWvGJme.png)

### 4. API Routes

Not a very significant part, it's just to make sure that your app is working.

![Imgur](https://i.imgur.com/KCXtuUf.png)

### 5. Export then Import

We query the table from MySQL then pass the results out and save it into MongoDB database.

![Imgur](https://i.imgur.com/ivUcaKJ.png)

**NOTE**: Our MySQL data source contains a timestamp column, in order to use this data correctly, we transform the data type into `date`, so that in the future, we may use it in WISE-PaaS Dashboard. **This is important that we recommend you do not skip this step if you have a timestamp column in your table.**

**NOTE**: Remember to use **`insertMany`** instead of `insertOne`. If your data isn't timeseries, it doesn't matter. But if your data is in  timeseries or time-based, you should be careful. While inserting the data one by one, the data might not be inserted in the correct order because of delay of the system and this would cause a problem in future application of the data source due to the disorder of the timestamp.

**NOTE**: This part is optional. It exports a JSON file.
````js
fs.writeFile(fileName,JSON.stringify(results), function (err) {
    if (err) throw err;
    console.log('Saved!');
});
````

