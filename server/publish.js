/********
 * Publish Collections
 ****/
 
Games = new Meteor.Collection('games');
// { clock: 60, teams: [{team_id, name, score}], winners: [team_id] }

Meteor.publish('games', function() { 
    return Games.find();
});

Teams = new Meteor.Collection('teams');
// { name: NextSpace, possession: 0, points:0}
Meteor.publish('teams', function () {
  return Teams.find();
})

Actions = new Meteor.Collection('actions');
// {player_id: 10, game_id: 123, action_name: 'foul', sub_action:'personal', feed_text: 'Foul on Jared', points: 0}
// {player_id: 10, game_id: 123, action_name: 'shot', sub_action:'+3', feed_text: 'Jared made a shot', points: 3}
Meteor.publish('actions', function () {
    return Actions.find();
});


Players = new Meteor.Collection('players');
// {name: 'matt', team_id: 123, game_id: 123, score: 50, player_number: 18, position: 'guard' picture: './image.jpg'}

Meteor.publish('players', function() { 
    return Players.find();
});

