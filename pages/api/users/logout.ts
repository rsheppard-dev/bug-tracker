// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiResponse } from 'next';

import logout from '../../../apis/logout';
import ExtendedNextApiRequest from '../../../interfaces/ExtendedNextApiRequest';
import connectMongo from '../../../db/mongoose';

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

	return logout(req, res);
}
