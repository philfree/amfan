// Game activity javascript functions

     Session.set("score", 0);
     Session.set("team1_name", "NextSpace");
     Session.set("team2_name", "Coloft"); 
     Session.set("team1_action", "players");
     Session.set("team2_action", "players");
     Session.set("possession", "team1");
     Session.set("screen", "game_activity");


  Template.player_selection.team1_action_is = function(action) {
      if (Session.get("team1_action") == action) { return true; } else { return false; }
  };

  Template.main_team1_subactions.team1_subaction_is = function(action) {
      if (Session.get("team1_subaction") == action) { return true; } else { return false; }
  };

  Template.player_selection.players_team1 = function () {
    return Players.find({team_id:1}, {sort: {score: -1, name: 1}});
  };

  Template.player_selection.players_team2 = function () {
    return Players.find({team_id:2}, {sort: {score: -1, name: 1}});
  };

  Template.player_selection.events = {
    'click input.close' : function () {
       Session.set("team1_action", "players");
       console.log("clicked on the close button");
    }
  } 

  Template.player_select.selected = function () {
    return Session.equals("selected_player", this._id) ? "selected" : '';
  };

  Template.game_activity.screen_is = function (screen) {
     return Session.equals("screen", screen);
  };

  Template.player_select.events = {
    'click' : function () {
      // template data, if any, is available in 'this'
       var player = Players.find(this._id).fetch()[0];
       console.log("You pressed the button on player:"+player.name+" id"+this._id);
       Session.set("selected_player", this._id);
       Session.set("team1_action", "main");

    }
  };

  Template.main_team1_actions.events = {

    'click input.reboundp' : function () {
		Session.set("team1_action", "subaction");
        Session.set("team1_subaction", "reboundp");
	},
    'click input.shot' : function () {
		Session.set("team1_action", "subaction");
        Session.set("team1_subaction", "shot");
	},
	'click input.turnover' : function () {
        Session.set("team1_action", "subaction");
        Session.set("team1_subaction", "turnover");
    },
    'click input.foul' : function () {
        Session.set("team1_action", "subaction");
        Session.set("team1_subaction", "foul");
    },
    'click input.rebound' : function () {
        Session.set("team1_action", "subaction");
        Session.set("team1_subaction", "rebound");
    }, 
    'click input.steal' : function () {
        Session.set("team1_action", "subaction");
        Session.set("team1_subaction", "steal");
    }, 
    'click input.block' : function () {
        Session.set("team1_action", "subaction");
        Session.set("team1_subaction", "block"); 
    }, 
  }

  Template.main_team1_subactions.events = {
    'click input.shot_2' : function () {
		Session.set("team1_action", "players");
        
        var points = 2;
        Session.set("team1_subaction", "");
        console.log("Recording shot +"+points);
        Session.set("possession", "team2");
        var player = Players.find(Session.get("selected_player")).fetch()[0];
        Actions.insert({player_id: Session.get("selected_player"), game_id: 1, action_name: 'shot', sub_action:'shot+2', feed_text: player.name+' made a shot, +2 points', points: 2});
        Players.update(Session.get("selected_player"), {$inc: {score: points}});
        Games.update({name:'game1'},{$inc: {team1_score: points}});
        //Meteor.flush();

	},
    'click input.shot_2_assist' : function () {
		Session.set("team1_action", "players");
        var points = 2;
        Session.set("team1_subaction", "");
        console.log("Recording shot assist +"+points);
        Session.set("possession", "team2");
        var player = Players.find(Session.get("selected_player")).fetch()[0];
        Actions.insert({player_id: Session.get("selected_player"), game_id: 1, action_name: 'shot', sub_action:'shot+2', feed_text: player.name+' made a shot, 2 points assist', points: 2});
        Players.update(Session.get("selected_player"), {$inc: {score: points}});
        Games.update({name:'game1'},{$inc: {team1_score: points}});
        Meteor.flush();
	}
  }

  Template.main_team1_actions.team1_possession = function () {
     return Session.equals("possession", "team1");
  };
  Template.main_team2_actions.team2_possession = function () {
     return Session.equals("possession", "team2");
  };

  Template.score_board.score_team1 = function() {
      console.log("game_id="+Session.get("game_id"));
      var game = Games.findOne({name:'game1'});
      if (game) {
        return game.team1_score;
      } else { return 0; }
  }

  Template.score_board.score_team2 = function() {
      var game = Games.findOne({name: 'game1'});
      if (game) { 
         return game.team2_score;
      } else { return 0; }
  }

  Template.action_feed.actions = function() {
	 return actions = Actions.find({}, {sort: {_id: -1}});
  }
