import { QueryResult } from 'pg';
import { connection } from '../databse';

// type resultType =  "wins"|"losses"|"draws";

export async function getUser(userName: string): Promise<object[]> {
    const user: QueryResult<object[] | never> = await connection.query(`
    SELECT * 
    FROM fighters
    WHERE username=$1`,
        [userName]);

    return user.rows;
}

export async function insertUser(username: string, wins: number, losses: number, draws: number): Promise<number | never> {
    const result: QueryResult<object[] | never> = await connection.query(`
    INSERT INTO fighters 
    (username, wins, losses, draws)
    VALUES ($1, $2, $3, $4)
    `,
        [username, wins, losses, draws]);

    return result.rowCount;
}

// export async function updateUser(username: string, type:resultType) {
//     const result = await connection.query(`
//         UPDATE fighters 
//         SET $1 = $1 +1
//         WHERE username=$2
//     `,
//         [type,username]);
//     console.log( result.rowCount);
// }


export async function updateUserLosses(username: string) {
    const result = await connection.query(`
        UPDATE fighters 
        SET losses=losses+1
        WHERE username=$1
    `,
        [username]);
    return result.rowCount;
}

export async function updateUserWin(username: string) {
    const result = await connection.query(`
        UPDATE fighters 
        SET wins=wins+1
        WHERE username=$1
    `,
        [username]);
    return result.rowCount;
}

export async function updateUsersDraw(username1: string, username2:string) {
    const result = await connection.query(`
        UPDATE fighters 
        SET draws=draws+1
        WHERE username=$1 OR username=$2
    `,
        [username1, username2]);
}

export async function getAllUsers() {
    const users = await connection.query(`
    SELECT * FROM fighters
    ORDER BY wins DESC, draws DESC`);
    return users.rows;
}