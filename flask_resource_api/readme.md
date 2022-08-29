
## Development
Hot-Reloading enabled

## Deploying
To build or start:
    docker compose up


## ApiKey
Use in the json within "apiKey" field:

	"apiKey": "_zUYQ83k!x34%nh("

Insert the hash of the "apiKey" in the database in the docker container:
	
	mongosh
	use fakeTrade
	db.apiAuth.insertOne({'_id':'apiKey', 'hash':'$2a$12$C6FmFga.nd8OoIE9M95OFeT7tdrTsvXY2eTdoOvTMgAvXf8/.U8uS'})