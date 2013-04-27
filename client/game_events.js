/****
 * All events for the game activity
 ****/



////////// Helpers for in-place editing //////////
// May need to move this somewhere else.

// Returns an event map that handles the "escape" and "return" keys and
// "blur" events on a text input (given by selector) and interprets them
// as "ok" or "cancel".

var okCancelEvents = function (selector, callbacks) {
  var ok = callbacks.ok || function () {};
  var cancel = callbacks.cancel || function () {};

  var events = {};
  events['keyup '+selector+', keydown '+selector+', focusout '+selector] =
    function (evt) {
      if (evt.type === "keydown" && evt.which === 27) {
        // escape = cancel
        cancel.call(this, evt);

      } else if (evt.type === "keyup" && evt.which === 13 ||
                 evt.type === "focusout") {
        // blur/return/enter = ok/submit if non-empty
        var value = String(evt.target.value || "");
        if (value)
          ok.call(this, value, evt);
        else
          cancel.call(this, evt);
      }
    };
  return events;
};


  Template.player_selection.events({
      'click h2' : function (evt, tmpl) {
          if (Session.equals('setup_mode', true)) {
            console.log(" Event catching:"+this._id); 
            var team = Teams.findOne({_id: this._id});
            console.log("team:"+team.name);
            Session.set('editing_team', this._id);
    		Meteor.flush(); // update DOM before focus
			activateInput(tmpl.find("#team-name-input"));
          }
        }
    
  });
  Template.player_selection.events(okCancelEvents(
  '#team-name-input',
  {
    ok: function (value) {
      Teams.update(this._id, {$set: {name: value}});
      Session.set('editing_team', null);
    },
    cancel: function () {
      Session.set('editing_team', null);
    }
  }));
      
      
  Template.player_select.events({
    'click' : function (evt, tmpl) {
        if (Session.equals('setup_mode', false)) {
            // template data, if any, is available in 'this'
            var player = Players.find(this._id).fetch()[0];
            console.log("You pressed the button on player:"+player.name+" id"+this._id);
            Session.set("selected_player", this._id);
            if (player.team_id === Session.get("team1_id")) {
                Session.set("team1_action", "main");
			} else {
                Session.set("team2_action", "main");
			}
        } else {
			Session.set('editing_player', this._id);
			Meteor.flush(); // update DOM before focus
			activateInput(tmpl.find("#player-input"));
        }
    }
  });

  Template.player_select.events(okCancelEvents(
  '#player-input',
  {
    ok: function (value) {
        var num_name = value.split(",");
        Players.update(this._id, {$set: {player_number: num_name[0], name: num_name[1]}});
        Session.set('editing_player', null);
    },
    cancel: function () {
        Session.set('editing_player', null);
    }
  }));


