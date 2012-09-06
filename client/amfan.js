if (Meteor.is_client) {

  Template.team_list.players_team1 = function () {
    return Players.find({team_id:1}, {sort: {score: -1, name: 1}});
  };
  Template.team_list.players_team2 = function () {
    return Players.find({team_id:2}, {sort: {score: -1, name: 1}});
  };


  Template.container.screen_is = function (screen) {
     return Session.equals("screen", screen);
  };

  Template.container.events = {
    'click input.hidden_link' : function () {
       if (Session.equals("screen", "head2head")) { 
       	Session.set("screen", "game_activity");
       } else {
		Session.set("screen", "head2head");
       }
    },
    
    'click li.setup' : function () {
		if (Session.equals('setup_mode', false)) {
			Session.set('setup_mode', true);
			console.log("setup_mode set to True");
		} else {
			Session.set('setup_mode', false);
			console.log("setup mode set to False");
		}
	}
  }

}


