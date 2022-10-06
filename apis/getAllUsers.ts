import { NextApiResponse } from 'next';

import ExtendedNextApiRequest from '../interfaces/ExtendedNextApiRequest';
import withProtect from '../middleware/withProtect';
import User from '../models/User';

const getAllUsers = async (
	req: ExtendedNextApiRequest,
	res: NextApiResponse
) => {
	try {
		const users = await User.find({});

		return res.status(200).json(users);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

export default withProtect(getAllUsers);
