import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "El Nombre Es Obligatorio"]
    },
    surname: {
        type: String,
        required: [true, "El Apellido Es Obligatorio"]
    },
    username: {
        type: String,
        required: [true, "El Nombre de Usuario Es Obligatorio"]
    },
    email:{
        type: String,
        required: [true, "El Correo Es Obligatorio"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "La Contraseña Es Obligatoria"]
    },
    role: {
        type: String,
        required: [true, "El Rol Es Obligatorio"],
        enum: ["TEACHER_ROLE","STUDENT_ROLE"]
    },
    cursos: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Course"  // Asume que ya se tiene un modelo de "Curso" que puedes referenciar
    }],
    estado: {
        type: Boolean,
        default: true
    }
});

UserSchema.methods.toJSON = function() {
    const {__v,password, _id, ...usuario} = this.toObject();
    usuario.uid = _id;
    return usuario;
}

export default mongoose.model("User", UserSchema);