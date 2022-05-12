import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema({
  characters: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'characters',
      required: true,
    },
  ],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
});

export const Cart = mongoose.model('carts', CartSchema);
