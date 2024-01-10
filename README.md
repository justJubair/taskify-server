## Server side of Taskify application

### Getting started
Clone the repository
```
git clone https://github.com/justJubair/taskify-server.git
```

Install the dependencies
```
npm install
```

Configure MongoDB credentials on **.env** file and connect with the database.
```
DB_URI= "Your_DB_URL"

```

Write two scripts on **package.json** file to run the project
```
    "start": "node index.js",
    "dev": "nodemon index.js",
```

Finally run the server
```
npm run dev
```
