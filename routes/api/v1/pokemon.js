const router = require('express').Router()

const { getCollection, ObjectId } = require('../../../db-connection')
const getPokemonCollection = getCollection('PokemonApi')
const getPokemon = getPokemonCollection('Pokemon')


router.get('/', async (request, response) => {
    const collection = await getPokemon()
    const count = await collection.countDocuments()
    const number = Math.floor(Math.random() * count + 1)
    const found = await collection.findOne({ number: parseInt(number) })

    if(!found) response.send({error: `cannot find pokemon with number ${number}`})
    else response.send(found)
})

router.get('/pokemon/:number', async (request, response) => {
    const { number } = request.params // remember number is a string

    const collection = await getPokemon()
    const found = await collection.findOne({ number: parseInt(number) })
    
    if(!found) response.send({error: `cannot find pokemon with number ${number}`})
    else response.send(found)
})

router.get('/pokemon/id/:id', async (request, response) =>{
    const { id } = request.params

    const collection = await getPokemon()
    const found = await collection.findOne({ _id: new ObjectId(id) })
    
    if(!found) response.send({error: `cannot find pokemon with id: ${id}`})
    else response.send(found)
})

router.post('/pokemon/add', async (request, response) => {
    const {number, name, types} = request.body
    const collection = await getPokemon()
    const result = await collection.insertOne({number, name, types})
    response.send(result)
})

module.exports = router