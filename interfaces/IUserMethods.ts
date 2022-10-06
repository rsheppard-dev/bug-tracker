export default interface IUserMethods {
	generateAuthToken(): Promise<string>;
}
