Router.configure({
	templateNameConverter: "upperCamelCase",
	routeControllerNameConverter: "upperCamelCase",
	layoutTemplate: "layout",
	notFoundTemplate: "notFound",
	loadingTemplate: "loading"
});

Router.publicRoutes = [
	"login",
	"register",
	"verify_email",
	"forgot_password",
	"reset_password"
];

Router.privateRoutes = [
	"admin",
	"admin.users",
	"admin.users.details",
	"admin.users.insert",
	"admin.users.edit",
	"user_settings",
	"user_settings.profile",
	"user_settings.change_pass",
	"user_settings.instagram_accounts",
	"logout"
];

Router.freeRoutes = [
	
];

Router.roleMap = [
	{ route: "admin",	roles: ["admin"] },
	{ route: "admin.users",	roles: ["admin"] },
	{ route: "admin.users.details",	roles: ["admin"] },
	{ route: "admin.users.insert",	roles: ["admin"] },
	{ route: "admin.users.edit",	roles: ["admin"] },
	{ route: "user_settings",	roles: ["subscriber","admin"] },
	{ route: "user_settings.profile",	roles: ["subscriber","admin"] },
	{ route: "user_settings.change_pass",	roles: ["subscriber","admin"] }
];

Router.defaultFreeRoute = "";
Router.defaultPublicRoute = "home";
Router.defaultPrivateRoute = "home";

Router.waitOn(function() { 
	Meteor.subscribe("current_user_data");
});

Router.onBeforeAction(function() {
	// loading indicator here
	if(!this.ready()) {
		this.render('loading');
		$("body").addClass("wait");
	} else {
		$("body").removeClass("wait");
		this.next();
	}
});

Router.onBeforeAction(Router.ensureNotLogged, {only: Router.publicRoutes});
Router.onBeforeAction(Router.ensureLogged, {only: Router.privateRoutes});
Router.onBeforeAction(Router.ensureGranted, {only: Router.freeRoutes}); // yes, route from free zone can be restricted to specific set of user roles

Router.map(function () {

	// public routes	
	this.route("/login", {name: "login", controller: "LoginController"});
	this.route("/register", {name: "register", controller: "RegisterController"});
	this.route("/verify_email/:verifyEmailToken", {name: "verify_email", controller: "VerifyEmailController"});
	this.route("/forgot_password", {name: "forgot_password", controller: "ForgotPasswordController"});
	this.route("/reset_password/:resetPasswordToken", {name: "reset_password", controller: "ResetPasswordController"});

	// private routes
	this.route("/admin", {name: "admin", controller: "AdminController"});
	this.route("/admin/users", {name: "admin.users", controller: "AdminUsersController"});
	this.route("/admin/users/details/:userId", {name: "admin.users.details", controller: "AdminUsersDetailsController"});
	this.route("/admin/users/insert", {name: "admin.users.insert", controller: "AdminUsersInsertController"});
	this.route("/admin/users/edit/:userId", {name: "admin.users.edit", controller: "AdminUsersEditController"});
	this.route("/user_settings", {name: "user_settings", controller: "UserSettingsController"});
	this.route("/user_settings/profile", {name: "user_settings.profile", controller: "UserSettingsProfileController"});
	this.route("/user_settings/change_pass", {name: "user_settings.change_pass", controller: "UserSettingsChangePassController"});
	this.route("/user_settings/instagram_accounts", {name: "user_settings.instagram_accounts", controller: "UserSettingsInstagramsController"});
	this.route("/logout", {name: "logout", controller: "LogoutController"});

	// global routes - access to everyone
	this.route("/", {name: "home", controller: "Home"});
	this.route("/contact", {name: "contact", controller: "ContactController"});
});
