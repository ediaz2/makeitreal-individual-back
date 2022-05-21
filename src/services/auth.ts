import type { IUsers } from '~/models';
import type { AuthRegister, AuthLogin, PromiseService } from '~/schemas';
import jwt from 'jsonwebtoken';

import { create as userCreate, findOne as userFindOne } from '~/services/users';
import { env } from '~/config/env';
import { UnauthorizedException } from '~/errors';

export const generateToken = (users: IUsers): string => {
  const token = jwt.sign({ id: users._id }, env.jwt.secret, {
    expiresIn: env.jwt.expiresIn,
  });
  return token;
};

export const register = async (
  data: AuthRegister['body'],
): PromiseService<{ token: string }> => {
  try {
    const [user, error] = await userCreate(data);
    if (!user) throw error;
    const token = generateToken(user);

    return [{ token }, null];
  } catch (error) {
    return [null, error as Error];
  }
};

export const login = async (
  data: AuthLogin['body'],
): PromiseService<{ token: string }> => {
  try {
    const [user, error] = await userFindOne({ email: data.email }, '+password');
    if (!user) throw error;

    const isValid = await user.comparePassword(data.password);
    if (!isValid) {
      throw new UnauthorizedException('User or password is incorrect', 'auth');
    }

    const token = generateToken(user);

    return [{ token }, null];
  } catch (error) {
    return [null, error as Error];
  }
};
