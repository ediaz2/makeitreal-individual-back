import bycrypt from 'bcrypt';
import mongoose from 'mongoose';

export interface IUsers extends mongoose.Document {
  _id: string;
  name: string;
  ruc: string;
  tenant: string;
  email: string;
  password: string;
  products: mongoose.Schema.Types.ObjectId[];
  comparePassword: (password: string) => Promise<boolean>;
}

const users = new mongoose.Schema<IUsers>(
  {
    name: { type: String, required: true },
    ruc: { type: String, required: true },
    tenant: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, select: false },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Products' }],
  },
  {
    collection: 'users',
    timestamps: true,
  },
);

users.pre('save', async function (next) {
  if (!this.password && !this.isModified('password')) return next();
  const hashedPassword = await bycrypt.hash(this.password, 10);
  this.password = hashedPassword;
  next();
});

users.methods.comparePassword = async function (password: string) {
  return await bycrypt.compare(password, this.password);
};

export const Users = mongoose.model<IUsers>('Users', users);
