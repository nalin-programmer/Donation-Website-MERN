import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
    {
        orderItems:[
            {
                name: {type: String, required: true},
                qty: {type: Number, require: true},
                image: { type: String, require: true},
                address: {type: String, required: true},
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true,
                },
            },
        ],
        shippingAddress: {
            fullName: {type: String, required:true },
            address: {type: String, required:true },
            city: {type: String, required:true },
            pinCode: {type: Number, required:true },
            country: {type: String, required:true },
        },
        user: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User',
            required: true,
        },
        seller: { type: mongoose.Schema.Types.ObjectID, ref: 'User' },
        isRequested: {type: Boolean, default: false,},
        isDelivered: {type: Boolean, default: false,},
        deliveredAt: {type: Date},
    },
    {
        timestamps: true,
    }
);
const Order = mongoose.model('Order', orderSchema);
export default Order;