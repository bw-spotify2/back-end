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
    let queryString = "q=" + queryKeywords.replace(" ", "%20") + "&type=track&limit=5";
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

function getTrack(spotifySongID){
    let getTrackPromise = new Promise((resolve, reject) => {
        spotifyAxiosRequestOne()
        .post('/token', qs.stringify({grant_type: "client_credentials"}))
        .then(response => {
            spotifyAxiosRequestTwo(response.data.access_token)
            .get(`/tracks/${spotifySongID}`)
            .then(response2 => {
                console.log(response2.data);
                resolve(response2.data);
            })
            .catch(err => {
                reject(`There was an error getting the track from the api ${err}`);
            })
        })
        .catch(err => {
            reject(`There was an error getting the track from the api ${err}`);
        })
    });
    return getTrackPromise;
}

function getSongAnalysis(spotifySongID){
    let songAnalysisPromise = new Promise((resolve, reject) => {
        spotifyAxiosRequestOne()
        .post('/token', qs.stringify({grant_type: "client_credentials"}))
        .then(response => {
            spotifyAxiosRequestTwo(response.data.access_token)
                .get(`/audio-features/${spotifySongID}`)
                .then(response2 => {
                    console.log(response2.data);
                    resolve(response2.data);
                })
                .catch(err => {
                    reject(`There was an error retrieving the song analysis data from the api ${err}`);
                });
        })
        .catch(err => {
            reject(`There was an error with running the spotify api call: ${err}`);
        })
    });

    return songAnalysisPromise;
}

module.exports = {getTracks, getSongAnalysis, getTrack};