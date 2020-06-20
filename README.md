# back-end


# Schema Design
    https://dbdesigner.page.link/frQxd6GnZvjEjzr78

# Object schema

-----Track Object-----

track: {

  song_name: "name of song",
  album_name: "name of album",
  duration_ms: 12341234,
  song_url: "url/tosong.html",
  album_art: "url/toalbumart.png"
  ...
}

-----Similar Tracks-----

{
    related_tracks: [{song_name: ...},{...}] <-- this will be an array of track objects
}

-----Saved Songs-----

saved_songs: [{songName: ...}] <--- this will be an array of all of the saved tracks that a user has

-----User Object (sent to API)-----

{
    username: "Username",
    password: "password!123"
}

# endpoints

GET SAVED SONGS OF USER
- get api/savedsongs/{userId}-----------------> returns a saved_songs object based on the user ID see above and a status code of 200
-- error handling: {coming soon}

REGISTER NEW USER
- post api/register ------> send a user object, will return 201 status code on success

LOGIN
- post api/login----> send a user object, will return 200 status code on success, jwt



