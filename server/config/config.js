var moment = require('moment'),
	jwt = require('jwt-simple'),
	nodemailer = require('nodemailer');


module.exports = {
	MONGO_URI: process.env.MONGO_URI || 'localhost',
	TOKEN_SECRET: process.env.TOKEN_SECRET || '496c59a0260a0c999ae39eccdff5ff03_rss',

	// OAuth 2.0
	FACEBOOK_SECRET: process.env.FACEBOOK_SECRET || 'e1e2ef27d6162d356bd4de376ddb4e77',
	GOOGLE_SECRET: process.env.GOOGLE_SECRET || 'SWHLC3Uu4sE7ei3YH_2U6o7P',

	LINKEDIN_SECRET: process.env.LINKEDIN_SECRET || '7pYAnN0nJf8ZiDVB',
	// OAuth 1.0
	TWITTER_KEY: process.env.TWITTER_KEY || 'RIBeAXNt5BgRIUCsbtsxedzWX',
	TWITTER_SECRET: process.env.TWITTER_SECRET || 'kOOsg8w6TE3XGz95nW7Fv7P4VwBNGWz4mdTABHoz9XEymaQh7s',

	regExp: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/,

	createJWT: function (user) {
		var payload = {
			sub: user._id,
			email: user.email,
			iat: moment(),
			exp: moment().add(1, 'days')
		};
		return jwt.encode(payload, this.TOKEN_SECRET);
	},
	createEmailJWT: function (email) {
	var payload = {
		verifEmail: email,
		iat: moment(),
		exp: moment().add(1, 'hours')
	};
	return jwt.encode(payload, this.TOKEN_SECRET);
	},

	smtpTransport : nodemailer.createTransport("SMTP",{
	service: "Gmail",
		auth: {
			user: 'rssfeedersampleapp@gmail.com',
			pass: 'Qwerty12_'
		}
	})

}