const path = require('path')
const express = require('express')
const { request } = require('http')
const app = express()
const port = 3000

const pokemonData = [
    {number: 1, name: 'Bulbasaur', types: ['Grass', 'Poison']},
    {number: 2, name: 'Ivysaur', types: ['Grass', 'Poison']},
    {number: 3, name: 'Venosaur', types: ['Grass', 'Poison']},
    {number: 4, name: 'Charmander', types: ['Fire']},
    {number: 5, name: 'Charmeleon', types: ['Fire']},
    {number: 6, name: 'Charizard', types: ['Fire', 'Flying']},
    {number: 7, name: 'Squirtle', types: ['Water']},
    {number: 8, name: 'Wartortle', types: ['Water']},
    {number: 9, name: 'Blastoise', types: ['Water']}
]

//const root = __dirname + "/public"
const root = path.join(__dirname, 'public')

//app.use(middleware)
app.use(express.json())
app.use(express.static('public'))

app.get('/', (request, response) => {
    response.sendFile('index.html', { root })
})

app.get('/pokemon/:number', (request, response) => {
    response.sendFile('index.html', { root })
})

app.get('/api/v1', (request, response) => {
    const index = Math.floor(Math.random() * pokemonData.length)
    console.log(index, pokemonData[index])
    response.send(pokemonData[index])
})

app.get('/api/v1/pokemon/:number', (request, response) => {
    const { number } = request.params // remember number is a string
    const found = pokemonData.find(data => data.number.toString() === number)
    if(!found) response.send({error: `cannot find pokemon with number ${number}`})
    else response.send(found)
})

app.post('/api/v1/pokemon/add', (request, response) => {
    const {number, name, types} = request.body
    const found = pokemonData.find(data => data.number === number)
    if(found) return response.send({error: 'already exists', found})

    
    pokemonData.push(request.body)
    response.send({message: 'added'})
})

app.listen(port, () => console.log('http://localhost:' + port))

