// const express = require('express')
// const {PrismaClient} = require('@prisma/client')
// const cors = require('cors');
// const prisma = new PrismaClient();
// const app = express();   //initializing the application

// app.use(express.json());  //use json format when parsing a request


// //cors

// // Correct CORS setup
// app.use(cors({
//     origin: 'http://localhost:3000', // Allow frontend origin
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
//     allowedHeaders: ['Content-Type', 'Authorization'], // Add 'Authorization' if needed
// }));

// // Handle OPTIONS requests for preflight
// app.options('*', cors()); // Explicitly handle preflight requests



// //testing apis for errors/endpoints

// app.get('/test', async (req, res)=>{
//       try{
//           res.status(200).json("APT working good!");
//       }catch(error){
          
//           res.status(500).json("Internal Server Error");
//       }
// });

// //get users
// app.get('/users', async (req, res)=>{
//     try{
//         const users = await prisma.user.findMany();
//         res.status(200).json(users);
//     }catch(error){
//         res.status(500).json({message: error.message});
//     }
// });

// //get user by id

// app.get('/users/:id', async(req, res)=>{
//     try{
//         const user = await prisma.user.findUnique({
//             where:{
//                 id: Number(req.params.id),
//             },
//         });
//         res.status(200).json(user);

//     }catch(error){
//         res.status(500).json({message: error.message});
//     }
// })

// //create user
// //id will be generated default thats why not given
// app.post('/users', async(req, res)=>{
//     try{

//         const user = await prisma.user.create({
//             data:{
//                 name: req.body.name,
//                 email: req.body.email,
//             },
//         });
//         res.status(201).json(user);

//     }catch(error){
//         res.status(500).json({message: error.message});
//     }
// })

// //update user
// app.put('/users/:id', async(req, res)=>{
//     try{
//         const user = await prisma.user.update({
//             where:{
//                 id: Number(req.params.id),
//             },
//             data:{
//                 name: req.body.name,
//                 email: req.body.email,
//             },
//         });
//         res.status(200).json(user);

//     }catch(error){
//         res.status(500).json({message: error.message});
//     }
// });

// //delete user
// app.delete('/users/:id', async(req, res)=>{
//     try{
//         const user = await prisma.user.delete({
//             where:{
//                 id: Number(req.params.id),
//             },
//         });
//         res.status(200).json(user);

//     }catch(error){
//         res.status(500).json({message: error.message});
//     }
// });


// //start server plz

// const PORT = process.env.PORT || 4000;
// app.listen(PORT, ()=>{
//     console.log(`Server is running on port ${PORT}`);
// });

const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');
const prisma = new PrismaClient();
const app = express(); // Initializing the application

// Middleware to parse JSON
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000', // Allow only your frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
}));

  

// Test API for errors/endpoints
app.get('/test', async (req, res) => {
    try {
        res.status(200).json("API working good!");
    } catch (error) {
        res.status(500).json("Internal Server Error");
    }
});

// Get all users
app.get('/users', async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get user by ID
app.get('/users/:id', async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: Number(req.params.id) },
        });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create user
app.post('/users', async (req, res) => {
    try {
        const user = await prisma.user.create({
            data: {
                name: req.body.name,
                email: req.body.email,
            },
        });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update user
app.put('/users/:id', async (req, res) => {
    try {
        const user = await prisma.user.update({
            where: { id: Number(req.params.id) },
            data: {
                name: req.body.name,
                email: req.body.email,
            },
        });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete user
app.delete('/users/:id', async (req, res) => {
    try {
        const user = await prisma.user.delete({
            where: { id: Number(req.params.id) },
        });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
