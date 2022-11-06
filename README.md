<h1 align='center'>
    Geographic Information System 
</h1>

## Description
A node.js based geographic information service which will provide area and field information through API. If you provide longitude and latitude it will provide information about that land. It also provide available land area in our database.

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

You need to have `docker`, `docker-compose`, and `Postgis` installed on your computer to run the service. Also you need a Linux environment to run bash script.

### Steps

1. Clone this repository.
2. Go to application directory and copy the `.sample.env` file, paste it in same directory as `.env`.
3. Set the database configuration. This configuration also use by docker-compose file. So what you set for the `DATABASE_NAME`, `DATABASE_USER` and `DATABASE_PASSWORD`, it also use for the docker postgreSQL container. 
4. The `DATABASE_HOST` keep it same as sample file because `postgis` name is using for docker-compose postgres container. If you want to change the database host name, you also need to change the postgres container name in docker-compose. 
5. The `DATABASE_PORT` keep it same as sample file, as our application and database communication internally so they connect on postgres default port.
6. For application port, exposing `8000`, keep it same. If you want to change it, please also change the port number from nginx.conf file. You will find the file `nginx/nginx.conf`.
7. Set the `NODE_ENV` as you need. `development` / `production`
8. If all env variables are set than run `docker-compose up -d` from root of the project directory.

### Load Shape file
1. First change the `load.sh` file permission. Make it executable. `sudo chmod +x ./load.sh`. You get this file root of the project.
2. Now run the script with all required parameters
`load.sh -h <DATABASE_HOST> -p <DATABASE_PORT> -u <DATABASE_USER> -P <DATABASE_PASSWORD> -d <DATABASE_NAME> -f <SHAPE_FILE_LOCATION> -l <GEOGRAPHIC_NAME_FOR_SHAPE_FILE>`
if you run `load.sh --help` get all option as well.

## API Documentation


|    API   | Method | Descrition
|---------- |--------|------------
| /fields/location    | GET   | If pass lon and lat as query parameter, this endpont return field polygon.
| /areas  | GET  | This endpoint return all available polygon in database with simple format.


## Request Response Example

To get field polygon by specific point `curl`.

Request

```
curl --request GET 'http://localhost:8000/fields/location?lon=11.158527&lat=60.748885'
```

Response

```

{
    "type": "Polygon",
    "coordinates": [
        [
            [
                longitude,
                latitude
            ],
            ...
        ]
        ...
    ]
}
```

To get all available polygon in database `curl`

Request

```
curl --request GET 'http://localhost:8000/areas'
```

Response

```
{
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Polygon",
            "coordinates": [
                [
                    [
                        longitude,
                        latitude
                    ],
                    ...
                ]
                ...
            ]
        }
        ...
    ]
}
```