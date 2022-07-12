const {Router} = require('express')
const router = Router()
const skillController = require('../controllers/skillController')


router.get('/all',skillController.getAll)

// router.get('/getbynames',skillController.getSkillsByName)

router.post('/create',skillController.create)


router.delete('/delete', skillController.delete)


module.exports = router