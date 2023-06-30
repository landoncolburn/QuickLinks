# QuickLinks

QuickLinks is my final project for Athabasca University's COMP 482 HCI class.

The project is to design a user interface that meets planned task descriptions, and follows good design principles.

## How to run the application?

Three ways,

First using Docker Compose (reccomended):

```sh
git clone https://github.com/landoncolburn/QuickLinks.git
cd QuickLinks
docker compose up
```

The interface should be accessible at http://localhost:3000

Second way, docker without compose:

```sh
git clone https://github.com/landoncolburn/QuickLinks.git
cd QuickLinks
docker build -t quicklinks .
docker run -p 3000:3000 -v "<PATH_TO_DATABASE>:/app/database" -e DATABASE_URL="file:/app/database/db.sqlite" quicklinks
```

Make sure you replace <PATH_TO_DATABASE> with the absolute path to the db.sqlite file on your host system.

The interface should be accessible at http://localhost:3000

Third way, no docker:

The application is tested on Node v18.15.0, so I reccomend using nvm or similar to use that runtime.

Make sure you set the environment variable before running the application to point to the database.

```sh
git clone https://github.com/landoncolburn/QuickLinks.git
cd QuickLinks
npm i
npm build
DATABASE_URL="file:../database/db.sqlite" npm start
```

The interface should be accessible at http://localhost:3000

If you have any trouble running the application, please feel free to reach out to me and I can make any required changes!

Cheers!
