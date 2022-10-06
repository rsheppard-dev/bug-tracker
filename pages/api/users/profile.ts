// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiResponse } from 'next';

import ExtendedNextApiRequest from '../../../interfaces/ExtendedNextApiRequest';
import getProfile from '../../../apis/getProfile';
import connectMongo from '../../../db/mongoose';
import deleteUser from '../../../apis/deleteUser';

export default async function handler(
	req: ExtendedNextApiRequest,
	res: NextApiResponse
) {
	try {
		await connectMongo();
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}

	switch (req.method) {
		case 'GET':
			return getProfile(req, res);
		case 'DELETE':
			return deleteUser(req, res);
		default:
			break;
	}
}
