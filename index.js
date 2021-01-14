const router = require('./routes/api/router');
const dotenv = require('dotenv');
dotenv.config();

let port = process.env.APP_PORT || 8080;

router.listen(port, () => console.log(`Server run on port ${port}`));