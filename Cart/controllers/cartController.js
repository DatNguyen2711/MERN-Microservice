const { json } = require('express');
const CartModel = require('../models/cartModel');
const ProductModel = require('../models/productModel');

const getCartProducts = async (req, res) => {
    try {
        const cartProducts = await CartModel.find({ UserId: req.user.id });
        if (cartProducts.length === 0) {
            return res.status(404).json({ error: 'Cart is empty' });
        }
        const cartProductIds = cartProducts.map(cartProduct => cartProduct.ProductId);
        const products = await ProductModel.find({ _id: { $in: cartProductIds } });
        let total = 0;
        products.forEach(product => {
            total += product.price;
        });
        res.status(200).json({ products, total });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

const addCartProduct = async (req, res) => {
    try {
        const cartProduct = await CartModel.create({
            UserId: req.user.id,
            ProductId: req.params.productid
        });
        res.status(201).json(cartProduct);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

const deleteCartProduct = async (req, res) => {
    try {
        const cartProduct = await CartModel.findOneAndDelete({
            UserId: req.user.id,
            ProductId: req.params.productid
        });
        if (!cartProduct) {
            return res.status(404).json({ error: 'Product not found in cart' });
        }
        res.status(200).json(cartProduct);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

const checkout = async (req, res) => {
    try {
        const cartProducts = await CartModel.deleteMany({ UserId: req.user.id });
        if (cartProducts.deletedCount === 0) {
            return res.status(404).json({ error: 'Cart is empty' });
        }
        res.status(200).json({ message: 'Checkout successful' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
    getCartProducts,
    addCartProduct,
    deleteCartProduct,
    checkout
};
