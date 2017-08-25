Meteor.users.allow({
	remove: function(userId, docs) {
		return true;
	}
});