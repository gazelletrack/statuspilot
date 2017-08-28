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
	'submit #instagrams_form' : function(e, t) {
		e.preventDefault();

		pageSession.set("errorMessage", "");
		pageSession.set("infoMessage", "");

		var submit_button = $(t.find(":submit"));

		var password = t.find('#password').value;

		submit_button.button("loading");

		return false; 
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
		return Users.findOne({_id:Meteor.userId()}, {}).profile.instagram;
	}
	
});
