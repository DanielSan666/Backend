import { Router } from "express";
import { login, logout, profile, register } from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { adminRequired } from "../middlewares/adminRequired.js"; // Importa el middleware adminRequired

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile", authRequired, profile);

// Ejemplo de ruta solo para administradores
router.get("/admin", authRequired, adminRequired, (req, res) => {
    res.json({ message: "Welcome, admin!" });
});

export default router;
