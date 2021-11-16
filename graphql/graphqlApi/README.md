# Graphql Vs Rest Api Comparison
1) This is to show comparision between Rest vs Graphql. If we are fetching nested and high volume of data by single request then Rest is better choice than graphql as Graphql has to do type checking for full response before sending it to client.

2) This is to show that async call inside graphql request caused delay in sending response than sync call. It also shows that graphql  call are costly in terms of response time with respect to rest calls if internal logic depends heavily on async calls.


## PreRequisite
1) Install Postgres
2) Install Nodejs
3) Install Postman

# How to run this project
1) Clone repository js-coe-experiments repository and go to graphql/graphqaApi directory
2) Create database graphql_rest_modus
3) Go to sql directory and unzip and run sql scripts in your postgres.
4) Create .env file and copy content of sample.env and replace with credentials.
5) Open terminal and go to directory graphqaApi and run npm install.
6) Run npm run dev.
7) Go to postman and send get request with following url
    a) Rest Sync = `http://localhost:3000/ninjas?limit=1000000&async=false`
    b) Rest Async = `http://localhost:3000/ninjas?limit=1000000&async=true` 
    Please note down Rest Async, Rest Sync time.

8) Use postman and  Send post request with following url for sync and async -
        Graphql Endpoint = `http://localhost:3000/graphql`
        Graphql Query = 
        `query ninjas($limit:Int, $async:Boolean) {
            ninjas(limit: $limit, async: $async) {
                title
                clan{
                    name
                }
            }
        }`
        Graphql variables for Sync call =
            `{
                "limit": 1000000,
                "async": false
            }`
     Graphql variables for Async call =
       `{
            "limit": 1000000,
            "async": true
        }`

    Please note down Graphql Async and Graphql Rest Sync time

9) Again run get request for rest endpoint = 
    `http://localhost:3000/galaxystars`
    Please note down total time of request completion
10) Run post request for graphql endpoint with following query =
        `query galaxystars {
            galaxystars {
                id
                name
                stars {
                    id
                    name
                    mass
                    group
                    star_type
                    brightness
                }
            }
        }`

    Please note down the result

11) You will find that graphql requests are slower than rest requests and Async requests are slower than sync requests.   