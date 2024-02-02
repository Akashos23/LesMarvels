import Fastify from 'fastify'
import handlebars from "handlebars";
import {fastifyView} from "@fastify/view";
import {getData, getDataThumbnail} from "./api.js";
const app = Fastify()

app.register(fastifyView, {
        engine: {
                handlebars: handlebars,
        },
        includeViewExtension: true,
        options: {
                partials: {
                        header: '../../templates/header.hbs',
                        footer: '../../templates/footer.hbs'
                }
        },
        templates : 'views'
});


app.get('/', (req, res) => {
        const resultat = getData("http://gateway.marvel.com/v1/public/characters");
        resultat.then((retour) => {
                return res.view("../../templates/index.hbs", {retour : retour});
        }
        )
})





app.listen({ host : "0.0.0.0" ,port: 3000 })