import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchemas";
import battleSchema from "../schemas/battleSchema";

const router:Router = Router();

router.post("/battle", validateSchema(battleSchema), );

export default router;