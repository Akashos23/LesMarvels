import Fastify from 'fastify'
import {getData, getDataThumbnail} from "./api.js";
const app = Fastify()
app.get('/getData', (req, res) => {
        const resultat = getData("http://gateway.marvel.com/v1/public/characters");
        resultat.then((retour) => {
                res.send(retour);
        }
        )
})





app.listen({ port: 3000 })