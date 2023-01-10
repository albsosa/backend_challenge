const { Router, response } = require("express")
const { check } = require("express-validator")

const {
  productsGet,
  productGet,
  productHighOrLow,
  productBestSelling,
  productPost,
  productPut,
  productDelete,
} = require("../controllers/products")
const { productExists } = require("../helpers/dbValidators")
const { validateFields } = require("../middlewares")
const router = Router()

router.get("/", productsGet)
router.get("/high-or-low", productHighOrLow)
router.get("/best-selling", productBestSelling)
router.get(
  "/:id",
  [
    check("id", "No es un Id de mongo Valido").isMongoId(),
    check("id").custom(productExists),
    validateFields,
  ],
  productGet
)

router.post(
  "/",
  [check("name", "El nombre es obligatorio").not().isEmpty(), validateFields],
  productPost
)

router.put(
  "/:id",
  [
    check("id", "No es un Id de mongo Valido").isMongoId(),
    check("id").custom(productExists),
    validateFields,
  ],
  productPut
)

router.delete(
  "/:id",
  [
    check("id", "No es un Id de mongo Valido").isMongoId(),
    check("id").custom(productExists),
    validateFields,
  ],
  productDelete
)

module.exports = router
