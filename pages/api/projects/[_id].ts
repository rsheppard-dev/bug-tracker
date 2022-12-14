import type { NextApiResponse } from 'next';

import nc from 'next-connect';

import auth from '../../../middleware/auth';
import getProject from '../../../lib/apis/getProject';
import ExtendedNextApiRequest from '../../../interfaces/ExtendedNextApiRequest';
import connectMongo from '../../../db/mongoose';
import updateProject from '../../../lib/apis/updateProject';
import deleteProject from '../../../lib/apis/deleteProject';

const handler = nc<ExtendedNextApiRequest, NextApiResponse>({
	onError: (error, req, res, next) => {
		console.log(error.stack);
		res.status(400).end(error.message);
	},
	onNoMatch: (req, res) => {
		res.status(404).end('This page was not found.');
	},
})
	.get(auth, async (req, res) => {
		try {
			await connectMongo();
			getProject(req, res);
		} catch (error: any) {
			throw new Error('Failed to get project.');
		}
	})

	.patch(auth, async (req, res) => {
		try {
			await connectMongo();
			updateProject(req, res);
		} catch (error) {
			throw new Error('Failed to update project.');
		}
	})

	.delete(auth, async (req, res) => {
		try {
			await connectMongo();
			deleteProject(req, res);
		} catch (error) {
			throw new Error('Failed to delete project.');
		}
	});

export default handler;
