import { Request, Response } from "express";
import * as starFighterService from '../services/starFighterService';

export async function createBattle(req: Request, res:Response):Promise<Response>{
    try{
        interface fighters{
            firstUser: string,
            secondUser:string,
        }; 

        const body:fighters = req.body;
        
        const result = await starFighterService.createBattle(body.firstUser, body.secondUser);

        return res.status(201).send(result);
    }catch(err){
        console.log(err);
        return res.sendStatus(500);
    }
}