const mongoose = require('mongoose');

const { DB_ATLAS, DB_NAME } = process.env;
const MONGODB_URI = DB_ATLAS + DB_NAME;


mongoose.connect(DB_ATLAS, { useNewUrlParser: true })
  .then(() => console.info(`Connected to the database: ${MONGODB_URI}`))
  .catch(error => console.error('Database connection error:', error));
