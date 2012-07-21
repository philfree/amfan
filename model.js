////////// Shared code (client and server) //////////

//Games = new Meteor.Collection('games');
// { clock: 60, teams: [{team_id, name, score}], winners: [team_id] }

//Teams = new Meteor.Collection('teams');
// { name: NextSpace, players: [{player_id, name}]

Actions = new Meteor.Collection('actions');
// {player_id: 10, game_id: 123, action_name: 'foul', sub_action:'personal', feed_text: 'Foul on Jared', points: 0}
// {player_id: 10, game_id: 123, action_name: 'shot', sub_action:'+3', feed_text: 'Jared made a shot', points: 3}


Players = new Meteor.Collection('players');
// {name: 'matt', team_id: 123, game_id: 123, score: 50, picture: './image.jpg'}



Meteor.methods({
  add_action: function (action_details) {
    //var game = Games.findOne(game_id);
    Actions.insert(action_details);
    // client and server can both check: must be at least three chars
    // long, not already used, and possible to make on the board.
    //if (word.length < 3
    //    || Words.find({game_id: word.game_id, word: word.word}).count() > 1
    //    || paths_for_word(game.board, word.word).length === 0) {
    //  Words.update(word._id, {$set: {score: 0, state: 'bad'}});
    //  return;
    //}

    // now only on the server, check against dictionary and score it.
    if (Meteor.is_server) {
    //  if (DICTIONARY.indexOf(word.word.toLowerCase()) === -1) {
    //    Words.update(word._id, {$set: {score: 0, state: 'bad'}});
    //  } else {
    //    var score = Math.pow(2, word.word.length - 3);
    //    Words.update(word._id, {$set: {score: score, state: 'good'}});
    //  }
		
    }
   
  }
});


if (Meteor.is_server) {
   Meteor.startup(function() {

     Session.set("score", 0);
     Session.set("game_id", 1);
     Session.set("team1_name", "NextSpace");
     Session.set("team2_name", "Coloft"); 

     if (Players.find().count() === 0) {
        Players.insert({name: 'Jared', team_id:1, game_id:1, score: 0, picture: 'jared.jpg'});
        Players.insert({name: 'Mike', team_id:1, game_id:1, score:0, picture: 'mike.jpg'});
        Players.insert({name: 'Philippe', team_id:1, game_id:1, score:0, picture: 'philippe.jpg'});
        Players.insert({name: 'Avesta', team_id:2, game_id:1, score:0, picture: 'avesta.jpg'});
        Players.insert({name: 'Cameron', team_id:2, game_id:1, score:0, picture: 'cameron.jpg'});
                
     }

   });



  // publish all the non-idle players.
//  Meteor.publish('players', function () {
//    return Players.find({idle: false});
//  });

  // publish single games
//  Meteor.publish('games', function (id) {
//    return Games.find({_id: id});
//  });

  // publish all my words and opponents' words that the server has
  // scored as good.
//  Meteor.publish('words', function (game_id, player_id) {
//    return Words.find({$or: [{game_id: game_id, state: 'good'},
//                             {player_id: player_id}]});
//  });
}

