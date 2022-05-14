import mongoose from 'mongoose';

import { env } from './env';

export const connect = async () => {
  try {
    await mongoose.connect(env.mongoose.uri, env.mongoose.options);
    return 'connected';
  } catch (error) {
    return error;
  }
};

export const disconnect = async () => {
  try {
    await mongoose.disconnect();
    return 'disconnected';
  } catch (error) {
    return error;
  }
};

export const cleanup = async () => {
  const collections = await mongoose.connection.db.collections();

  await Promise.all(
    collections.map(async (collection) => {
      await collection.deleteMany({});
    }),
  );
};
