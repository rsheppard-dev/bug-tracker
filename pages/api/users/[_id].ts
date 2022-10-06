// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiResponse } from 'next';

import getUser from '../../../apis/getUser';
import connectMongo from '../../../db/mongoose';
import User from '../../../models/User';
import ExtendedNextApiRequest from '../../../interfaces/ExtendedNextApiRequest';
import updateUser from '../../../apis/updateUser';

const handler = async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
	try {
		await connectMongo();
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}

	switch (req.method) {
		case 'GET':
			return getUser(req, res);
		case 'PATCH':
			return updateUser(req, res);
		default:
			break;
	}
};

export default handler;
