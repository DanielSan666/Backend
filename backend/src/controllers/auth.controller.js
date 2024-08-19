import User from "../models/user.model.js";
import bcrypt from 'bcrypt'
import { createAccesToken } from "../libs/jwt.js";
import { NODE_ENV } from "../config.js";

export const register = async (req, res) => {
    const { email, password, username, role } = req.body;

    try {
        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: passwordHash,
            role
        });

        const userSaved = await newUser.save();
        const token = await createAccesToken({ id: userSaved._id });

        res.cookie('token', token);
        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            role: userSaved.role,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt,
        });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ message: error.message });
    }
};

export const login = async(req, res) => {
    const {email, password} = req.body

    try{

        const userFound = await User.findOne({ email })
        if(!userFound) return res.status(400).json({ message: "User not found"});

        const isMatch =  await bcrypt.compare(password, userFound.password)
        if (!isMatch) return res.status(400).json({ message: "Incorrect password"})

      
        const token = await createAccesToken({id: userFound._id})

        
    res.cookie('token', token,{
        httpOnly: true,
    secure: NODE_ENV === 'production',
    maxAge: 3600000 
    }) 
        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
            token: token
        })
    } catch(error){
        res.status(500).json({ message: error.message})
    }
    
};

export const logout = (req, res) => {
    res.cookie('token', "",{
        expires: new Date(0)
    })
    return res.sendStatus(200)
}

export const profile = async (req, res) => {
    try {
      const userFound = await User.findById(req.user.id).populate('courses'); // Populate if courses are references to another model
  
      if (!userFound) return res.status(400).json({ message: "User not found" });
  
      return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        role: userFound.role, // Incluye el campo `role` en la respuesta
        courses: userFound.courses, // Asegúrate de que este campo esté correctamente poblado
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt
      });
    } catch (error) {
      console.error('Error fetching user profile:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  