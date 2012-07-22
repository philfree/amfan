if (Meteor.is_client) {

  Template.team_list.players_team1 = function () {
    return Players.find({team_id:1}, {sort: {score: -1, name: 1}});
  };
  Template.team_list.players_team2 = function () {
    return Players.find({team_id:2}, {sort: {score: -1, name: 1}});
  };
}


