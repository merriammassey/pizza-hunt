const router = require("express").Router();
//Instead of importing the entire object and having to do pizzaController.getAllPizza(), we can simply destructure the method names out of the imported object and use those names directly.
const {
  getAllPizza,
  getPizzaById,
  createPizza,
  updatePizza,
  deletePizza,
} = require("../../controllers/pizza-controller");

// Set up GET all and POST at /api/pizzas
// /api/pizzas
//provide the name of the controller method as the callback

router.route("/").get(getAllPizza).post(createPizza);

// Set up GET one, PUT, and DELETE at /api/pizzas/:id
// /api/pizzas/:id
router.route("/:id").get(getPizzaById).put(updatePizza).delete(deletePizza);
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
