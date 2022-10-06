import { NextApiResponse } from 'next';
import ExtendedNextApiRequest from '../interfaces/ExtendedNextApiRequest';
import User from '../models/User';

const createUser = async (
	req: ExtendedNextApiRequest,
	res: NextApiResponse
) => {
	const user = new User(req.body);

	try {
		await user.save();
		const token = await user.generateAuthToken();

		res.status(201).json({ user, token });
	} catch (error) {
		console.log(error);
		res.status(400).json(error);
	}
};

export default createUser;
