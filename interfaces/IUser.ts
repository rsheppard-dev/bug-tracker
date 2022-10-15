export default interface IUser {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	password: string;
	avatar: Buffer;
	role: 'admin' | 'manager' | 'developer' | 'submitter';
	createdAt: Date;
	updatedAt: Date;
	tokens: [
		{
			token: string;
		}
	];
}
