const { Router, response } = require('express')
const { check } = require('express-validator')

const { ordersGet, orderGet, ordersPost, orderPut, orderDelete } = require('../controllers/orders')
const { validateFields } = require('../middlewares')

const router = Router()

router.get('/', ordersGet)
router.get(
  "/:id",
  [
    check("id", "No es un Id de mongo Valido").isMongoId(),
    validateFields,
  ],
  orderGet
)
router.post(
  "/",
  [check("customer", "El cliente es obligatorio").not().isEmpty(), validateFields],
  check('status', 'No es un status válido').isIn(['CREATED', 'SENT', 'CANCELLED', 'DELIVERED']), 
  ordersPost
)

router.put(
  "/:id",
  [
    check("id", "No es un Id de mongo Valido").isMongoId(),
    check('status', 'No es un status válido').isIn(['CREATED', 'SENT', 'CANCELLED', 'DELIVERED']), 
    validateFields,
  ],
  orderPut
)

router.delete(
  "/:id",
  [
    check("id", "No es un Id de mongo Valido").isMongoId(),
    validateFields,
  ],
  orderDelete
)

module.exports = router