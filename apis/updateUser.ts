import { NextApiResponse } from 'next';
import ExtendedNextApiRequest from '../interfaces/ExtendedNextApiRequest';
import withProtect from '../middleware/withProtect';

import User from '../models/User';

const updateUser = async (
	req: ExtendedNextApiRequest,
	res: NextApiResponse
) => {
	const { _id } = req.query;
	const updates = Object.keys(req.body);
	const allowedUpdates = ['firstName', 'lastName', 'email', 'password'];
	const isValidOperation = updates.every(update =>
		allowedUpdates.includes(update)
	);

	if (!isValidOperation) {
		return res.status(400).json({ error: 'Invalid updates!' });
	}

	try {
		const user: any = await User.findById(_id);

		updates.forEach(update => (user[update] = req.body[update]));
		await user.save();

		if (!user) {
			return res.status(404).json({});
		}

		return res.status(200).json(user);
	} catch (error) {
		console.log(error);
		return res.status(400).json(error);
	}
};

export default withProtect(updateUser);
