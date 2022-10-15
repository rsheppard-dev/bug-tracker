import type { NextApiResponse } from 'next';

import nc from 'next-connect';

import ExtendedNextApiRequest from '../../../interfaces/ExtendedNextApiRequest';
import connectMongo from '../../../db/mongoose';
import login from '../../../lib/apis/login';

const handler = nc<ExtendedNextApiRequest, NextApiResponse>({
	onError: (error, req, res, next) => {
		console.log(error.stack);
		res.status(400).end(error.message);
	},
	onNoMatch: (req, res) => {
		res.status(404).end('This page was not found.');
	},
}).post(async (req, res) => {
	try {
		await connectMongo();
		login(req, res);
	} catch (error: any) {
		throw new Error('Failed to login.');
	}
});

export default handler;
