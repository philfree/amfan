////////// Shared code (client and server) //////////

Games = new Meteor.Collection('games');
// { clock: 60, teams: [{team_id, name, score}], winners: [team_id] }

//Teams = new Meteor.Collection('teams');
// { name: NextSpace, players: [{player_id, name}]

Actions = new Meteor.Collection('actions');
// {player_id: 10, game_id: 123, action_name: 'foul', sub_action:'personal', feed_text: 'Foul on Jared', points: 0}
// {player_id: 10, game_id: 123, action_name: 'shot', sub_action:'+3', feed_text: 'Jared made a shot', points: 3}


Players = new Meteor.Collection('players');
// {name: 'matt', team_id: 123, game_id: 123, score: 50, player_number: 18, position: 'guard' picture: './image.jpg'}



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
   
  },
  switch_possession: function () {
     if(Session.equal("possession", "team1")) {
		Session.set("possession", "team2");
     } else {
		Session.set("possession", "team1");
     }
  } 
});


if (Meteor.is_server) {
   Meteor.startup(function() {

     Session.set("score", 0);
     Session.set("game_id", 1);
     Session.set("team1_name", "NextSpace");
     Session.set("team2_name", "Coloft"); 
     Session.set("team1_action", "players");
     Session.set("team2_action", "players");
     Session.set("team1_score", 0);
     Session.set("team2_score", 0);
     Session.set("posession", "team1");

     if (Players.find().count() === 0) {
        Players.insert({name: 'Lucas Mills', team_id:1, game_id:1, score: 0, player_number: 18, position: 'guard', picture: 'lucas_mills.jpg'});
        Players.insert({name: 'Dow Tang', team_id:1, game_id:1, score:0, player_number: 95, position: 'guard', picture: 'dow_tang.jpg'});
        Players.insert({name: 'Marc Nager', team_id:1, game_id:1, score:0, player_number: 22, position: 'forward', picture: 'marc_nager.jpg'});
        Players.insert({name: 'Jared Loson', team_id:1, game_id:1, score:0, player_number: 9, position: 'forward', picture: 'jared_loson.jpg'});
        Players.insert({name: 'Albert Buchman', team_id:1, game_id:1, score:0, player_number: 12, position: 'center', picture: 'albert_buchman.jpg'});
        Players.insert({name: 'Michael Jakab', team_id:2, game_id:1, score: 0, player_number: 2, position: 'guard', picture: 'michael_jakab.jpg'});
        Players.insert({name: 'Charles Yawson', team_id:2, game_id:1, score:0, player_number: 24, position: 'guard', picture: 'charles_yawson.jpg'});
        Players.insert({name: 'Jonathan Lane', team_id:2, game_id:1, score:0, player_number: 10, position: 'forward', picture: 'jonathan_lane.jpg'});
        Players.insert({name: 'Phil Larson', team_id:2, game_id:1, score:0, player_number: 14, position: 'forward', picture: 'phil_larson.jpg'});
        Players.insert({name: 'Patrick Britain', team_id:2, game_id:1, score:0, player_number: 32, position: 'center', picture: 'patrick_britain.jpg'});
     }
	 if (Games.find().count() === 0) {
		var game_id = Games.insert({name:'game1', team1_id:1, team2_id:2, team1_score:2, team2_score:2});
        Session.set("game_id", game_id);
        console.log("setting Game New game:"+game_id);
 	} else {
        var game = Games.find({name:'game1'}).fetch()[0];
        Session.set("game_id", game._id);
        console.log("setting Game Loading game:"+game._id);
    }

   });



  // publish all the non-idle players.
//  Meteor.publish('players', function () {
//    return Players.find({idle: false});
//  });

  // publish single games
  Meteor.publish('games', function (id) {
    return Games.find({_id: id});
  });

  // publish all my words and opponents' words that the server has
  // scored as good.
//  Meteor.publish('words', function (game_id, player_id) {
//    return Words.find({$or: [{game_id: game_id, state: 'good'},
//                             {player_id: player_id}]});
//  });
}

