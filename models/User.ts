import { Schema, model, models, Model } from 'mongoose';
import isEmail from 'validator/lib/isEmail';
import isMobilePhone from 'validator/lib/isMobilePhone';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import IUser from '../interfaces/IUser';
import IUserMethods from '../interfaces/IUserMethods';
import UserModel from '../interfaces/UserModel';
import Project from './Project';

// schema
const userSchema = new Schema<IUser, UserModel, IUserMethods>(
	{
		firstName: {
			type: String,
			required: true,
			trim: true,
		},
		lastName: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			lowercase: true,
			validate(value: string) {
				if (!isEmail(value)) {
					throw new Error('Email is invalid.');
				}
			},
		},
		phone: {
			type: String,
			required: true,
			trim: true,
			validate(value: string) {
				if (!isMobilePhone(value)) {
					throw new Error('Phone number is invalid.');
				}
			},
		},
		password: {
			type: String,
			required: true,
			trim: true,
			minlength: [6, 'Password must be at least 6 characters.'],
			validate(value: string) {
				if (value.toLowerCase().includes('password')) {
					throw new Error('Password cannot contain "password".');
				}
			},
		},
		avatar: {
			type: Buffer,
		},
		role: {
			type: String,
			enum: {
				values: ['admin', 'manager', 'developer', 'submitter'],
				message: '{VALUE} is not supported.',
			},
			required: true,
			trim: true,
			lowercase: true,
			default: 'submitter',
		},
		tokens: [
			{
				token: {
					type: String,
					required: true,
				},
			},
		],
	},
	{
		timestamps: true,
	}
);

// virtuals
userSchema.virtual('projects', {
	ref: 'Project',
	localField: '_id',
	foreignField: 'owner',
});

// methods
userSchema.methods.toJSON = function () {
	const user = this;
	const userObject = user.toObject();

	delete userObject.password;
	delete userObject.tokens;
	delete userObject.avatar;

	return userObject;
};

userSchema.methods.generateAuthToken = async function () {
	const user = this;
	const secret = process.env.JWT_SECRET!;
	const token = jwt.sign({ _id: user._id.toString() }, secret);

	user.tokens = user.tokens.concat({ token });
	await user.save();

	return token;
};

// statics
userSchema.statics.findByCredentials = async (
	email: string,
	password: string
) => {
	const user = await User.findOne({ email });

	if (!user) {
		throw new Error('Failed to login.');
	}

	const isMatch = await bcrypt.compare(password, user.password);

	if (!isMatch) {
		throw new Error('Failed to login.');
	}

	return user;
};

// middleware
userSchema.pre('save', async function (next) {
	const user = this;

	if (user.isModified('password')) {
		user.password = await bcrypt.hash(user.password, 8);
	}
	next();
});

userSchema.pre('remove', async function (next) {
	const user = this;

	await Project.deleteMany({ owner: user._id });

	next();
});

const User =
	(models.User as UserModel) || model<IUser, UserModel>('User', userSchema);

export default User;
