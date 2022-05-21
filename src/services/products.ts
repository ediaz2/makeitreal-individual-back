import type { LeanDocument } from 'mongoose';
import { cloudinary } from '~/config/cloudinary';
import type { ProductCreate, PromiseService } from '~/schemas';
import { findOne as userFindOne } from '~/services/users';

import { Products, type IProducts } from '~/models';

export const create = async (
  data: ProductCreate,
): PromiseService<IProducts> => {
  try {
    const [user, error] = await userFindOne({ _id: data.user });
    if (!user) throw error;

    // Upload image to cloudinary
    const { secure_url } = await cloudinary.uploader.upload(
      data.image[0].filepath,
    );

    const product = await Products.create(
      Object.assign(data, {
        image: secure_url,
      }),
    );
    user.products.push(product._id);
    await user.save();

    return [product, null];
  } catch (error) {
    return [null, error as Error];
  }
};

export const findByUserId = async (
  user: string,
): PromiseService<LeanDocument<IProducts[]>> => {
  try {
    const products = await Products.find({ user }).lean();

    return [products, null];
  } catch (error) {
    return [null, error as Error];
  }
};
