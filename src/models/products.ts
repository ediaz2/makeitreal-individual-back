import mongoose from 'mongoose';

export interface IProducts extends mongoose.Document {
  name: string;
  image: string;
  price: number;
  description: string;
  user: mongoose.Schema.Types.ObjectId;
}

const products = new mongoose.Schema<IProducts>(
  {
    name: { type: String, required: true },
    image: { type: String },
    price: { type: Number, required: true },
    description: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
  },
  {
    collection: 'products',
    timestamps: true,
  },
);

export const Products = mongoose.model<IProducts>('Products', products);
