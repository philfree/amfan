// Game activity javascript functions
Games = new Meteor.Collection("games");
Teams = new Meteor.Collection('teams');
Actions = new Meteor.Collection('actions');
Players = new Meteor.Collection('players');


    // Session.set("screen", "head2head");
    Session.set("screen", "game_activity");
    Session.set('editing_player', null);
    Session.set('setup_mode', false);
	// Session.setDefault("game_id", game._id);

    Session.setDefault("score", 0);
    Session.setDefault("team1_action", "players");
    Session.setDefault("team2_action", "players");
    Session.setDefault("team1_score", 0);
    Session.setDefault("team2_score", 0);
    Session.setDefault("posession", "team1");
    Session.setDefault("game_id", null);
    Session.setDefault("team1_id", null);
    Session.setDefault("team2_id", null);

    // Subscribe to the first game on startup
    var gamesHandle = Meteor.subscribe('games', function () {
      if (!Session.get('game_id')) {
        game = Games.findOne({_id:'hpXYDxyRdFPivsuqa'});
        if (game) {
            // Router.setGame(game._id);        
            Session.set("game_id", game._id);
            console.log("Gameid on client:"+game._id);
        }
      }
    });
    var teamsHandle = Meteor.subscribe('teams', function () {
        var game_id = Session.get('game_id');
        var game = Games.findOne({_id:game_id});
        if (game) {
            //team = Meteor.subscribe('teams');
            console.log('Team1_id:'+game.team1_id);
            console.log('Team2_id:'+game.team2_id);
            Session.set('team1_id', game.team1_id);
            Session.set('team2_id', game.team2_id);
        } else {
            console.log('Found no teams for game');
        }
    });
    var PlayerHandle = Meteor.subscribe('players');
    var ActionHandle = Meteor.subscribe('actions');

// Deps.autorun(function () {
//   var game_id = Session.get('game_id');
//   var game = Games.findOne({_id:game_id})
//   if (game) {
//     team = Meteor.subscribe('teams', game_id);
//     console.log('Team1:'+game.team1_id);
//     console.log('Team2:'+game.team2_id);
//   } else {
//     console.log('Found no teams for game');
//   }
// });



var activateInput = function (input) {
  input.focus();
  input.select();
};

var getTeamName = function (teamId) {
    var team = Teams.findOne({_id: teamId});
    if (team) { 
        return team.name;
    }
}


  Template.player_selection.team1_action_is = function(action) {
      if (Session.get("team1_action") == action) { return true; } else { return false; }
  };

  Template.main_team1_subactions.team1_subaction_is = function(action) {
      if (Session.get("team1_subaction") == action) { return true; } else { return false; }
  };
  Template.player_selection.team2_action_is = function(action) {
      if (Session.get("team2_action") == action) { return true; } else { return false; }
  };
  Template.main_team2_subactions.team2_subaction_is = function(action) {
      if (Session.get("team2_subaction") == action) { return true; } else { return false; }
  };
  Template.player_selection.players_team1 = function () {
    return Players.find({team_id:Session.get("team1_id")}, {sort: {score: -1, name: 1}});
  };

  Template.player_selection.players_team2 = function () {
    return Players.find({team_id:Session.get("team2_id")}, {sort: {score: -1, name: 1}});
  };
  Template.player_selection.team1_active = function() {
      return Session.equals("possession", "team1") ? "active" : '';
  };
  Template.player_selection.team2_active = function() {
      return Session.equals("possession", "team2") ? "active" : '';
  };
  Template.score_board.team1_active = function() {
      return Session.equals("possession", "team1") ? "active" : '';
  };
  Template.score_board.team2_active = function() {
      return Session.equals("possession", "team2") ? "active" : '';
  };

 // Template.player_selection.events = {
 //   'click input.close' : function () {
 //      Session.set("team1_action", "players");
 //      console.log("clicked on the close button");
 //   }
 // } 

  Template.player_select.selected = function () {
    return Session.equals("selected_player", this._id) ? "selected" : '';
  };

  Template.player_select.in_game = function () {
      if (this.in_game === 0) { return "out"; }
  }

  Template.game_activity.screen_is = function (screen) {
     return Session.equals("screen", screen);
  };
  
  Template.player_select.editing = function () {
	return Session.equals('editing_player', this._id);
  };

  Template.player_selection.editing = function () {
	return Session.equals('editing_team', this._id);
  };
  

  Template.main_team1_actions.team1_possession = function () {
     return Session.equals("possession", "team1");
  };
  Template.main_team2_actions.team2_possession = function () {
     return Session.equals("possession", "team2");
  };

  Template.score_board.score_team1 = function() {
      console.log("game_id="+Session.get("game_id"));
      var game = Games.findOne({_id:Session.get("game_id")});
      if (game) {
        return game.team1_score;
      } else { return 0; }
  };

  Template.score_board.score_team2 = function() {
      var game = Games.findOne({_id:Session.get("game_id")});
      if (game) { 
         return game.team2_score;
      } else { return 0; }
  };
  
  Template.score_board.name_team1 = function() {
      console.log("team_1:"+Session.get("team1_id"));
      return getTeamName(Session.get("team1_id"));
  };
  Template.score_board.name_team2 = function() {
      return getTeamName(Session.get("team2_id"));
  };
  
  Template.player_selection.team1 = function() {
      return Teams.findOne({_id: Session.get("team1_id")});
  };
  Template.player_selection.team2 = function() {
      return Teams.findOne({_id: Session.get("team2_id")});
  };

  Template.action_feed.actions = function() {
	 return actions = Actions.find({}, {sort: {date_created:-1}});
  };
