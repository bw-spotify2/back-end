const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const clientID = process.env.SPOTIFY_CLIENT_ID;

const axios = require('axios');

const qs = require('querystring');

const spotifyAxiosRequestOne = () => {
    const secretString = clientID + ":" + clientSecret;
    const encodedData = Buffer.from(secretString).toString('base64');
    const authString = "Basic " + encodedData;
    console.log(authString); 
    return axios.create({
        baseURL: "https://accounts.spotify.com/api/",
        headers: {
            "Authorization": authString,
            "Content-Type": "application/x-www-form-urlencoded",
  //         "grant_type": "client_credentials"
        }

    })
}

const spotifyAxiosRequestTwo = (token) => {
    const tokenString = "Bearer " + token;
    console.log(tokenString);
    return axios.create({
        baseURL: "https://api.spotify.com/v1/",
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/x-www-form-urlencoded"
        }
    })
}

function getTracks(queryKeywords){
    let searchedSongs;
    let queryString = "q=" + queryKeywords.replace(" ", "%20") + "&type=track";
    console.log(queryString);
    let tracksPromise = new Promise((resolve, reject) => {
        spotifyAxiosRequestOne()
        .post('/token', qs.stringify({grant_type: "client_credentials"}))
        .then(response => {
            spotifyAxiosRequestTwo(response.data.access_token)
                .get(`/search?${queryString}`)
                .then(response2 => {
                    resolve(response2.data.tracks.items);
                })
                .catch(err => {
                    reject(`There was an error querying the spotify database ${err}`);
                });
        })
        .catch(err => {
            reject(`There was an error with running the spotify api call: ${err}`)
        });
    });
    return tracksPromise;
}

module.exports = {getTracks};