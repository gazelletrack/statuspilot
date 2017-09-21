//var pageSession = new ReactiveDict();

Template.Payment.onCreated(function() {
	//pageSession.set("errorMessage", "");
	
});

Template.Payment.onDestroyed(function() {
	
});

Template.Payment.onRendered(function() {
	//pageSession.set("errorMessage", "");
	//pageSession.set("verificationEmailSent", false);

	

	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Payment.events({
	'submit #register_form' : function(e, t) {
		e.preventDefault();
/*
		var submit_button = $(t.find(":submit"));

		// credentials
		var register_username = t.find('#register_username').value.trim();
		var register_password = t.find('#register_password').value;
		var confirm_password = t.find('#confirm_password').value;
		// personal info
		var register_email = t.find('#register_email').value.trim();
		var register_first_name = t.find('#register_first_name').value.trim();
		var register_last_name = t.find('#register_last_name').value.trim();
		var register_cell_no = t.find('#register_cell_no').value.trim();
		// instagram info
		var register_instagram = t.find('#register_instagram').value.trim();
		var register_insta_pass = t.find('#register_insta_pass').value.trim();
		var confirm_insta_pass = t.find('#confirm_insta_pass').value.trim();
		// targets
		var register_target_audience = t.find('#register_target_audience').value.trim();
		var register_target_hashtags = t.find('#register_target_hashtags').value.trim();
		var register_phrase = t.find('#register_phrase').value.trim();
		var register_yes_no = t.find('#register_yes_no').value.trim();
		var register_country = t.find('#register_country').value.trim();


		// check email
		if(!isValidEmail(register_email))
		{
			pageSession.set("errorMessage", "Please enter valid e-mail address.");
			t.find('#register_email').focus();
			return false;
		}

		// check password
		var min_password_len = 6;

		if(register_password !== confirm_password)
		{
			pageSession.set("errorMessage", "Your passwords don't match.");
			t.find('#confirm_password').focus();
			return false;
		}

		if(!isValidPassword(register_password, min_password_len)) // TODO make it strong
		{
			pageSession.set("errorMessage", "Your password must be at least " + min_password_len + " characters long.");
			t.find('#register_password').focus();
			return false;
		}

		// check instagram pass
		if(register_insta_pass !== confirm_insta_pass)
		{
			pageSession.set("errorMessage", "Instagram passwords don't match.");
			t.find('#confirm_insta_pass').focus();
			return false;
		}

		// creating user
		submit_button.button("loading");
		Accounts.createUser({
			username: register_username,
			email: register_email,
			password : register_password,
			profile: {
				// personal
				firstName: register_first_name,
				lastName: register_last_name,
				cellPhone: register_cell_no,
				country: register_country,
				// misc
				commentPhrase: register_phrase,
				yesNo: register_yes_no,
			}
		}, function(err) {
			submit_button.button("reset");
			if(err) {
				if(err.error === 499) {
					pageSession.set("verificationEmailSent", true);
				} else {
					pageSession.set("errorMessage", err.message);
				}
			} else {
				Instagrams.insert({
					belongs_to: Users.findOne({username:register_username})._id,
					active : false,
					lastPayDate : null,
					paid : false,
					username : register_instagram,
					password : register_insta_pass,
					targetAudience : register_target_audience,
					targetUsers : register_target_hashtags
				}, function( error, result) {
					if ( error ) console.log ( 'Instagram insert error is:' + error );
					if ( result ) console.log ( 'Instagram insert result is:' + result );
				});

				pageSession.set("errorMessage", "");
				pageSession.set("verificationEmailSent", true);
			}
		});
		return false;
		*/
	},

});

Template.Payment.helpers({
	errorMessage: function() {
		//return pageSession.get("errorMessage");
	},
	verificationEmailSent: function() {
		//return pageSession.get("verificationEmailSent");
	}
	
});
