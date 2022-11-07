DATABASE_HOST="localhost"
DATABASE_PORT="8888"
DATABASE_USER=""
DATABASE_PASSWORD=""
DATABASE_NAME="deftlyaugust"
FILE_LOCATION=""
LOCATION_NAME=""

function help() {
    echo "--help: get script flugs option"
    printf "script usage:\n"
    printf "\t-h: database hostname\n"
    printf "\t-p: database port\n"
    printf "\t-u: database username\n"
    printf "\t-P: databsae password\n"
    printf "\t-d: database name\n"
    printf "\t-f: shape file location\n"
    printf "\t-l: Geographic name for shape file\n"
    
}

# determine flugs
while getopts 'h:f:l:p:u:d:P:--help:' flag; do
  case "$flag" in
    h)
        DATABASE_HOST=$OPTARG;;
    p)
        DATABASE_PORT=$OPTARG;;
    u)
        DATABASE_USER=$OPTARG;;
    P)
        DATABASE_PASSWORD=$OPTARG;;
    d)
        DATABASE_NAME=$OPTARG;;
    f)
        FILE_LOCATION=$OPTARG;;
    l)
        LOCATION_NAME=$OPTARG;;
    ?)
        help
        exit 0;;
    *)
        help
        exit 1;;
  esac
done

# check required parameters
if [ -z $DATABASE_HOST ] || [ -z $DATABASE_PORT ] || [ -z $DATABASE_USER ] || [ -z $DATABASE_PASSWORD ] || [ -z $DATABASE_NAME ] || [ -z $FILE_LOCATION ] || [ -z $LOCATION_NAME ]
then
    printf "All flugs are required\n\n"
    help
    exit 1
fi

DB_CONNECTION="PGPASSWORD=$DATABASE_PASSWORD psql -h $DATABASE_HOST -p $DATABASE_PORT -U $DATABASE_USER -d $DATABASE_NAME"

# create temp table
DB_CREATE_TEMP_TABLE_SQL="
    CREATE TABLE IF NOT EXISTS temp (
        gid BIGSERIAL NOT NULL PRIMARY KEY,
        id VARCHAR(50),
        geom geometry
    )
"
eval "$DB_CONNECTION -t -c '$DB_CREATE_TEMP_TABLE_SQL'"

# insert data in temp table
eval "shp2pgsql -s 4326 -a $FILE_LOCATION temp | $DB_CONNECTION"

# create field table
DB_CREATE_FIELD_TABLE_SQL="
    CREATE TABLE IF NOT EXISTS field (
        gid BIGSERIAL NOT NULL PRIMARY KEY,
        id VARCHAR(50),
        geom geometry
    )
"

eval "$DB_CONNECTION -t -c '$DB_CREATE_FIELD_TABLE_SQL'"

# create field table geom index
DB_FIELD_TABLE_INDEX="CREATE INDEX IF NOT EXISTS field_geom ON field USING GIST(geom)"

eval "$DB_CONNECTION -t -c '$DB_FIELD_TABLE_INDEX'"

# insert data in field table
DB_INSERT_DATA_IN_FIELD_TABLE="
    INSERT INTO field (id, geom)
    SELECT id, ST_GeometryN(geom, 1) AS geom FROM temp
"

eval "$DB_CONNECTION -t -c '$DB_INSERT_DATA_IN_FIELD_TABLE'"

# create area table
DB_CREATE_AREA_TABLE_SQL="
    CREATE TABLE IF NOT EXISTS area (
        id SERIAL NOT NULL PRIMARY KEY,
        location VARCHAR(80),
        geom geometry
    )
"

eval "$DB_CONNECTION -t -c '$DB_CREATE_AREA_TABLE_SQL'"

# create area table geom index
DB_AREA_TABLE_INDEX="CREATE INDEX IF NOT EXISTS area_geom ON area USING GIST(geom)"

eval "$DB_CONNECTION -t -c '$DB_AREA_TABLE_INDEX'"

# insert data in area table
DB_AREA_UNIOR_SQL="
    INSERT INTO area (location, geom)
    VALUES (
        '$LOCATION_NAME', 
        (SELECT ST_Envelope(ST_Buffer(ST_Union(geom), 0.0001)) FROM temp)
    )
"

eval "$DB_CONNECTION -t -c \"$DB_AREA_UNIOR_SQL\""

# drop temp table
DB_DROP_TEMP_TABLE="
    DROP TABLE temp
"

eval "$DB_CONNECTION -t -c \"$DB_DROP_TEMP_TABLE\""
