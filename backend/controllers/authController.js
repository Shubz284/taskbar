const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { registerSchema, loginSchema } = require("../validation/Schemas");
const User = require("../models/User");


const signup = async(req, res) => {
    const parseData = registerSchema.safeParse(req.body);
        
        if(!parseData.success){
            return res.status(400).json({
              success:false,
              message: "Invalid input data",
              errors: parseData.error.format(),
            });
        }
    
        try {
            const { email, name, password } = parseData.data;
            const hashedPassword = await bcrypt.hash(password, 10);
            const existingUser = await User.findOne({ email});
            if(existingUser){
                return res.status(400).json({
                    msg:"Email already registered"
                })
            }
            await User.create({
                email:email,
                password:hashedPassword,
                name:name
            })
    
             res.status(201).json({
                msg:"Successfully signed up"
            })
        } catch (error) {
            return res.status(400).json({
                msg:"Server error"
            })
        }
}

const signin = async(req, res) => {
    const parseData = loginSchema.safeParse(req.body)
        if (!parseData.success) {
          return res.status(400).json({
            success: false,
            message: "Invalid input data",
            errors: parseData.error.format(),
          });
        }
    
        const { email, password } = parseData.data;
    
        try {
            const user = await User.findOne({email:email})
            if (!user) {
              return res.status(403).json({ msg: "User not found" });
            }
    
            const passwordMatch = await bcrypt.compare(password, user.password)
            if (!passwordMatch) {
              return res.status(403).json({ msg: "Invalid credentials"});
            }
            
            const token = jwt.sign({
                id:user._id
            }, process.env.JWT_TOKEN)
    
            res.status(201).json({
                success:true,
                msg:"Log in successfully",
                token:token
            })
        } catch (error) {
            res.status(403).json({
                success:false,
                msg:"Invalid credentials"
            })
        }
}


module.exports = {signup, signin}