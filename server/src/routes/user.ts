import { FastifyInstance } from 'fastify';
import { prisma } from '../lib/prisma';
import { authenticate } from '../plugins/authenticate';

export async function userRoutes(fastify: FastifyInstance) {
    fastify.get('/users/count', async () => {
        const count = await prisma.user.count();

        return { count };
    });

    fastify.get('/users', { onRequest: [authenticate] }, async (request) => {
        const users = await prisma.user.findMany({
            orderBy: {
                name: 'asc'
            }
        });

        return { users };
    });
}