import type { NextApiResponse } from 'next';

import nc from 'next-connect';
import multer from 'multer';

import ExtendedNextApiRequest from '../../../../interfaces/ExtendedNextApiRequest';
import connectMongo from '../../../../db/mongoose';
import auth from '../../../../middleware/auth';
import createAvatar from '../../../../lib/apis/createAvatar';
import deleteAvatar from '../../../../lib/apis/deleteAvatar';

const upload = multer({
	limits: {
		fileSize: 1000000,
	},
	fileFilter(req, file, cb) {
		if (!file.originalname.match(/\.(jpg|jpeg|gif|png)$/))
			return cb(new Error('File must be an image.'));

		cb(null, true);
	},
});

const handler = nc<ExtendedNextApiRequest, NextApiResponse>({
	onError: (error, req, res, next) => {
		console.log(error.stack);
		res.status(400).end(error.message);
	},
	onNoMatch: (req, res) => {
		res.status(404).end('This page was not found.');
	},
})
	.post(auth, upload.single('avatar'), async (req, res) => {
		try {
			await connectMongo();
			createAvatar(req, res);
		} catch (error) {
			throw new Error('Failed to save image to database.');
		}
	})

	.delete(auth, async (req, res) => {
		try {
			await connectMongo();
			deleteAvatar(req, res);
		} catch (error) {
			console.log(error);
			throw new Error('Failed to delete image from database.');
		}
	});

export const config = {
	api: {
		bodyParser: false,
	},
};

export default handler;
