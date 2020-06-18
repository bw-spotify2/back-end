# back-end

# Object schema

# Track Object:
_____________________

track: {
  song_name: "name of song",
  album_name: "name of album",
  duration_ms: 12341234,
  song_url: "url/tosong.html",
  album_art: "url/toalbumart.png"
}

# Similar tracks:
____________________________

related_tracks: [{song_name: ...}] <-- this will be an array of track objects

# Saved Songs
_____________________________

savedSongs: [{songName: ...}] <--- this will be an array of all of the saved tracks that a user has

# End Points
______________________________

