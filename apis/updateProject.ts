import { NextApiResponse } from 'next';
import ExtendedNextApiRequest from '../interfaces/ExtendedNextApiRequest';
import withProtect from '../middleware/withProtect';
import Project from '../models/Project';

const updateProject = async (
	req: ExtendedNextApiRequest,
	res: NextApiResponse
) => {
	const { _id } = req.query;
	const updates = Object.keys(req.body);
	const allowedUpdates = ['title', 'description'];
	const isValidOperation = updates.every(update =>
		allowedUpdates.includes(update)
	);

	if (!isValidOperation) {
		return res.status(400).json({ error: 'Invalid updates!' });
	}

	try {
		const project = await Project.findOne({ _id, owner: req.user._id });
		console.log(project);
		if (!project) {
			res.status(404).json({});
		}

		updates.forEach(update => (project[update] = req.body[update]));
		await project.save();

		res.status(200).json(project);
	} catch (error) {
		console.log(error);
		res.status(400).json(error);
	}
};

export default withProtect(updateProject);
