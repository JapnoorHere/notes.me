const express = require('express');
const app = express();
const port = 4000;
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./schema/userSchema');

const mongoURL = 'mongodb://localhost:27017/';

mongoose.connect(mongoURL);

mongoose.connection.once('open', () => {
    console.log('mongodb connected');
})

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    

    try {
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const newUser = new User({ name, email, password });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: error, error: error });
    }

})

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      if (user.password !== password) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
  
      res.status(200).json({ message: 'Login successful' });
    } catch (error) {
      res.status(500).json({ message: 'Error logging in'});
    }
  });

  app.put('/home',async(req,res)=>{
    const { email } = req.body;  

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ notes: user.notes });
    } catch (error) {
        console.error('Error fetching notes:', error.message);
        res.status(500).json({ message: 'Error fetching notes', error: error.message });
    }
  })
  
  app.get('/home',async(req,res)=>{
    const { email } = req.body;  

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ notes: user.notes });
    } catch (error) {
        console.error('Error fetching notes:', error.message);
        res.status(500).json({ message: 'Error fetching notes', error: error.message });
    }
  })

  app.post('/home',async (req,res)=>{
    const {email,note} = req.body;
    console.log(req.body);
    try {
      const user = await User.findOne({email});
      if (!user) {
          throw new Error('User not found');
      }
      user.notes.push(note);
      await user.save();
      console.log('Note added successfully');
  } catch (err) {
      console.error('Error adding note:', err.message);
  }
  })


app.listen(port, () => {
    console.log('4000 listening');
});