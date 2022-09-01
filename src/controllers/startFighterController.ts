import { Request, Response } from "express";
import * as starFighterService from '../services/starFighterService';

interface fighters{
    firstUser: string,
    secondUser:string,
};

export async function createBattle(req: Request, res:Response):Promise<Response>{
    try{
        //const body:{firstUser:string, secondUser:string};
        const body:fighters = res.locals.body;
        
        const result = await starFighterService.createBattle(body.firstUser, body.secondUser);

        return res.status(201).send(result);
    }catch(err){
        console.log(err);
        return res.sendStatus(500);
    }
}

export async function getRanking(req: Request, res:Response):Promise<Response|void>{
    try{
        const result = await starFighterService.getRanking();
        return res.status(200).send({fighters: result});
        
    }catch(err){
        console.log(err);
        return res.sendStatus(500);
    }
}
