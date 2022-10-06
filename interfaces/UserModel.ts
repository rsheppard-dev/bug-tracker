import { Model, HydratedDocument } from 'mongoose';

import IUser from './IUser';
import IUserMethods from './IUserMethods';

export default interface UserModel extends Model<IUser, {}, IUserMethods> {
	findByCredentials(
		email: string,
		password: string
	): Promise<HydratedDocument<IUser, IUserMethods>>;
}
