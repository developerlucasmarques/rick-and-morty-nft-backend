import mongoose from 'mongoose';

const MarketplaceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  characters: { type: Array, required: true },
});

export const Marketplace = mongoose.model('marketplaces', MarketplaceSchema);
