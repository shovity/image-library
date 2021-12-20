const eroc = require('eroc')

const router = require('./router')


const app = eroc.createApplication((app) => {
    app.use('/api/image-library', router)
})

app.start()