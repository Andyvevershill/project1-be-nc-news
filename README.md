# Northcoders News API

Here is the link to the hosted version: https://project1-be-nc-news.onrender.com/

PLease include the endpoints listed in 'endpoints.json' to modify the data.

This project was my first attempt at building an API, with the purpose of accessing application data programmatically. The intention here is to mimic the building of a real world backend service (such as Reddit) which should provide this information to the front end architecture.

During this project, I worked to enhance my skills and understanding of back-end, primarily utilising:
Javascript, Express, PSQL, TDD, MVCs and Error-Handling.

To begin, clone this repo by typing in 'git clone https://github.com/Andyvevershill/project1-be-nc-news' into your terminal.

Enter this folder by typing 'cd/project1-be-nc-news' followed by 'code .'

You will need to create two .env files to view this project: .env.test and .env.development. Into each, add 'PGDATABASE=', with the correct database name for that environment (see /db/setup.sql for the database names). Additionally, make sure these are included in the .gitignore file.

Please run these commands which will install the necessary dependancies:
npm install
npm install supertest
npm install pg
npm install jest-sorted
npm install dotenv
npm install nodemon

Finally, run these commands to initialise and seed the database:
npm run set-db
npm run seed

You can also run tests using 'npm test _file path_'

---

This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/)
