import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required:true,
    trim: true
  },
  email:{
    type: String,
    required: true, 
    trim: true,
  },
  password:{
    type: String,
    required: true,
    trim: true
  },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course'  // Referencia al modelo de cursos si existe
    }
  ],
  stripeCustomerId: {
    type: String  // ID del cliente de Stripe si necesitas almacenarlo
  },
}, {
  timestamps: true
});



export default mongoose.model('User', userSchema)