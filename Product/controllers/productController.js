const express = require('express');
const productModel = require('../models/productModel');

const app = express();

app.use(express.json());

const getProducts = async (req, res) => {
    try {
        const products = await productModel.find();
        res.status(200).json(products);
    } catch (error) {
        console.log("error " + error.message);
        res.status(500).json({ error: 'Server error' });
    }
};

const getProductByName = async (req, res) => {
    try {
        const product = await productModel.find({ name: req.params.name });
        if (!product) {
            res.status(404).json({ error: 'Product not found' });
        } else {
            res.status(200).json(product);
        }
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

const getProductById = async (req, res) => {
    try {
        const productDetails = await productModel.findById(req.params.id);
        if (!productDetails) {
            res.status(404).json({ error: 'Product not found' });
        } else {
            res.status(200).json(productDetails);
        }
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

const findProduct = async (req, res) => {
    try {
        const product = await productModel.findOne({
            $or: [{ name: req.params.idOrName }, { _id: req.params.idOrName }]
        });
        if (!product) {
            res.status(404).json({ error: 'Product not found' });
        } else {
            res.status(200).json(product);
        }
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

const createProduct = async (req, res) => {
    try {
        const product = await productModel.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
    getProducts,
    getProductByName,
    createProduct,
    getProductById,
    findProduct
};
