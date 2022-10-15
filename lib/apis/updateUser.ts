import { NextApiResponse } from 'next';

import ExtendedNextApiRequest from '../../interfaces/ExtendedNextApiRequest';

const updateUser = async (
	req: ExtendedNextApiRequest,
	res: NextApiResponse
) => {
	const updates = Object.keys(req.body);
	const allowedUpdates = [
		'firstName',
		'lastName',
		'email',
		'phone',
		'password',
	];
	const isValidOperation = updates.every(update =>
		allowedUpdates.includes(update)
	);

	if (!isValidOperation) {
		return res.status(400).json({ error: 'Invalid updates!' });
	}

	try {
		const user = req.user;

		updates.forEach(update => (user[update] = req.body[update]));
		await user.save();

		res.status(200).json(user);
	} catch (error) {
		console.log(error);
		res.status(400).json(error);
	}
};

export default updateUser;
