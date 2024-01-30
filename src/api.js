import fetch from 'node-fetch';
import {createHash} from "node:crypto";
/**
 * Récupère les données de l'endpoint en utilisant les identifiants
 * particuliers developer.marvels.com
 * @param url l'end-point
 * @return {Promise<json>}
 */
export const getData = async (url) => {
    const url1 = new URL(url);
    const date = new Date();
    const ts = date.toISOString();
    const publicKey = "de2fca9a1c8f20f60536992bf0ded52a";
    const privateKey = "c2233cdd3bf4e1006f23b4849767a357f7fe3b09";
    const params = {ts : ts, apikey : publicKey, hash : await getHash(publicKey,privateKey,ts)}
    url1.search = new URLSearchParams(params).toString();
    const response = await fetch(url1);
    const textResponse = await response.text();
    const textResponseJSON = await JSON.parse(textResponse);
    return new Promise((resolve,reject) => {
        resolve(getDataThumbnail(textResponseJSON))
    });
}



export const getDataThumbnail = async (resultat) => {
   const tab = [];
   for(let i = 0; i < resultat.data.results.length; i++){
       if(!resultat.data.results[i].thumbnail.path.includes("image_not_available")) {
           let tabJSON = {
               name : resultat.data.results[i].name,
               description : resultat.data.results[i].description,
               imageURL : resultat.data.results[i].thumbnail.path
           }
           tab[i] = tabJSON;
       }
   }
   return tab;
}

/**
 * Calcul la valeur md5 dans l'ordre : timestamp+privateKey+publicKey
 * cf documentation developer.marvels.com
 * @param publicKey
 * @param privateKey
 * @param timestamp
 * @return {Promise<ArrayBuffer>} en hexadecimal
 */
export const getHash = async (publicKey, privateKey, timestamp) => {
    return createHash("MD5").update(timestamp + privateKey + publicKey).digest('hex')
}