/////////////////////////////////////////////////////////////////////////////////
////////////////// TEAM 1 //////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
  Template.main_team1_actions.events = {

    'click input.reboundp' : function () {
    	Session.set("team1_action", "players");
        var player = Players.find(Session.get("selected_player")).fetch()[0];
        Actions.insert({player_id: Session.get("selected_player"), game_id: 1, action_name: 'rebound', sub_action:'', feed_text: player.name+' grabbed a rebound', points: 0, fanpoints: 1, date_created: new Date()});
        Players.update(Session.get("selected_player"), {$inc: {fanpoints: 1}});
	},
    'click input.shot' : function () {
		Session.set("team1_action", "subaction");
        Session.set("team1_subaction", "shot");
	},
	'click input.turnover' : function () {
        Session.set("team1_action", "players");
        Session.set("possession", "team2");
        var player = Players.find(Session.get("selected_player")).fetch()[0];
        Actions.insert({player_id: Session.get("selected_player"), game_id: 1, action_name: 'turnover', sub_action:'', feed_text: player.name+' turned the ball over', points: 0, fanpoints: -1, date_created: new Date()});
        Players.update(Session.get("selected_player"), {$inc: {fanpoints: -1}});
    },
    'click input.foulp' : function () {
        Session.set("team1_action", "players");
        Session.set("possession", "team2");
        var player = Players.find(Session.get("selected_player")).fetch()[0];
        Actions.insert({player_id: Session.get("selected_player"), game_id: 1, action_name: 'foulp', sub_action:'', feed_text: player.name+' committed an offensive foul', points: 0, fanpoints: 0, date_created: new Date()});
         Players.update(Session.get("selected_player"), {$inc: {foul: 1}});
    },
    'click input.rebound' : function () {
        Session.set("team1_action", "players");
        Session.set("possession", "team2");
        var player = Players.find(Session.get("selected_player")).fetch()[0];
        Actions.insert({player_id: Session.get("selected_player"), game_id: 1, action_name: 'turnover', sub_action:'', feed_text: player.name+' grabbed a rebound', points: 0, fanpoints: 1, date_created: new Date()});
        Players.update(Session.get("selected_player"), {$inc: {fanpoints: 1}});
    }, 
    'click input.steal' : function () {
        Session.set("team1_action", "players");
        Session.set("possession", "team1");
        var player = Players.find(Session.get("selected_player")).fetch()[0];
        Actions.insert({player_id: Session.get("selected_player"), game_id: 1, action_name: 'turnover', sub_action:'', feed_text: player.name+' stole the ball', points: 0, fanpoints: 2, date_created: new Date()});
        Players.update(Session.get("selected_player"), {$inc: {fanpoints: 2}});
    }, 
    'click input.block' : function () {
        Session.set("team1_action", "players");
        var player = Players.find(Session.get("selected_player")).fetch()[0];
        Actions.insert({player_id: Session.get("selected_player"), game_id: 1, action_name: 'turnover', sub_action:'', feed_text: player.name+' blocked a shot', points: 0, fanpoints: 1, date_created: new Date()});
        Players.update(Session.get("selected_player"), {$inc: {fanpoints: 1}});

    }, 
    'click input.foul' : function () {
        Session.set("team1_action", "players");
        Session.set("possession", "team2");
        var player = Players.find(Session.get("selected_player")).fetch()[0];
        Actions.insert({player_id: Session.get("selected_player"), game_id: 1, action_name: 'foulp', sub_action:'', feed_text: player.name+' committed a foul', points: 0, fanpoints: 0, date_created: new Date()});
         Players.update(Session.get("selected_player"), {$inc: {foul: 1}});
    }
  }

  Template.main_team1_subactions.events = {
    'click input.shot_2' : function () {
		Session.set("team1_action", "players");
        
        var points = 2;
        var fpoints = 2;
        Session.set("team1_subaction", "");
        console.log("Recording shot +"+points);
        Session.set("possession", "team2");
        var player = Players.find(Session.get("selected_player")).fetch()[0];
        Actions.insert({player_id: Session.get("selected_player"), game_id: 1, action_name: 'shot', sub_action:'shot+2', feed_text: player.name+' made a 2 pt shot', points: points, fanpoints: fpoints, date_created: new Date()});
        Players.update(Session.get("selected_player"), {$inc: {score: points, fanpoints: fpoints}});
        Games.update({name:'game1'},{$inc: {team1_score: points}});
        //Meteor.flush();

	},
    'click input.shot_2_assist' : function () {   
		Session.set("team1_action", "players");
        Session.set("team1_subaction", "");
        console.log("Recording shot assist +"+points);
        Session.set("possession", "team2");
        var player = Players.find(Session.get("selected_player")).fetch()[0];
        if (player) {
            var points = 2; 
            var fpoints = 2; 
			var action_text = player.name+' made a 2pt shot';
            Actions.insert({player_id: Session.get("selected_player"), game_id: 1, action_name: 'shot', sub_action:'shot_2_assist', feed_text: action_text, points: points, fanpoints: fpoints, date_created: new Date()});
            Players.update(Session.get("selected_player"), {$inc: {score: points, fanpoints: fpoints}});
            Games.update({name:'game1'},{$inc: {team1_score: points}});
        };
	},
    'click input.shot_3' : function () {
		Session.set("team1_action", "players");
        var points = 3;
        var fpoints = 3;
        Session.set("team1_subaction", "");
        console.log("Recording shot assist +"+points);
        Session.set("possession", "team2");
        var player = Players.find(Session.get("selected_player")).fetch()[0];
        Actions.insert({player_id: Session.get("selected_player"), game_id: 1, action_name: 'shot', sub_action:'shot+3', feed_text: player.name+' made a 3 pt shot', points: points, fanpoints:fpoints, date_created: new Date()});
        Players.update(Session.get("selected_player"), {$inc: {score: points, fanpoints: fpoints}});
        Games.update({name:'game1'},{$inc: {team1_score: points}});
	},
    'click input.shot_3_assist' : function () {
		Session.set("team1_action", "players");
        var points = 3;
        var fpoints = 3;
        Session.set("team1_subaction", "");
        console.log("Recording shot assist +"+points);
        Session.set("possession", "team2");
        var player = Players.find(Session.get("selected_player")).fetch()[0];
        Actions.insert({player_id: Session.get("selected_player"), game_id: 1, action_name: 'shot', sub_action:'shot+3+assist', feed_text: player.name+' made a 3 pt shot', points: points, fanpoints: fpoints, date_created: new Date()});
        Players.update(Session.get("selected_player"), {$inc: {score: points, fanpoints: fpoints}});
        Games.update({name:'game1'},{$inc: {team1_score: points}});
	},
    'click input.shot_miss_2' : function () {
		Session.set("team1_action", "players");
        var points = 0;
        var fpoints = 3;
        Session.set("team1_subaction", "");
        console.log("Recording shot assist +"+points);
        Session.set("possession", "team2");
        var player = Players.find(Session.get("selected_player")).fetch()[0];
        Actions.insert({player_id: Session.get("selected_player"), game_id: 1, action_name: 'shot', sub_action:'shot_miss_2', feed_text: player.name+' missed a 2 pt shot', points: points, fanpoints:fpoints, date_created: new Date()});
        Players.update(Session.get("selected_player"), {$inc: {score: points, fanpoints: fpoints}});
        Games.update({name:'game1'},{$inc: {team1_score: points}});
	},
    'click input.shot_miss_3' : function () {
		Session.set("team1_action", "players");
        var points = 0;
        var fpoints = 0;
        Session.set("team1_subaction", "");
        console.log("Recording shot miss 3");
        Session.set("possession", "team2");
        var player = Players.find(Session.get("selected_player")).fetch()[0];
        Actions.insert({player_id: Session.get("selected_player"), game_id: 1, action_name: 'shot', sub_action:'shot+2', feed_text: player.name+' missed a 3 pt shot', points: points, fanpoints:fpoints, date_created: new Date()});
        Players.update(Session.get("selected_player"), {$inc: {score: points, fanpoints: fpoints}});
        Games.update({name:'game1'},{$inc: {team1_score: points}});
	},
    'click input.shot_free_throw_made' : function () {
		Session.set("team1_action", "players");
        var points = 1;
        var fpoints = 3;
        Session.set("team1_subaction", "");
        console.log("Recording shot free throw made");
        Session.set("possession", "team2");
        var player = Players.find(Session.get("selected_player")).fetch()[0];
        Actions.insert({player_id: Session.get("selected_player"), game_id: 1, action_name: 'shot', sub_action:'shot_free_throw_made', feed_text: player.name+' made a free throw', points: points, fanpoints:fpoints, date_created: new Date()});
        Players.update(Session.get("selected_player"), {$inc: {score: points, fanpoints: fpoints}});
        Games.update({name:'game1'},{$inc: {team1_score: points}});
	},
    'click input.shot_free_throw_missed' : function () {
		Session.set("team1_action", "players");
        var points = 0;
        var fpoints = 3;
        Session.set("team1_subaction", "");
        console.log("Recording shot free throw missed");
        Session.set("possession", "team2");
        var player = Players.find(Session.get("selected_player")).fetch()[0];
        Actions.insert({player_id: Session.get("selected_player"), game_id: 1, action_name: 'shot', sub_action:'shot_free_throw_missed', feed_text: player.name+' missed a free throw',points: points, fanpoints:fpoints, date_created: new Date()});
        Players.update(Session.get("selected_player"), {$inc: {score: points, fanpoints: fpoints}});
        Games.update({name:'game1'},{$inc: {team1_score: points}});
	}

  }
