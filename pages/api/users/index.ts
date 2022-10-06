// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiResponse } from 'next';

import connectMongo from '../../../db/mongoose';
import ExtendedNextApiRequest from '../../../interfaces/ExtendedNextApiRequest';
import createUser from '../../../apis/createUser';
import getAllUsers from '../../../apis/getAllUsers';

const handler = async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
	try {
		await connectMongo();
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}

	switch (req.method) {
		case 'POST':
			return createUser(req, res);
		case 'GET':
			return getAllUsers(req, res);
		default:
			break;
	}
};

export default handler;
