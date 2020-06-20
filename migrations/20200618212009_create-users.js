
exports.up = function(knex) {
    return knex.schema.createTable('users', tbl => {
        tbl.increments();
        tbl.text('username', 128).unique().notNullable();
        tbl.text('password', 128);
    }).createTable('saved_songs', tbl => {
        tbl.increments();
        tbl.text('spotify_track_id').notNullable();
        tbl.integer('user_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('users');
        tbl.text('song_name').notNullable();
        tbl.text('album_name').notNullable();
        tbl.integer('duration_ms').notNullable();
        tbl.text('song_url').notNullable();
        tbl.text('album_art').notNullable();
        tbl.text('key').notNullable();
        tbl.text('mode').notNullable();
        tbl.integer('time_signature').notNullable();
        tbl.float('acousticness');
        tbl.float('danceability');
        tbl.float('energy');
        tbl.float('instrumentalness');
        tbl.float('liveness');
        tbl.float('loudness');
        tbl.float('speechiness');
        tbl.float('valence');
        tbl.float('tempo');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('saved_songs')
    .dropTableIfExists('users');
};