/////////////////////////////////////////////////////////////////////////////////
////////////////// TEAM 2 //////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////

  Template.main_team2_actions.events = {

    'click input.reboundp' : function () {
		Session.set("team2_action", "players");
        var player = Players.find(Session.get("selected_player")).fetch()[0];
        Actions.insert({player_id: Session.get("selected_player"), game_id: 1, action_name: 'rebound', sub_action:'', feed_text: player.name+' grabbed a rebound', points: 0, fanpoints: 1, date_created: new Date()});
        Players.update(Session.get("selected_player"), {$inc: {fanpoints: 1}});
	},
    'click input.shot' : function () {
		Session.set("team2_action", "subaction");
        Session.set("team2_subaction", "shot");
	},
	'click input.turnover' : function () {
        Session.set("team2_action", "players");
        Session.set("possession", "team1");
        var player = Players.find(Session.get("selected_player")).fetch()[0];
        Actions.insert({player_id: Session.get("selected_player"), game_id: 1, action_name: 'turnover', sub_action:'', feed_text: player.name+' turned the ball over', points: 0, fanpoints: -1, date_created: new Date()});
        Players.update(Session.get("selected_player"), {$inc: {fanpoints: -1}});
    },
    'click input.foulp' : function () {
        Session.set("team2_action", "players");
        Session.set("possession", "team1");
        var player = Players.find(Session.get("selected_player")).fetch()[0];
        Actions.insert({player_id: Session.get("selected_player"), game_id: 1, action_name: 'foulp', sub_action:'', feed_text: player.name+' committed an offensive foul', points: 0, fanpoints: 0, date_created: new Date()});
         Players.update(Session.get("selected_player"), {$inc: {foul: 1}});
    },
    'click input.rebound' : function () {
        Session.set("team2_action", "players");
        Session.set("possession", "team2");
        var player = Players.find(Session.get("selected_player")).fetch()[0];
        Actions.insert({player_id: Session.get("selected_player"), game_id: 1, action_name: 'turnover', sub_action:'', feed_text: player.name+' grabbed a rebound', points: 0, fanpoints: 1, date_created: new Date()});
        Players.update(Session.get("selected_player"), {$inc: {fanpoints: 1}});
    }, 
    'click input.steal' : function () {
        Session.set("team2_action", "players");
        Session.set("possession", "team2");
        var player = Players.find(Session.get("selected_player")).fetch()[0];
        Actions.insert({player_id: Session.get("selected_player"), game_id: 1, action_name: 'turnover', sub_action:'', feed_text: player.name+' stole the ball', points: 0, fanpoints: 2, date_created: new Date()});
        Players.update(Session.get("selected_player"), {$inc: {fanpoints: 2}});
    }, 
    'click input.block' : function () {
        Session.set("team2_action", "players");
        var player = Players.find(Session.get("selected_player")).fetch()[0];
        Actions.insert({player_id: Session.get("selected_player"), game_id: 1, action_name: 'turnover', sub_action:'', feed_text: player.name+' blocked a shot', points: 0, fanpoints: 1, date_created: new Date()});
        Players.update(Session.get("selected_player"), {$inc: {fanpoints: 1}});

    }, 
    'click input.foul' : function () {
        Session.set("team2_action", "players");
        Session.set("possession", "team1");
        var player = Players.find(Session.get("selected_player")).fetch()[0];
        Actions.insert({player_id: Session.get("selected_player"), game_id: 1, action_name: 'foul', sub_action:'', feed_text: player.name+' committed a foul', points: 0, fanpoints: 0, date_created: new Date()});
        Players.update(Session.get("selected_player"), {$inc: {foul: 1}});
    },
  }

  Template.main_team2_subactions.events = {
    'click input.shot_2' : function () {
		Session.set("team2_action", "players");
        
        var points = 2;
        var fpoints = 2;
        Session.set("team2_subaction", "");
        console.log("Recording shot +"+points);
        Session.set("possession", "team1");
        var player = Players.find(Session.get("selected_player")).fetch()[0];
        Actions.insert({player_id: Session.get("selected_player"), game_id: 1, action_name: 'shot', sub_action:'shot+2', feed_text: player.name+' made a 2 pt shot', points: points, fanpoints: fpoints, date_created: new Date()});
        Players.update(Session.get("selected_player"), {$inc: {score: points, fanpoints: fpoints}});
        Games.update({name:'game1'},{$inc: {team2_score: points}});
        //Meteor.flush();

	},
    'click input.shot_2_assist' : function () {   
		Session.set("team2_action", "players");
        Session.set("team2_subaction", "");
        console.log("Recording shot assist +"+points);
        Session.set("possession", "team1");
        var player = Players.find(Session.get("selected_player")).fetch()[0];
        if (player) {
		    var points = 2; 
            var fpoints = 2; 
			var action_text = player.name+' made a 2 pt shot';

		    Actions.insert({player_id: Session.get("selected_player"), game_id: 1, action_name: 'shot', sub_action:'shot_2_assist', feed_text: action_text, points: points, fanpoints: fpoints, date_created: new Date()});
		    Players.update(Session.get("selected_player"), {$inc: {score: points, fanpoints: fpoints}});
		    Games.update({name:'game1'},{$inc: {team2_score: points}});
        };
	},
    'click input.shot_3' : function () {
		Session.set("team2_action", "players");
        var points = 3;
        var fpoints = 3;
        Session.set("team2_subaction", "");
        console.log("Recording shot assist +"+points);
        Session.set("possession", "team1");
        var player = Players.find(Session.get("selected_player")).fetch()[0];
        Actions.insert({player_id: Session.get("selected_player"), game_id: 1, action_name: 'shot', sub_action:'shot+3', feed_text: player.name+' made a 3 pt shot', points: points, fanpoints:fpoints, date_created: new Date()});
        Players.update(Session.get("selected_player"), {$inc: {score: points, fanpoints: fpoints}});
        Games.update({name:'game1'},{$inc: {team2_score: points}});
	},
    'click input.shot_3_assist' : function () {
		Session.set("team2_action", "players");
        var points = 3;
        var fpoints = 3;
        Session.set("team2_subaction", "");
        console.log("Recording shot assist +"+points);
        Session.set("possession", "team1");
        var player = Players.find(Session.get("selected_player")).fetch()[0];
        Actions.insert({player_id: Session.get("selected_player"), game_id: 1, action_name: 'shot', sub_action:'shot+3+assist', feed_text: player.name+' made a 3 pt shot', points: points, fanpoints: fpoints, date_created: new Date()});
        Players.update(Session.get("selected_player"), {$inc: {score: points, fanpoints: fpoints}});
        Games.update({name:'game1'},{$inc: {team2_score: points}});
	},
    'click input.shot_miss_2' : function () {
		Session.set("team2_action", "players");
        var points = 0;
        var fpoints = 0;
        Session.set("team2_subaction", "");
        console.log("Recording shot assist +"+points);
        Session.set("possession", "team1");
        var player = Players.find(Session.get("selected_player")).fetch()[0];
        Actions.insert({player_id: Session.get("selected_player"), game_id: 1, action_name: 'shot', sub_action:'shot_miss_2', feed_text: player.name+' missed a 2 pt shot', points: points, fanpoints:fpoints, date_created: new Date()});
        Players.update(Session.get("selected_player"), {$inc: {score: points, fanpoints: fpoints}});
        //Games.update({name:'game1'},{$inc: {team2_score: points}});
	},
    'click input.shot_miss_3' : function () {
		Session.set("team2_action", "players");
        var points = 0;
        var fpoints = 0;
        Session.set("team1_subaction", "");
        console.log("Recording shot miss 3");
        Session.set("possession", "team1");
        var player = Players.find(Session.get("selected_player")).fetch()[0];
        Actions.insert({player_id: Session.get("selected_player"), game_id: 1, action_name: 'shot', sub_action:'shot+2', feed_text: player.name+' missed a 3 pt shot', points: points, fanpoints:fpoints, date_created: new Date()});
        Players.update(Session.get("selected_player"), {$inc: {score: points, fanpoints: fpoints}});
       // Games.update({name:'game1'},{$inc: {team2_score: points}});
	},
    'click input.shot_free_throw_made' : function () {
		Session.set("team2_action", "players");
        var points = 1;
        var fpoints = 1;
        Session.set("team1_subaction", "");
        console.log("Recording shot free throw made");
        Session.set("possession", "team1");
        var player = Players.find(Session.get("selected_player")).fetch()[0];
        Actions.insert({player_id: Session.get("selected_player"), 
                        game_id: Session.get("game_id"), 
                        action_name: 'shot', 
                        sub_action:'shot_free_throw_made', 
                        feed_text: player.name+' made a free throw', 
                        points: points, 
                        fanpoints:fpoints, 
                        date_created: new Date()});
        Players.update(Session.get("selected_player"), {$inc: {score: points, fanpoints: fpoints}});
        Games.update({name:'game1'},{$inc: {team2_score: points}});
	},
    'click input.shot_free_throw_missed' : function () {
		Session.set("team2_action", "players");
        var points = 0;
        var fpoints = 0;
        Session.set("team1_subaction", "");
        console.log("Recording shot free throw missed");
        Session.set("possession", "team1");
        var player = Players.find(Session.get("selected_player")).fetch()[0];
        Actions.insert({player_id: Session.get("selected_player"), 
                        game_id: Session.get("game_id"), 
                        action_name: 'shot', 
                        sub_action:'shot_free_throw_missed', 
                        feed_text: player.name+' missed a free throw',
                        points: points, 
                        fanpoints:fpoints, 
                        date_created: new Date()});
        Players.update(Session.get("selected_player"), {$inc: {score: points, fanpoints: fpoints}});
        //Games.update({name:'game1'},{$inc: {team2_score: points}});
	}

  };

///////////////////////////////////////////////////////////////////////////////////////////////////////////

