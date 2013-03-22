/**
 * Boot strap, initialized with dummy data
 */

if (Meteor.is_server) {
   Meteor.startup(function() {

     if (Teams.find().count() === 0) {
         Teams.insert({team_id:1, name: 'Glendale Owls', logo_small: 'owls.png'});
         Teams.insert({team_id:2, name: 'Venice Bears', logo_small: 'bears.png'});
     }
     if (Players.find().count() === 0) {
        Players.insert({name: 'Lucas Mills', team_id:1, game_id:1, score: 0, player_number: 18, position: 'guard', picture: 'lucas_mills.jpg', fanpoints:0});
        Players.insert({name: 'Dow Tang', team_id:1, game_id:1, score:0, player_number: 95, position: 'guard', picture: 'dow_tang.jpg', fanpoints:0});
        Players.insert({name: 'Marc Nager', team_id:1, game_id:1, score:0, player_number: 22, position: 'forward', picture: 'marc_nager.jpg', fanpoints:0});
        Players.insert({name: 'Jared Loson', team_id:1, game_id:1, score:0, player_number: 9, position: 'forward', picture: 'jared_loson.jpg', fanpoints:0});
        Players.insert({name: 'Albert Buchman', team_id:1, game_id:1, score:0, player_number: 12, position: 'center', picture: 'albert_buchman.jpg', fanpoints:0});
        Players.insert({name: 'Michael Jakab', team_id:2, game_id:1, score: 0, player_number: 2, position: 'guard', picture: 'michael_jakab.jpg', fanpoints:0});
        Players.insert({name: 'Charles Yawson', team_id:2, game_id:1, score:0, player_number: 24, position: 'guard', picture: 'charles_yawson.jpg', fanpoints:0});
        Players.insert({name: 'Jonathan Lane', team_id:2, game_id:1, score:0, player_number: 10, position: 'forward', picture: 'jonathan_lane.jpg', fanpoints:0});
        Players.insert({name: 'Phil Larson', team_id:2, game_id:1, score:0, player_number: 14, position: 'forward', picture: 'phil_larson.jpg', fanpoints:0});
        Players.insert({name: 'Patrick Britain', team_id:2, game_id:1, score:0, player_number: 32, position: 'center', picture: 'patrick_britain.jpg', fanpoints:0});
     }
	 if (Games.find().count() === 0) {
		var game_id = Games.insert({name:'game1', team1_id:1, team2_id:2, team1_score:2, team2_score:2});
        //Session.setDefault("game_id", game_id);
        console.log("setting Game New game:"+game_id);
 	} else {
        var game = Games.find({name:'game1'}).fetch()[0];
        //Session.setDefault("game_id", game._id);
        console.log("setting Game Loading game:"+game._id);
    }

    Accounts.loginServiceConfiguration.insert({
      service: "facebook",
      appId: "112254545474887",
      secret: "c4585153e5ac35fc73f880a503142a17"
    });


   });
}
