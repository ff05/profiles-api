const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const { Profile } = require('./models/profile.js')

app
.use(cors())
.use(bodyParser.urlencoded({ extended: true }))
.use(bodyParser.json())

app.get('/', (req, res) => {
  Profile.find()
    .then((profiles) => res.json(profiles))
    .catch((error) => next(error))
})

app.post('/', (req, res) => {
  let newProfile = req.body

  Profile.create(newProfile)
  .then(profile => res.json(profile))
  .catch(error => next(error))
})

app.patch('/:id', (req, res) => {
  const id = req.params.id
  const patchForProfile = req.body

  Profile.findById(id)
    .then((profile) => {
      if (!profile) { return next() }

      Profile.findByIdAndUpdate(id, { $set: patchForProfile }, { new: true })
        .then((updatedProfile) => res.json(updatedProfile))
        .catch((error) => next(error))
    })
    .catch((error) => next(error))
})

app.delete('/:id', (req, res) => {
  const id = req.params.id

  Profile.findByIdAndRemove(id)
    .then(() => {
      res.status = 200
      res.json({
        message: 'Removed',
        _id: id
      })
    })
    .catch((error) => next(error))
})

app.listen()