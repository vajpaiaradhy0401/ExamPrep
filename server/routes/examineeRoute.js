const User = require('../models/Examinee')
const express = require('express');
const router = express.Router();
const Examinee = require('../models/Examinee');
const sendEmail = require('../utils/sendEmail')

router.get('/', async (req, res) => {
    const examinee = await Examinee.find()
    return res.json({ data: examinee });
})

router.post('/', async (req, res) => {
    const { email,name } = req.body;
    const existingExaminee = await Examinee.findOne({email:email});
    if (existingExaminee) {
      return res.status(400).json({message: "Examinee with this email already exists."});
    }
    const examinee = await new Examinee(req.body);
    examinee.save();
    res.json({message:"Registered Succussfully"})
    const html = `
  <div style="font-family: 'Segoe UI', sans-serif; background: linear-gradient(135deg, #e3f2fd, #ffffff); padding: 40px;">
    <div style="max-width: 650px; margin: auto; background: #ffffff; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); overflow: hidden;">
     
      <!-- Header -->
      <div style="background: linear-gradient(90deg, #007bff, #00c6ff); padding: 25px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 28px;">🎓 Welcome to Softpro!</h1>
      </div>
     
      <!-- Body -->
      <div style="padding: 30px;">
        <p style="font-size: 18px; color: #333;"><strong>Dear ${name},</strong></p>

        <p style="font-size: 16px; color: #555; line-height: 1.6;">
          We're excited to welcome you to the <strong>Softpro Exam Prep</strong>! Your registration was successful, and your account is now active.
        </p>

        <p style="font-size: 16px; color: #555; line-height: 1.6;">
          You can now log in to access your dashboard, take exams, track your progress, and explore learning resources.
        </p>

        <!-- CTA Button -->
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://localhost:5000/login&quot; style="background: #007bff; color: #fff; padding: 12px 24px; font-size: 16px; border-radius: 6px; text-decoration: none; display: inline-block;">
            🔐 Log in to Your Account
          </a>
        </div>

        <p style="font-size: 16px; color: #555;">
          If you have any questions or face issues logging in, feel free to contact our support team.
        </p>

        <p style="margin-top: 30px; font-size: 16px; color: #333;">
          Best regards,<br>
          <strong>Team Softpro</strong>
        </p>
      </div>

      <!-- Footer -->
      <div style="background-color: #f1f1f1; text-align: center; padding: 20px; font-size: 12px; color: #777;">
        This is an automated message. Please do not reply to this email.
      </div>
    </div>
  </div>
`;

    setTimeout(async () => {
        await sendEmail(email, "Welcome to the Exam Portal", html);
    }, 100)
});

router.delete('/:id', async(req,res)=>{
    const {id} =  req.params
    const examinee = await Examinee.findByIdAndDelete(id);
    //session.save();
    return res.json({message:"Deleted Successfully"});
})

router.put('/:id',async(req,res)=>{
    const {id} = req.params
    const examinee = await Examinee.findByIdAndUpdate(id, req.body);
    return res.json({message:"updated Successfully"}); 
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    // console.log(req.body)
    try {
        const examinee = await Examinee.findOne({ email: email })
        if (!examinee) {
            return res.json({ message: "Your Email Incorrect" })
        }
        if (examinee.password == password) {
            return res.json({
                message: "Login Successfully",
                user: {
                    email: examinee.email,
                    role: "user",
                    id: examinee._id
                }
            })
        }
    }
    catch (er) {
        console.log(er);

    }
})

// change password LOGIC
router.put('/pass/:id', async (req, res) => {
    const { op, np, cnp } = req.body
    const examinee = await Examinee.find({_id:req.params.id});
    if(!examinee){
      return res.json({message:"Examinee Not Found"})
    }
    if(examinee[0].password !== op){
      return res.json({message:"Old Password is Incorrect"})
    }
    if (np !== cnp) {
      return res.json({message:"New Password and Confirm Password is not same"})
      }
      try{
        const updatedExaminee = await Examinee.findByIdAndUpdate(req.params.id, { $set:
          {password:np}},
          {new:true});
      }catch{
        console.error('Error updating paassword:',error);
        return res.status(500).json({ message: "Server error while chnaging password"})
      }   
})

module.exports = router;