import { NextApiResponse } from 'next';

import ExtendedNextApiRequest from '../../interfaces/ExtendedNextApiRequest';
import User from '../../models/User';

const getUser = async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
	const { _id } = req.query;

	try {
		const user = await User.findById(_id);

		if (!user) {
			res.status(404).json({});
		}

		res.status(200).json(user);
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
};

export default getUser;
