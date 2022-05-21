import type { FilterQuery } from 'mongoose';
import type { UserCreate, PromiseService } from '~/schemas';

import { Users, type IUsers } from '~/models';
import { NotFoundException, BadRequestException } from '~/errors';

export const findOne = async (
  where: FilterQuery<IUsers>,
  select?: string,
): PromiseService<IUsers> => {
  try {
    const user = await Users.findOne(where).select(select);
    if (!user) throw new NotFoundException('User not found');
    return [user, null];
  } catch (error) {
    return [null, error as Error];
  }
};

export const create = async (data: UserCreate): PromiseService<IUsers> => {
  const { email, tenant } = data;
  try {
    const [existingUser] = await findOne({ email });
    if (existingUser) throw new BadRequestException('User already exists');

    const [existingTenant] = await findOne({ tenant });
    if (existingTenant) throw new BadRequestException('Tenant already exists');

    const user = await Users.create(data);
    return [user, null];
  } catch (error) {
    return [null, error as Error];
  }
};
