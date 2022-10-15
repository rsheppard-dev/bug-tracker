import { NextApiResponse } from 'next';

import ExtendedNextApiRequest from '../../interfaces/ExtendedNextApiRequest';
import User from '../../models/User';

const getAllUsers = async (
	req: ExtendedNextApiRequest,
	res: NextApiResponse
) => {
	try {
		const users = await User.find({});

		res.status(200).json(users);
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
};

export default getAllUsers;
