import { v2 as cloudinary } from 'cloudinary'
import { env } from './env'

cloudinary.config(env.cloudinary);

export { cloudinary }