<h1 align='center'>
    Geographic Information System
</h1>

## Description

A node.js based geographic information service which will provide available area and field information through API. If you provide longitude and latitude it will provide information about that land. It also provide available land area in our database.

## Demo

[Geographic Information System - field API](http://ec2-54-251-136-200.ap-southeast-1.compute.amazonaws.com/fields/location?lon=11.158527&lat=60.748885)

[Geographic Information System - area API](http://ec2-54-251-136-200.ap-southeast-1.compute.amazonaws.com/areas)

## Technology Stack

- Node.js - Backend script.
- Nest.js - Node.js framework.
- PostgreSQL - SQL databases.
- Postgis - Add support for geographic objects to the PostgreSQL.
- Nginx - Work as an API gateway, So all request come to the nginx and it will route the request to application endpoint.
- Docker - Containerize the application.
- Docker-compose - Up and running the full application stack together.
- Shell Scripting - It help to load spatial data in Postgres.

## Run Project Through Docker

### Prerequisites

You need to have `docker`, `docker-compose`, `PostgreSQL`, and `Postgis` installed on your computer to run the service. Also you need a Linux environment to run bash script.

### Steps

1. Clone this repository.
2. Go to application directory and copy the `.sample.env` file, paste it in same directory as `.env`.
3. Set the database configuration. This configuration also use by docker-compose file. So what you set for the `DATABASE_NAME`, `DATABASE_USER` and `DATABASE_PASSWORD`, it also use for the docker postgis container.
4. The `DATABASE_HOST`, keep it same as sample file because `postgis` name is using for docker-compose postgis container. If you want to change the database host name, you also need to change the postgis container name in docker-compose.
5. The `DATABASE_PORT`, keep it same as sample file, as our application and database communicate internally so they connect on postgres default port.
6. For application port, exposing `8000`, keep it same. If you want to change it, please also change the port number from nginx.conf file. You will find the file in `nginx` folder.
7. Set the `NODE_ENV` as you need. `development` / `production`
8. If all env variables are set than run `docker-compose up -d` from root of the project directory.
9. Now load you shape files in database before check the application.

### Load Shape file

1. Fist make sure you have installed PostgreSQL and Postgis in your local computer because this script using `psql` and `shp2pgsql`, which come with postgreSQL and postgis package.
2. Change the `load.sh` file permission. Make it executable. `chmod +x ./load.sh`. You get this file root of the project.
3. Now run the script with all required parameters
`./load.sh -h <DATABASE_HOST> -p <DATABASE_PORT> -u <DATABASE_USERNAME> -P <DATABASE_PASSWORD> -d <DATABASE_NAME> -f <SHAPE_FILE_LOCATION> -l <GEOGRAPHIC_NAME_FOR_SHAPE_FILE>`
if you run `load.sh --help` get all option as well.
4. If you using the default configuration the command will be something like this
`./load.sh -h localhost -p 8585 -u <DATABASE_USERNAME> -P <DATABASE_PASSWORD> -d <DATABASE_NAME> -f <SHAPE_FILE_LOCATION> -l Norway`
docker-compose postgis container exposing 8585 port for local usage.

### PG ADMIN

If need to look into the database you can use pg admin container for that. Run the `./pgAdmin-start.sh` from root of the project. It already build with docker-compose network so that you can easily connect with the postgis container. The hostname will be docker-compose container name.

## API Documentation

|    API    | Method | Query Param | Descrition
|-----------|--------|-------------|------------
| /fields/location    | GET | lon: number <br /> lat: number | If pass lon and lat as query parameter, this endpont return field polygon.
| /areas  | GET  | None | This endpoint return all available polygon in database with simple format.

## Request Response Example

To get field polygon by specific point `curl`.

Request

```
curl --request GET 'http://localhost:5000/fields/location?lon=11.158527&lat=60.748885'
```

Response

```

{
    "type": "Feature",
    "geometry": {
        "type": "Polygon",
        "coordinates": [
            [
                [
                    longitude,
                    latitude
                ],
                ....
            ],
            ....
        ]
    }
}
```

To get all available polygon in database `curl`

Request

```
curl --request GET 'http://localhost:5000/areas'
```

Response

```
{
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "name": "Geographic name",
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [
                            11.16,
                            60.75
                        ],
                        ....
                    ]
                    ....
                ]
            }
        }
        ....
    ]
}
```
