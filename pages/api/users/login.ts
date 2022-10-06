// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiResponse } from 'next';

import ExtendedNextApiRequest from '../../../interfaces/ExtendedNextApiRequest';
import connectMongo from '../../../db/mongoose';
import login from '../../../apis/login';

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

	return login(req, res);
}
