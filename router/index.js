const eroc = require('eroc')
const config = require('eroc/config')
const stringUtil = require('eroc/utils/string')
const multer = require('multer')
const slugify = require('slugify')


const router = eroc.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {

        const client = req.headers['il-client']

        if (!config.allow_client.split(',').includes(client)) {
            return cb('Forbidden')
        }

        return cb(null, 'upload')
    },
    filename: function (req, file, cb) {
        const ext = file.originalname.split('.').pop()
        const name = file.originalname.split('.').slice(0, -1).join('')
        const slug = slugify(stringUtil.removeViAccent(name), { lower: true, strict: true })

        const filename = `${slug}-${Date.now()}${Math.random().toString().slice(2, 6)}.${ext}`

        return cb(null, filename)
    }
})
  
const upload = multer({ storage: storage })


router.post('/images', upload.single('image'), async (req, res, next) => {
    return res.success({
        path: req.file.path.slice(7),
    })
})


module.exports = router