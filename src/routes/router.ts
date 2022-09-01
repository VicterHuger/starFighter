import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchemas";
import battleSchema from "../schemas/battleSchema";
import * as starFighterController from "../controllers/startFighterController";

const router:Router = Router();

router.post("/battle", validateSchema(battleSchema), starFighterController.createBattle);
router.get("/ranking", starFighterController.getRanking);

export default router;