import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
    {
    name: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
    },
    {
    timestamps: true,
    }
);

const productSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    seller: { type: mongoose.Schema.Types.ObjectID, ref: 'User' },
    image: {type: String, required: true},
    brand: {type: String, required: true},
    catagory: {type: String, required: true},
    description: {type: String, required: true},
    address: {type: String, required: true},
    countInStock: {type: Number, required: true},
    rating: {type: Number, required: true},
    numReviews: {type: Number, required: true},
    reviews: [reviewSchema],
},{
    timestamps: true,
});

const Product = mongoose.model('Product', productSchema);

export default Product;