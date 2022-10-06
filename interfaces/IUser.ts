export default interface IUser {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	role: 'admin' | 'manager' | 'developer' | 'submitter';
	tokens: [
		{
			token: string;
		}
	];
}
