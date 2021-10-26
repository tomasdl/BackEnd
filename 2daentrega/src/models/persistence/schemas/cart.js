import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import findOrCreate from 'mongoose-findorcreate';

const cartSchema = new Schema({
	timestamp: Date,
	products: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'products',
		},
	],
});

cartSchema.plugin(findOrCreate);

export default mongoose.model('cart', cartSchema);
