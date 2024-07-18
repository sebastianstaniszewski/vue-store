import express from 'express';
import {MongoClient} from 'mongodb';
import path from 'path';
import cors from 'cors';

const password = process.env.PASSWORD;
const encodedPassword = password;

async function execute() {
    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use('/images', express.static(path.join(__dirname, '../assets/images')));
    app.use(express.static(
        path.join(__dirname, '../dist'),
        {maxAge: '1y', etag: false},
    ));


    const dbUrl = `mongodb+srv://sebastian:${encodedPassword}@cluster0.aondbjl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
    const client = new MongoClient(dbUrl);

    await client.connect();
    const db = client.db('shop');

    const fulfilledCart = async (cartItems) => {
        const productIds = cartItems.map(item => item.id);
        const products = await db.collection('products').find({id: {$in: productIds}}).toArray();
        return products.map(product => {
            const cartItem = cartItems.find(item => item.id === product.id);
            return {
                ...product,
                amount: cartItem.amount
            };
        });
    };

    const validateId = (id) => typeof id === 'string' && id.trim() !== '';
    const validateStock = (stock) => Number.isInteger(stock) && stock >= 0;

    const handleIdValidation = (id, res) => {
        if (!validateId(id)) {
            return res.status(400).json({error: 'Invalid id'});
        }
    }

    const handleStockValidation = (stock, res) => {
        if (!validateStock(stock)) {
            return res.status(400).json({error: 'Invalid id'});
        }
    }


    app.get('/products', async (req, res) => {
        try {
            const products = await db.collection('products').find({}).toArray();
            res.json(products);
        } catch (error) {
            console.error('Error', error.message);
            res.status(500).json({error: 'An error occurred during data processing'});
        }
    });


    app.get('/api/products/:productId', async (req, res) => {
        try {
            const productId = req.params.productId;

            handleIdValidation(productId, res)

            const product = await db.collection('products').findOne({id: productId});
            if (!product) {
                return res.status(404).json({error: 'No matching product'});
            }
            res.send(product);
        } catch (error) {
            console.error('Error', error.message);
            res.status(500).json({error: 'An error occurred during data processing'});
        }
    });


    app.get('/api/users/:userId/cart', async (req, res) => {
        try {
            const userId = req.params.userId;

            handleIdValidation(userId, res);

            const user = await db.collection('users').findOne({id: userId});

            if (!user) {
                return res.status(404).json({error: 'No matching user'});
            }

            const filledCart = await fulfilledCart(user.cartItems);
            res.json(filledCart);

        } catch (error) {
            console.error('Error', error.message);
            res.status(500).json({error: 'An error occurred during data processing'});
        }
    });


    app.get('/api/categories', async (req, res) => {
        try {
            const categories = await db.collection('categories').find({}).toArray();
            res.send(categories);
        } catch (error) {
            console.error('Error', error.message);
            res.status(400).json({error: error.message});
        }
    });


    app.get('/api/categories/:categoryName/products', async (req, res) => {
        try {
            const categoryName = req.params.categoryName;
            const products = await db.collection('products').find({category: categoryName}).toArray();
            res.json(products);
        } catch (error) {
            console.error('Error', error.message);
            res.status(400).json({error: error.message});
        }
    });


    app.post('/api/users/:userId/cart', async (req, res) => {
        try {
            const userId = req.params.userId;
            const {id, amount = 1} = req.body;

            handleIdValidation(userId, res);
            handleIdValidation(id, res);

            if (!Number.isInteger(amount) || amount < 1) {
                return res.status(400).json({error: 'Invalid amount'});
            }

            const existingUser = await db.collection('users').findOne({id: userId});

            if (!existingUser) {
                await db.collection('users').insertOne({id: userId, cartItems: [{id, amount}]});
            } else {
                const productIndex = existingUser.cartItems.findIndex(item => item.id === id);
                if (productIndex > -1) {
                    existingUser.cartItems[productIndex].amount += amount;
                } else {
                    existingUser.cartItems.push({id, amount});
                }
                await db.collection('users').updateOne({id: userId}, {$set: {cartItems: existingUser.cartItems}});
            }

            const user = await db.collection('users').findOne({id: userId});
            const filledCart = await fulfilledCart(user.cartItems);
            res.json(filledCart);
        } catch (error) {
            console.error('Error', error.message);
            res.status(400).json({error: error.message});
        }
    });


    app.post('/api/products/:productId', async (req, res) => {
        try {
            const productId = req.params.productId;
            const stockFromBody = Number(req.body.stock);

            handleIdValidation(productId, res)
            handleStockValidation(stockFromBody, res)

            const product = await db.collection('products').findOne({id: productId});
            if (!product) {
                return res.status(404).json({error: 'No matching product'});
            }
            await db.collection('products').updateOne({id: productId}, {$set: {stock: stockFromBody}});
            const updatedProduct = await db.collection('products').findOne({id: productId});
            res.json(updatedProduct);
        } catch (error) {
            console.error('Error:', error.message);
            res.status(400).json({error: error.message});
        }
    });

    app.put('/api/users/:userId/cart/:productId', async (req, res) => {
        try {
            const userId = req.params.userId;
            const productId = req.params.productId;
            const {amount} = req.body;

            handleIdValidation(userId, res);
            handleIdValidation(productId, res);

            if (!Number.isInteger(amount) || amount < 1) {
                return res.status(400).json({error: 'Invalid amount'});
            }

            const user = await db.collection('users').findOne({id: userId});
            if (!user) {
                return res.status(404).json({error: 'No matching user'});
            }

            const productIndex = user.cartItems.findIndex(item => item.id === productId);
            if (productIndex === -1) {
                return res.status(404).json({error: 'No matching product in cart'});
            }

            user.cartItems[productIndex].amount = amount;
            await db.collection('users').updateOne({id: userId}, {$set: {cartItems: user.cartItems}});
            res.json(user.cartItems);
        } catch (error) {
            console.error('Error', error.message);
            res.status(500).json({error: 'An error occurred during data processing'});
        }
    });

    app.delete('/api/users/:userId/cart/:productId', async (req, res) => {
        try {
            const userId = req.params.userId;
            const productId = req.params.productId;

            handleIdValidation(userId, res);
            handleIdValidation(productId, res);

            await db.collection('users').updateOne(
                {id: userId},
                {$pull: {cartItems: {id: productId}}}
            );

            const user = await db.collection('users').findOne({id: userId});
            const filledCart = await fulfilledCart(user?.cartItems);

            res.json(filledCart);
        } catch (error) {
            console.error('Error', error.message);
            res.status(400).json({error: error.message});
        }
    });


    app.delete('/api/users/:userId/cart', async (req, res) => {
        try {
            const userId = req.params.userId;

            handleIdValidation(userId, res)

            await db.collection('users').updateOne({id: userId}, {$set: {cartItems: []}});
            res.json([]);
        } catch (error) {
            console.error('Error', error.message);
            res.status(400).json({error: error.message});
        }
    });

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../dist/index.html'));
    });


    const port = process.env.PORT || 8000;

    app.listen(port, () => {
        console.log('Server is listening on port ' + port);
    });
}


execute();