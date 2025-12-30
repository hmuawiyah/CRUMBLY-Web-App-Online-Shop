import bcrypt from "bcryptjs";
import prisma from "../libs/prisma.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    const { name, email, password } = req.body;
    
    const existEmail = await prisma.user.findUnique({
        where: {
            email
        },
    })
    
    try {
        if(existEmail){ return res.status(400).json({ msg:"User already exists!" }); }
        if(!email || !password){ return res.status(400).json({ msg:"Please insert email or password!" }); }
        
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        })

        return res.status(200).json({msg: "Register user success!", user});

    }catch(err){
        return res.status(500).json({error: err.message});
    }
}


export const login = async (req, res) => {
    const { email, password } = req.body;
    
    try{
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        })
        if(!user){ return res.status(400).json({ msg:"Email or password is wrong!"}); }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){ return res.status(400).json({ msg:"Email or password is wrong!"}); }
    
        const token = jwt.sign({ id: user.id}, process.env.JWT_SECRET, { expiresIn: "1d" });
        return res.json({ token, user });
    }catch(err){
        return res.status(500).json({error: err.message});
    }
}