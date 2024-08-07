const Cart = require("../models/cart");

const cartController = {
    addItems: async (req, res) => {
        try {
            
            const userId = req.userId;
            
            
            const { productId, quantity } = req.body;

            
            const cart = await Cart.findOne({ user: userId });

            
            if (!cart) {
                const newCart = new Cart({
                    user: userId,
                    products: [{ product: productId, quantity }]
                });
                await newCart.save();
                return res.status(201).json({ message: 'Item added to cart' });
            }

    
            const productIndex = cart.products.findIndex(product => product.product == productId);

            
            if (productIndex === -1) {
                cart.products.push({ product: productId, quantity });
                await cart.save();
                return res.status(201).json({ message: 'Item added to cart' });
            }

            
            cart.products[productIndex].quantity += quantity;
            await cart.save();
            return res.status(201).json({ message: 'Item added to cart' });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    getCart: async (req, res) => {
        try {
            
            const userId = req.userId;

            
            const cart = await Cart.findOne({ user: userId });

            
            if (!cart) {
                return res.status(200).json({ cart: [] });
            }

            await cart.populate('products.product').execPopulate();

            return res.status(200).json({ cart: cart.products });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    updateCart: async (req, res) => {
        try {
            
            const userId = req.userId;

            
            const { productId, quantity } = req.body;

            
            const cart = await Cart.findOne({ user: userId });

            
            if (!cart) {
                return res.status(404).json({ message: 'Cart not found' });
            }

    
            const productIndex = cart.products.findIndex(product => product.product == productId);

            
            if (productIndex === -1) {
                return res.status(404).json({ message: 'Product not found in cart' });
            }

            
            cart.products[productIndex].quantity = quantity;
            await cart.save();
            return res.status(200).json({ message: 'Cart updated' });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    deleteCart: (req, res) => {
        try {

            const userId = req.userId;

            
            Cart.findOneAndDelete({ user: userId }, (error, result) => {
                if (error) {
                    return res.status(500).json({ message: error.message });
                }
                return res.status(200).json({ message: 'Cart deleted' });
            });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    removeItem: async (req, res) => {
        try {
            
            const userId = req.userId;

            
            const productId = req.params.productId;

            
            const cart = await Cart.findOne({ user: userId });

            
            if (!cart) {
                return res.status(404).json({ message: 'Cart not found' });
            }

            
            const productIndex = cart.products.findIndex(product => product.product == productId);

            
            if (productIndex === -1) {
                return res.status(404).json({ message: 'Product not found in cart' });
            }

    
            cart.products.splice(productIndex, 1);
            await cart.save();
            return res.status(200).json({ message: 'Item removed from cart' });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = cartController;