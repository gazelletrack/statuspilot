var pageSession = new ReactiveDict();

pageSession.set("errorMessage", "");
pageSession.set("infoMessage", "");

Template.UserSettingsInstagrams.onCreated(function() {
	pageSession.set("errorMessage", "");	
	pageSession.set("infoMessage", "");	
	
});

Template.UserSettingsInstagrams.onDestroyed(function() {
	
});

Template.UserSettingsInstagrams.onRendered(function() {


	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.UserSettingsInstagrams.events({
	'submit .instagrams_form' : function(e, t) {
		e.preventDefault();

		var submit_button = $(e.target).find(":submit");
		submit_button.button("loading");
		
		pageSession.set("errorMessage", "");
		pageSession.set("infoMessage", "");

		let this_id = $(e.target).find('.single-wrap').attr('data-id');
		let username = $(e.target).find('#username').val();
		let insta_pass = $(e.target).find('#password').val();
		let target_audience = $(e.target).find('#target-audience').val();
		let target_hashtags = $(e.target).find('#target-users').val();

		console.log(this_id, insta_pass, target_audience, target_hashtags);

		Instagrams.update({_id: this_id}, {
			$set: {
				password : insta_pass,
				targetAudience : target_audience,
				targetUsers : target_hashtags
			}
		}, function (err, res) {
			if (err) {
				throw err;
				pageSession.set("errorMessage", err);
			}
			if (res) {
				console.log(res);
				submit_button.button("reset");
				pageSession.set("errorMessage", "");
				pageSession.set("infoMessage", "Instagram profile updated for <strong>" + username + "</strong>");
			}
		});

		return false;
	},

	'click .delete-instagram-account': function(e) {
		e.preventDefault();

		let this_id = $(e.target).parents('.single-wrap').attr('data-id');
		let username = $(e.target).parents('.single-wrap').find('#username').val();

		Instagrams.remove( {_id: this_id}, function(err, res){
			if (err) {
				throw err;
				pageSession.set("errorMessage", err);
			}
			if (res) {
				pageSession.set("errorMessage", "");
				pageSession.set("infoMessage", "Instagram profile <strong>" + username + "</strong> removed");
			}
		});
	}

});

Template.UserSettingsInstagrams.helpers({
	errorMessage: function() {
		return pageSession.get("errorMessage");
	},
	infoMessage: function() {
		return pageSession.get("infoMessage");
	},
	InstagramAccounts: function() {
		return Instagrams.find({belongs_to:Meteor.userId()}, {});
	}
	
});
