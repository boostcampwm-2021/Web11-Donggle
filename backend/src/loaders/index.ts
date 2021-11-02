import expressLoader from './express';

export default async ({ expressApp, http }) => {
	await expressLoader({ app: expressApp });
};