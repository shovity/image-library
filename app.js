const eroc = require('eroc')
const express = require('express')

const router = require('./router')


const app = eroc.createApplication((app) => {
    app.use('/api/image-library', router)
    app.use(express.static('upload'))
})

app.start()