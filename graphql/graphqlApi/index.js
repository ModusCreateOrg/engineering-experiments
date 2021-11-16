const app = require("express")();
const pg = require("pg");
const { graphqlHTTP } = require("express-graphql");
require('dotenv').config();

const Schema = require("./schema");
const getGalaxiesAndStars = require('./galaxiesStars');
const { setAndSendNinjas } = require('./ninjaClan');
const PORT = process.env.PORT || 3000;

const pgPool = new pg.Pool({
  user: process.env.POSTGRES_USER_NAME,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
});


app.use(
  "/graphql",
    graphqlHTTP({
      schema: Schema,
      graphiql: true,
      context: {
        pgPool: pgPool,
      },
    })
);

app.get('/galaxystars', async(req, res) => {
    const galaxyList = await getGalaxiesAndStars(pgPool);
      if(galaxyList) {
        res.json(galaxyList);
      } else {
        res.send('Galaxy not found');
      }
});

app.get('/ninjas', async(req, res) => {
  const { limit, async} = req.query;
  const ninjas = await setAndSendNinjas(async === 'true', limit);
  res.json(ninjas);
});
    
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
  