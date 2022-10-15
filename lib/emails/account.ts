import sgMail from '@sendgrid/mail';

const sendgridApiKey = process.env.SENDGRID_API_KEY!;
const from = process.env.FROM_EMAIL!;

sgMail.setApiKey(sendgridApiKey);

export const sendWelcomeEmail = (email: string, name: string) => {
	const msg = {
		to: email,
		from,
		subject: 'Welcome to the Bug Tracker',
		text: `Welcome ${name}. Thank you for registering for the Bug Tracker.`,
	};
	sgMail
		.send(msg)
		.then(() => {
			console.log('Email sent');
		})
		.catch(error => {
			console.error(error);
		});
};

export const sendGoodbyeEmail = (email: string, name: string) => {
	const msg = {
		to: email,
		from,
		subject: 'Sorry to see you go',
		text: `Goodbye ${name}. Thank you for using the Bug Tracker. Your account has now been deleted. Please feel free to come back and join us again soon!`,
	};
	sgMail
		.send(msg)
		.then(() => {
			console.log('Email sent');
		})
		.catch(error => {
			console.error(error);
		});
};
