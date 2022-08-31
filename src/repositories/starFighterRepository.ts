import { QueryResult } from 'pg';
import {connection} from '../databse';

async function getUser(userName:string):Promise<void|object>{
    const user:QueryResult<object[]|never> = await connection.query(`
    SELECT * 
    FROM fighters
    WHERE username=$1`,
    [userName]);

    return user.rows;
}

export const starFighterRepository = {
    getUser
}