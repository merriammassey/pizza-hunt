const router = require("express").Router();

// Set up GET all and POST at /api/pizzas
router.route("/").get().post();

// Set up GET one, PUT, and DELETE at /api/pizzas/:id
router.route("/:id").get().put().delete();

module.exports = router;

/*abstracts the database methods from the routes, giving us the option to write unit tests with Jest
Instead of creating duplicate routes for the individual HTTP methods, we can combine them
The following variations achieve the same goal:

// this code
router.route('/').get(getCallbackFunction).post(postCallbackFunction);

// is this same as this
router.get('/', getCallbackFunction);
router.post('/' postCallbackFunction);
*/
