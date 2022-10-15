import type { NextApiResponse } from 'next';

import nc from 'next-connect';

import connectMongo from '../../../db/mongoose';
import ExtendedNextApiRequest from '../../../interfaces/ExtendedNextApiRequest';
import createUser from '../../../lib/apis/createUser';

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
		createUser(req, res);
	} catch (error: any) {
		throw new Error('Failed to create user.');
	}
});

export default handler;
