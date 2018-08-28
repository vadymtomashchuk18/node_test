const noteRoutes = require('./post_routes');

module.exports = (app, db) => {
  noteRoutes(app, db);
};
