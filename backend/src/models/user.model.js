import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
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

export default mongoose.model('User', userSchema);
