import { NextApiResponse } from 'next';

import ExtendedNextApiRequest from '../interfaces/ExtendedNextApiRequest';
import User from '../models/User';

const login = async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
	const { email, password } = req.body;

	try {
		const user = await User.findByCredentials(email, password);
		const token = await user.generateAuthToken();

		res.status(200).json({ user, token });
	} catch (error) {
		console.log(error);
		res.status(400).json(error);
	}
};

export default login;
