const express    = require('express')
const cors       = require('cors')
const bodyParser = require('body-parser')
const app        = express();
const mongo      = require('mongodb');
var shuffle = require('shuffle-array')

app.use(cors({origin: true}));


app.use(bodyParser.json())

var MongoClient = mongo.MongoClient;
var url = 'mongodb://localhost/';
var friends_m = []
var all = []

MongoClient.connect(url, function(err, mongo_db) {
    console.log("Connected");
});


app.get('/music/:user', (req, res) => {
    var musics =[];
    var similares = [];
    var friends_music = [];
    var listen = [];
    MongoClient.connect( url, ( err, mongo_db ) => {
        if (err) throw err;
        var dbo = mongo_db.db("mydb");
        var m = req.params.user;
        console.log(m); 
        dbo.collection('sbs').find( { name: m }).sort( { PesoTotal: -1 }).toArray( (err_a, result) => {
            if(err_a) throw err_a;
            
            if(result.length == 0) res.send([]);

            // first add every track
            for( i=0; i<result.length;i++){
                listen.push( {
                    track: result[i].Track,
                    url: result[i].ImageURLTrack
                });
            }

            //Then add the similar
            for( i=0; i<result.length;i++){
                if ( "TrackSimilar1" in result[i] ) {
                    similares.push( {
                        track: result[i].TrackSimilar1,
                        url: result[i].ImageURLTrackSimilar1
                    });
                }
                
                if ( "TrackSimilar2" in result[i] ) {
                    similares.push( {
                        track: result[i].TrackSimilar2,
                        url: result[i].ImageURLTrackSimilar2
                    });
                }

                if ( "TrackSimilar3" in result[i] ) {
                    similares.push( {
                        track: result[i].TrackSimilar3,
                        url: result[i].ImageURLTrackSimilar3
                    });
                }
            }
              

            for( i = 0; i < listen.length; i++ )
            musics.push(listen[i])
            for( i = 0; i < similares.length; i++ )    
            musics.push(similares[i])

            res.send({ "musics": musics, "listen": listen})
            mongo_db.close();
        });
            
    });
});

app.get('/music/:user/similar', (req, res) => {
    var musics =[];
    var similares = [];
    var friends_music = [];
    var listen = [];
    MongoClient.connect( url, ( err, mongo_db ) => {
        if (err) throw err;
        var dbo = mongo_db.db("mydb");
        var m = req.params.user;
        console.log(m);
        dbo.collection('sbs').find( { name: m }).sort( { PesoTotal: -1 }).toArray( (err_a, result) => {
            if(err_a) throw err_a;
            
            if(result.length == 0) res.send([]);

            // first add every track
            for( i=0; i<result.length;i++){
                listen.push( {
                    track: result[i].Track,
                    url: result[i].ImageURLTrack
                });
            }

            //Then add the similar
            for( i=0; i<result.length;i++){
                if ( "TrackSimilar1" in result[i] ) {
                    similares.push( {
                        track: result[i].TrackSimilar1,
                        url: result[i].ImageURLTrackSimilar1
                    });
                }
                
                if ( "TrackSimilar2" in result[i] ) {
                    similares.push( {
                        track: result[i].TrackSimilar2,
                        url: result[i].ImageURLTrackSimilar2
                    });
                }

                if ( "TrackSimilar3" in result[i] ) {
                    similares.push( {
                        track: result[i].TrackSimilar3,
                        url: result[i].ImageURLTrackSimilar3
                    });
                }
            }
              
            for( i = 0; i < similares.length; i++ )    
            musics.push(similares[i])

            res.send({"musics": musics, "similares": similares})
            mongo_db.close();
        });
    });
});


