import { NextApiResponse } from 'next';

import jwt from 'jsonwebtoken';

import User from '../models/User';
import ExtendedNextApiRequest from '../interfaces/ExtendedNextApiRequest';
import connectMongo from '../db/mongoose';

const auth = async (
	req: ExtendedNextApiRequest,
	res: NextApiResponse,
	next: any
) => {
	try {
		await connectMongo();

		const secret = process.env.JWT_SECRET!;
		const token = req.headers.authorization?.replace('Bearer ', '');

		if (!token) {
			throw new Error('Failed to authenticate user.');
		}

		const decoded: any = jwt.verify(token, secret);

		const user = await User.findOne({
			_id: decoded._id,
			'tokens.token': token,
		});

		if (!user) {
			throw new Error('Failed to authenticate user.');
		}

		req.user = user;

		next();
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
};

export default auth;
