if (Meteor.is_client) {

  Template.player.events = {
    'click' : function () {
      // template data, if any, is available in 'this'
       player = Players.find(this._id).fetch()[0];
       console.log("You pressed the button on player:".player.name);

    }
  };
  Template.team_list.players_team1 = function () {
    return Players.find({team_id:1}, {sort: {score: -1, name: 1}});
  };
  Template.team_list.players_team2 = function () {
    return Players.find({team_id:2}, {sort: {score: -1, name: 1}});
  };
}