app.get('/music/:user/friends', (req, res) => {
    var friends_music = [];
    MongoClient.connect( url, ( err, mongo_db ) => {
        if (err) throw err;
        var dbo = mongo_db.db("mydb");
        var m = req.params.user;
        console.log(m);
        
        dbo.collection('sbs').find( { name: m }).sort( { PesoTotal: -1 }).toArray( (err_a, resu) => {
            if(err_a) throw err_a;
            var friends = resu[0].Friends;
            /*
            var k = ""
            for(let i=0 ; i<randomF.length; i++){
                    console.log(checkUser(randomF[i]))
                    if (checkUser(randomF[i])==true){
                        console.log(checkUser(randomF[i]))
                    k = randomF[i]
                    i=randomF.length;
                }
            }
            console.log(k)*/
            console.log(friends)
            res.send({"friends" : friends})
            mongo_db.close()

            /*
            //if(k.length!=0){
                dbo.collection('sbs').find( { name: m }).sort( { PesoTotal: -1 }).toArray( function(err_b, result) {
                    if(err_b) throw err_b;
                    //console.log(k)
                    //console.log(friends[k])
                    //console.log(result)    
                    //console.log(result.Track)
                        // first add every track
                        console.log("entrei")
                        for( i=0; i<result.length;i++){
                            friends_music.push( {
                                track: result[i].Track,
                                url: result[i].ImageURLTrack
                            });
                        }
                
                        //Then add the similar
                        for( i=0; i<result.length;i++){
                            if ( "TrackSimilar1" in result[i] ) {
                                friends_music.push( {
                                    track: result[i].TrackSimilar1,
                                    url: result[i].ImageURLTrackSimilar1
                                });
                            }
                            
                            if ( "TrackSimilar2" in result[i] ) {
                                friends_music.push( {
                                    track: result[i].TrackSimilar2,
                                    url: result[i].ImageURLTrackSimilar2
                                });
                            }

                            if ( "TrackSimilar3" in result[i] ) {
                                friends_music.push( {
                                    track: result[i].TrackSimilar3,
                                    url: result[i].ImageURLTrackSimilar3
                                });
                            }
                        }
                        //friends_m.push(user_musics(friends_music))
                        //console.log("AAAA"+ friends_m)
                        //res.write(JSON.stringify({ "friends_music": friends_music}))
                        //mongo_db.close();
                        res.send({ "friends_music": friends_music})
                });
            //}
            mongo_db.close();
            //console.log("########################"+friends_m)
            //res.send({ "friends_m": friends_m})
            //res.end()*/
        });
    });
});

app.get('/music/:user/musicf', (req, res) => {
    var musics =[];
    var similares = [];
    var friends_music = [];
    var musicf = [];
    MongoClient.connect( url, ( err, mongo_db ) => {
        if (err) throw err;
        var dbo = mongo_db.db("mydb");
        var m = req.params.user;
        console.log(m); 
        dbo.collection('sbs').find( { name: m }).sort( { PesoTotal: -1 }).toArray( (err_a, result) => {
            if(err_a) throw err_a;
            
            if(result.length == 0) res.send([]);

            // first add every track
            for( i=0; i<result.length;i++){
                musicf.push( {
                    track: result[i].Track,
                    url: result[i].ImageURLTrack
                });
            }

            //Then add the similar
           
              

            for( i = 0; i < musicf.length; i++ )
            musics.push(musicf[i])


            res.send({ "musics": musics, "musicf": musicf})
            mongo_db.close();
        });
            
    });
});


app.get('/tags', (req, res) => {
    var tags =[];
    MongoClient.connect( url, (err, mongo_db) => {
        if(err) throw err;
        var dbo = mongo_db.db("mydb");
        dbo.collection('tracks').distinct("GenreTag", (err, result) =>{
            if(err)throw err;
            console.log(result)
            for( i = 0; i < result.length; i++ )
            tags.push(result[i])
            res.send({"tags": tags});
        })
    })
})


app.get('/tags/:genre', (req, res) => {
    var top = []
    MongoClient.connect( url, ( err, mongo_db ) => {
        if(err) throw err;
        var genre = req.params.genre;
        mongo_db.db("mydb").collection('tracks').find( { GenreTag: genre }).limit(28).sort( { "In-Tag Rank": 1 }).toArray( (err, result) => {
            if(err) throw err;
            for( i = 0; i < result.length; i++ )
            top.push(result[i])
            res.send({"top": top});
            mongo_db.close();
        });
    })
})

app.listen('3333', (err) => {
    if(err) throw err;
    console.log('Server started on port 3333');
});
