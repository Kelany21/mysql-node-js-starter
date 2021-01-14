const router = require('./routes/api/router');
const dotenv = require('dotenv');
dotenv.config();
const db = require('./database/db.js')

db.migrateAndSeed()

let port = process.env.APP_PORT || 8080;

router.listen(port, () => console.log(`\n\n-----Server run on port ${port}-----\n\n`));