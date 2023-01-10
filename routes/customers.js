const { Router } = require('express')
const { check } = require('express-validator')

const { validateFields } = require('../middlewares')
const { emailExists, existsUserById } = require('../helpers/dbValidators')

const { customersGet,
        customersBestRated,
        customersPut,
        customersPost,
        customersDelete } = require('../controllers/customers')

const router = Router()

router.get('/', customersGet)
router.get('/best-rated', customersBestRated)
router.put('/:id',[
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom( existsUserById ),
  check('rol', 'No es un rol válido').isIn(['SELLER','BUYER']), 
  validateFields
],customersPut )

router.post('/',[
  check('name', 'El nombre es obligatorio').not().isEmpty(),
  check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
  check('email', 'El correo no es válido').isEmail(),
  check('email').custom( emailExists ),
  check('rol', 'No es un rol válido').isIn(['SELLER','BUYER']),
  validateFields
], customersPost )

router.delete('/:id',[
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom( existsUserById ),
  validateFields
],customersDelete )

module.exports = router