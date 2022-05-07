import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema({
  characters: { type: Array, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  finished: { type: Boolean, required: true },
});

export const Cart = mongoose.model('carts', CartSchema);
