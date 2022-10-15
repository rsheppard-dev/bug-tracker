import type { NextApiResponse } from 'next';

import nc from 'next-connect';

import auth from '../../../middleware/auth';
import createProject from '../../../lib/apis/createProject';
import getAllProjects from '../../../lib/apis/getAllProjects';
import connectMongo from '../../../db/mongoose';
import ExtendedNextApiRequest from '../../../interfaces/ExtendedNextApiRequest';

const handler = nc<ExtendedNextApiRequest, NextApiResponse>({
	onError: (error, req, res, next) => {
		console.log(error.stack);
		res.status(400).end(error.message);
	},
	onNoMatch: (req, res) => {
		res.status(404).end('This page was not found.');
	},
})
	.post(auth, async (req, res) => {
		try {
			await connectMongo();
			createProject(req, res);
		} catch (error: any) {
			throw new Error('Failed to create project.');
		}
	})

	.get(auth, async (req, res) => {
		try {
			await connectMongo();
			getAllProjects(req, res);
		} catch (error) {
			throw new Error('Failed to get projects.');
		}
	});

export default handler;
