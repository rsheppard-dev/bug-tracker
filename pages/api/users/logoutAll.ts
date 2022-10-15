// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiResponse } from 'next';

import nc from 'next-connect';

import auth from '../../../middleware/auth';
import logoutAll from '../../../lib/apis/logoutAll';
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
}).post(auth, async (req, res) => {
	try {
		await connectMongo();
		logoutAll(req, res);
	} catch (error) {
		throw new Error('Failed to logout.');
	}
});

export default handler;
