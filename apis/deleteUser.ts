import { NextApiResponse } from 'next';

import ExtendedNextApiRequest from '../interfaces/ExtendedNextApiRequest';
import withProtect from '../middleware/withProtect';
import User from '../models/User';

const deleteUser = async (
	req: ExtendedNextApiRequest,
	res: NextApiResponse
) => {
	try {
		await req.user.remove();

		return res.status(200).json(req.user);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

export default withProtect(deleteUser);
