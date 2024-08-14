# Welcome to Ali's Email Templates Management Project

This Rubicon Project This project was created using Rust and PostgreSQL for the backend and React for the front end, using the Docker platform. 

The website is hosted on localhost and all three containers (frontend, backend, db) can be started using 
`docker compose up -w --build` 
Simply clone this repo and run the above command!

The root compose file has been edited to add directions to build the postgres database, and set an environment variable on the backend pointing to the database as a URL. This database allows for persistant data, meaning all Emial Templates will be available even after closing the browser, or restarting the Docker containers.

After the Docker containers are running, you should be able to access the site by visiting http://localhost:8080

## Product Mapping Section

Please refer to the ProductMapping.md file for more information.