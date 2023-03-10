import fastify from 'fastify';
import cors from '@fastify/cors';

import { env } from './env';
import { Routes } from './routes';

const server = fastify();

server.register(import('fastify-raw-body'), {
  field: 'rawBody',
  encoding: 'base64',
  runFirst: true,
});

server.register(cors, {
  origin: true
});

server.register(Routes, { prefix: '/v1' });

server.get('/health', (req, res) => res.status(204).send());

server.setNotFoundHandler((req, res) => {
  res.status(404).send({ success: false, error: { code: 'route_not_found' } });
});

server.listen({ port: env.PORT, host: '0.0.0.0' }, () => {
  console.log(`Analytics > Listening on ${env.PORT}`);
});