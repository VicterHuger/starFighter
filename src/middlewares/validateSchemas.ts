import { Request, Response, NextFunction } from "express";
import {stripHtml} from "string-strip-html";
import joi from 'joi';


export function validateSchema(schema:joi.ObjectSchema<string>){
    return (req:Request,res:Response, next:NextFunction)=>{
        const body:object = req.body;

        for(const key of Object.keys(body)){
            body[key]=stripHtml(body[key])?.result.trim() ?? body[key];
        }

        const error:joi.ValidationError = schema.validate(body, {abortEarly:false}).error;

        let message:string='';

        if(error){
            const errorMessages:string[]=error.details.map(item=>item.message);
            
            errorMessages.forEach(err=>{message+=`${err}\n`});
            return res.status(422).send(message);

        } else {
            res.locals.body=body;
            next();
        }
    
    }
        
}
