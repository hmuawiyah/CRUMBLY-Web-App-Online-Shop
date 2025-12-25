import prisma from "../libs/prisma.js";

export const createProduct = async (req, res) => {
    const {
        name,
        description,
        price,
        stock,
        imageUrl
    } = req.body;
    try {
        const product = await prisma.products.create({
            data: {
                name,
                description,
                price,
                stock,
                imageUrl,
            },
        });

        // console.log({
        //     product
        // });
        return res.status(201).json({
            msg: "success create product!",
            product
        });
    } catch (err) {
        return res.status(500).json({
            error: err.message
        });
    }
};

export const readProductByIds = async (req, res) => {
    try {
        const {
            ids
        } = req.body

        if (!Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({
                message: 'ids harus array dan tidak kosong'
            })
        }

        const products = await prisma.products.findMany({
            where: {
                id: {
                    in: ids.map(id => Number(id))
                }
            }
        })

        res.json(products)
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }
};

export const readProduct = async (req, res) => {
    const {
        id
    } = req.params;
    try {
        const product = await prisma.products.findUnique({
            where: {
                id: Number(id)
            },
        });

        // console.log({
        //     product
        // });
        return res.status(200).json({
            msg: "success get product!",
            product
        });
    } catch (err) {
        return res.status(500).json({
            error: err.message
        });
    }
};

export const readAllProduct = async (req, res) => {
    try {
        const products = await prisma.products.findMany();

        // console.log({
        //     products
        // });
        return res.status(200).json({
            msg: "success get all products!",
            products
        });
    } catch (err) {
        return res.status(500).json({
            error: err.message
        });
    }
};

export const updateProduct = async (req, res) => {
    const {
        id
    } = req.params;
    const {
        name,
        description,
        price,
        stock,
        imageUrl
    } = req.body;
    const updateData = {};

    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (price) updateData.price = price;
    if (stock) updateData.stock = stock;
    if (imageUrl) updateData.imageUrl = imageUrl;

    try {
        const product = await prisma.products.update({
            where: {
                id
            },
            data: updateData,
        });
        // console.log({
        //     product
        // });
        return res.status(200).json({
            msg: "success update product!",
            product
        });
    } catch (err) {
        return res.status(500).json({
            error: err.message
        });
    }
};

export const deleteProduct = async (req, res) => {
    const {
        id
    } = req.params;
    try {
        const product = await prisma.products.delete({
            where: {
                id
            },
        });

        // console.log({
        //     product
        // });
        return res.status(200).json({
            msg: "success delete product!",
            product
        });
    } catch (err) {
        return res.status(500).json({
            error: err.message
        });
    }
};