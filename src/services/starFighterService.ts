import * as starFighterRepository from '../repositories/starFighterRepository';
import axios from 'axios';

interface result {
    win:string|null,
    lose:string|null,
    draw: boolean
}

type objectError = {
    code:string;
    message: string;
};


async function getUserInfo(user:string):Promise<object[]|object|never|void>{
    const promise = axios.get(`/https://api.github.com/users/${user}/repos`);
    promise.then(res=>{
        const result:object|object[]= res.data.message;
        return result;
    });
    promise.catch(err=>{
        const error:objectError = {code:"InternalServerError", message:`Error on connecting to github api`};
        throw(error);
    })
}

export async function createBattle(firstUser:string, secondUser:string):Promise<void|result>{
    
}

    
