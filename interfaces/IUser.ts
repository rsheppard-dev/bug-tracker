export default interface IUser {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	password: string;
	role: 'admin' | 'manager' | 'developer' | 'submitter';
	createdAt: Date;
	tokens: [
		{
			token: string;
		}
	];
}
