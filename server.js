
// console.log('SERVER.JS IS RUNNING')

import express from 'express'
import { Liquid } from 'liquidjs'

const app = express()
const PORT = 3000

// Static files (CSS, JS, images)
app.use(express.static('public'))

// Body parsing (forms)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


const engine = new Liquid({
  root: './views',
  extname: '.liquid'
})

app.engine('liquid', engine.express())
app.set('view engine', 'liquid')
app.set('views', './views')


// HOME
app.get('/', (req, res) => {
  res.render('index')
})

// SCROLL-DRIVEN PAGE (haalt data op)
app.get('/scrolldriven', async (req, res) => {
  const apiResponse = await fetch(
    'https://fdnd.directus.app/items/links'
  )
  const linkResponseJSON = await apiResponse.json()

  res.render('scrolldriven', {
    links: linkResponseJSON.data
  })
})

// MICRO-INTERACTIONS PAGE (geen data nodig)
app.get('/microinteractions', (req, res) => {
  res.render('microinteractions')
})


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
