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

  Template.container.events({
    'click input.hidden_link' : function () {
       if (Session.equals("screen", "head2head")) { 
       	Session.set("screen", "game_activity");
       } else {
		Session.set("screen", "head2head");
       }
    },
    
    'click #edit' : function () {
        $("#main_content").addClass("editing").removeClass("show_stats");
		if (Session.equals('setup_mode', false)) {
			Session.set('setup_mode', true);
			console.log("setup_mode set to True");
		}
	},
	'click .cancel' : function () {
		Session.set("team1_action", "players");
		Session.set("team2_action", "players");
	},
	'click .possession_ball' : function (e) {
       var $this = $(e.target);
	   if($this.closest('div.team').hasClass('one')) {
	       Session.set("possession", "team1");
	   } else {
	       Session.set("possession", "team2");
	   }	   
	},
	'click #stats' : function () {
	   $("#main_content").addClass("show_stats").removeClass("editing");
	   Session.set('setup_mode', false);
	},
	'click #game' : function () {
	   $("#main_content").removeClass("editing").removeClass("show_stats");
	   Session.set('setup_mode', false);
	},
	'click #sub' : function () {
	   $("#main_content").toggleClass("subbing");
	   $("#score_board,.plays").slideToggle(250);
       if($("#main_content").hasClass("subbing")) {
            var height = $(window).height() - 185;
            $(".player_bg").css({"height":"inherit","max-height":height+"px"});
            console.log(height);
           var html = "<span>Close Rosters</span>";
       } else {
           var html = "<span>Substitute/View Rosters</span>";
           $(".player_bg").css({"height":"330px","max-height":"none"}).scrollTop(0);
       }
	   $("#sub").html(html);
	}
  });
  

  

}


Session.set("team2_action", "players");