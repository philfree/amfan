/**
 * Boot strap, initialized with dummy data
 */

   Meteor.startup(function() {
    
    if (Teams.find().count() === 0) {
        team1_id = Teams.insert({team_id:1, name: 'Glendale Owls', logo_small: 'owls.png'});
        team2_id = Teams.insert({team_id:2, name: 'Venice Bears', logo_small: 'bears.png'});
        console.log("team1:"+team1_id+", team2:"+team2_id);    
    }
    if (Games.find().count() === 0) {
        game_id = Games.insert({name:'game1', team1_id:team1_id, team2_id:team2_id, team1_score:2, team2_score:2});
        console.log("setting Game New game:"+game_id);
    } else {
        game = Games.find({name:'game1'}).fetch()[0];
        console.log("Game Loading game:"+game._id);
        game_id = game._id;
    }
    if (Players.find().count() === 0) {
        Players.insert({name: 'Lucas Mills', team_id:team1_id, score: 0, player_number: 18, position: 'guard', picture: 'lucas_mills.jpg', fanpoints:0, foul:0, in_game:1});
        Players.insert({name: 'Dow Tang', team_id:team1_id, score:0, player_number: 95, position: 'guard', picture: 'dow_tang.jpg', fanpoints:0, foul:0, in_game:1});
        Players.insert({name: 'Marc Nager', team_id:team1_id, score:0, player_number: 22, position: 'forward', picture: 'marc_nager.jpg', fanpoints:0, foul:0, in_game:1});
        Players.insert({name: 'Jared Loson', team_id:team1_id, score:0, player_number: 9, position: 'forward', picture: 'jared_loson.jpg', fanpoints:0, foul:0, in_game:1});
        Players.insert({name: 'Albert Buchman', team_id:team1_id, score:0, player_number: 12, position: 'center', picture: 'albert_buchman.jpg', fanpoints:0, foul:0, in_game:1});
        Players.insert({name: 'Michael Jakab', team_id:team2_id,  score: 0, player_number: 2, position: 'guard', picture: 'michael_jakab.jpg', fanpoints:0, foul:0, in_game:1});
        Players.insert({name: 'Charles Yawson', team_id:team2_id,  score:0, player_number: 24, position: 'guard', picture: 'charles_yawson.jpg', fanpoints:0, foul:0, in_game:1});
        Players.insert({name: 'Jonathan Lane', team_id:team2_id,  score:0, player_number: 10, position: 'forward', picture: 'jonathan_lane.jpg', fanpoints:0, foul:0, in_game:1});
        Players.insert({name: 'Phil Larson', team_id:team2_id,  score:0, player_number: 14, position: 'forward', picture: 'phil_larson.jpg', fanpoints:0, foul:0, in_game:1});
        Players.insert({name: 'Patrick Britain', team_id:team2_id, score:0, player_number: 32, position: 'center', picture: 'patrick_britain.jpg', fanpoints:0, foul:0, in_game:1});
            
        Players.insert({name: 'Sub1', team_id:team1_id, score:0, player_number: 22, position: 'center', picture: 'jared_loson.jpg', fanpoints:0, foul:0, in_game:0});
        Players.insert({name: 'Sub1', team_id:team1_id, score:0, player_number: 22, position: 'center', picture: 'jared_loson.jpg', fanpoints:0, foul:0, in_game:0});
        Players.insert({name: 'Sub1', team_id:team1_id, score:0, player_number: 22, position: 'center', picture: 'jared_loson.jpg', fanpoints:0, foul:0, in_game:0});
        Players.insert({name: 'Sub1', team_id:team1_id, score:0, player_number: 22, position: 'center', picture: 'jared_loson.jpg', fanpoints:0, foul:0, in_game:0});
        Players.insert({name: 'Sub1', team_id:team1_id, score:0, player_number: 22, position: 'center', picture: 'jared_loson.jpg', fanpoints:0, foul:0, in_game:0});
        Players.insert({name: 'Sub1', team_id:team1_id, score:0, player_number: 22, position: 'center', picture: 'jared_loson.jpg', fanpoints:0, foul:0, in_game:0});
        
        Players.insert({name: 'Sub2', team_id:team2_id, score:0, player_number: 34, position: 'forward', picture: 'michael_jakab.jpg', fanpoints:0, foul:0, in_game:1});
        Players.insert({name: 'Sub2', team_id:team2_id, score:0, player_number: 34, position: 'forward', picture: 'michael_jakab.jpg', fanpoints:0, foul:0, in_game:1});
        Players.insert({name: 'Sub2', team_id:team2_id, score:0, player_number: 34, position: 'forward', picture: 'michael_jakab.jpg', fanpoints:0, foul:0, in_game:1});
        Players.insert({name: 'Sub2', team_id:team2_id, score:0, player_number: 34, position: 'forward', picture: 'michael_jakab.jpg', fanpoints:0, foul:0, in_game:1});
        Players.insert({name: 'Sub2', team_id:team2_id, score:0, player_number: 34, position: 'forward', picture: 'michael_jakab.jpg', fanpoints:0, foul:0, in_game:1});
        Players.insert({name: 'Sub2', team_id:team2_id, score:0, player_number: 34, position: 'forward', picture: 'michael_jakab.jpg', fanpoints:0, foul:0, in_game:1});
    }


    Accounts.loginServiceConfiguration.insert({
      service: "facebook",
      appId: "112254545474887",
      secret: "c4585153e5ac35fc73f880a503142a17"
    });


   });

//}
