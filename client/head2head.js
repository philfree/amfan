


  Template.head_2_head.screen_is = function (screen) {
    return Session.equals("screen", screen);
  }

  Template.small_score_board.score_team1 = function() {
      console.log("game_id="+Session.get("game_id"));
      var game = Games.findOne({name:'game1'});
      if (game) {
        return game.team1_score;
      } else { return 0; }
  }

  Template.small_score_board.score_team2 = function() {
      var game = Games.findOne({name: 'game1'});
      if (game) { 
         return game.team2_score;
      } else { return 0; }
  }

  Template.head_2_head.players_team1 = function () {
    return Players.find({team_id:1}, {sort: {score: -1, name: 1}});
  };


  Template.head_2_head.players_team2 = function () {
    return Players.find({team_id:2}, {sort: {score: -1, name: 1}});
  };
