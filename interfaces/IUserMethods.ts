export default interface IUserMethods {
	fullName(): string;
	generateAuthToken(): Promise<string>;
}
