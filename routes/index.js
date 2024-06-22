const express = require('express');
const router = express.Router();
const { sendEmail } = require("./controllers/contact")
const connectToDb = require('./dbConnection');
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
    res.send('Welcome to the Express App!');
});

router.post('/login', async (req, res) => {
    const loginData = req.body;
    
    try {
        const db = await connectToDb();
        const user = await db.collection('Users').findOne({ email: loginData.email });
        
        if (user && (loginData.password === user.password)){
            res.status(200).json({ message: 'Log in successful', isAdmin: user.isAdmin || false });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Login failed' });
    }
});


router.post('/register', async (req, res) => {
    const registerData = req.body;
    try {
        const db = await connectToDb();
        const result = await db.collection('Users').insertOne(registerData);
        res.status(200).json({ message: 'Registration successful', userId: result.insertedId });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Registration failed' });
    }
});

router.post('/contact', (req, res) => {
    const contactData = req.body;
    sendEmail(contactData).then(() => {
        res.status(200).json({ message: 'Email sent successfully' });
    }).catch((error) => {
        res.status(500).json({ error: 'Failed to send email' });
    });
});

router.post('/admin/slideFormData', async (req, res) => {
    try {
        const db = await connectToDb();
        await db.collection('SlideFormData').insertOne(req.body);
        res.status(200).json({ message: 'Slide data received and saved in db' });
    } catch (error) {
        console.error('Error saving slide data:', error);
        res.status(500).json({ error: 'Failed to save slide data' });
    }
});

router.get('/admin/getSlideFormData', async (req, res) => {
    try {
        const db = await connectToDb();
        const slideData = await db.collection('SlideFormData').find().toArray();
        res.send(slideData)
    } catch (error) {
        console.error('Error retrieving slide data:', error);
        res.status(500).json({ error: 'Failed to retrieve slide data' });
    }
});

router.post('/admin/testimonialFormData', async (req, res) => {
    try {
        const db = await connectToDb();
        await db.collection('TestimonialFormData').insertOne(req.body);
        res.status(200).json({ message: 'Slide data received and saved in db' });
    } catch (error) {
        console.error('Error saving slide data:', error);
        res.status(500).json({ error: 'Failed to save slide data' });
    }
}) 

router.get('/admin/getTestimonialFormData', async (req, res) => {
    try {
        const db = await connectToDb();
        const slideData = await db.collection('TestimonialFormData').find().toArray();
        res.send(slideData);
    } catch (error) {
        console.error('Error retrieving slide data:', error);
        res.status(500).json({ error: 'Failed to retrieve slide data' });
    }
}) 


router.post('/admin/productFormData', async (req, res) => {
    try {
        const db = await connectToDb();
        await db.collection('ProductFormData').insertOne(req.body);
        res.status(200).json({ message: 'Product data received and saved in db' });
    } catch (error) {
        console.error('Error saving slide data:', error);
        res.status(500).json({ error: 'Failed to save slide data' });
    }
}) 

router.get('/admin/getProductFormData', async (req, res) => {
    try {
        const db = await connectToDb();
        const slideData = await db.collection('ProductFormData').find().toArray();
        res.send(slideData);
    } catch (error) {
        console.error('Error retrieving slide data:', error);
        res.status(500).json({ error: 'Failed to retrieve slide data' });
    }
}) 

module.exports = router;
