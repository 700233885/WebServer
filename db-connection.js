const { MongoClient, ObjectId } = require('mongodb')
const { uri } = require('./secrets/dbcon.json')
const client = new MongoClient(uri)

// const test = async () => {
//     await client.connect()
//     const collection = await client.db('PokemonApi').collection("Pokemon")
//     const testPokemon = collection.findOne({ number: 1 })
//     console.log(testPokemon)
// }

const getCollection = dbName => collectionName => async () =>{
    await client.connect()
    return client.db(dbName).collection(collectionName)
}

module.exports = { getCollection, ObjectId }
