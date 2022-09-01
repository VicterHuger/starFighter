import * as starFighterRepository from '../repositories/starFighterRepository';
import axios, { AxiosResponse } from 'axios';
import { connection } from '../databse';
import { object } from 'joi';

// interface result {
//     win:string|null,
//     looses:string|null,
//     draw: boolean
// }

// interface githubResponse {
//     message:string,
//     docummentation_url: string
// }

interface githubRepository {
    stargazers_count: number
}

type objectError = {
    code: string;
    message: string;
};


async function getUserInfo(user: string) { //:Promise<githubResponse|object[]|never>
    return await axios.get(`https://api.github.com/users/${user}/repos`)
        .then(res => {
            const result = res.data;
            return result;
        }).catch(err => {
            const error: objectError = { code: "InternalServerError", message: `Error on connecting to github api` };
            throw (error);
        })
}

function verifyGithubUserError(userInfo: { message: string }) { //:never|void

    const errorMessage: objectError = { code: "NotFound", message: `There isn't a github user called ${userInfo}` };
    throw (errorMessage);

}

async function insertUserIfNotExistUser(user: object[], username: string) { //:Promise<void|never>
    if (user.length === 0) {
        const insertedUser = await starFighterRepository.insertUser(username, 0, 0, 0);
        if (insertedUser === 0) {
            const errorMessage: objectError = { code: "InternalServerError", message: `It was not possible to insert the user ${username}` };
            throw (errorMessage);
        }
    }
}

function countStars(repositories: []): number {
    if (repositories.length === 0) return 0;
    const count = repositories.reduce((prev, curr: githubRepository) => {
        return prev + curr.stargazers_count
    }, 0);
    return count;
}

export async function createBattle(firstUser: string, secondUser: string) { //:Promise<void|result|never>

    const resultExistingUser1 = await getUserInfo(firstUser);
    const resultExistingUser2 = await getUserInfo(secondUser);

    resultExistingUser1.message === "Not Found" ? verifyGithubUserError(resultExistingUser1) : "";
    resultExistingUser2.message === "Not Found" ? verifyGithubUserError(resultExistingUser2) : "";

    const user1 = await starFighterRepository.getUser(firstUser);
    const user2 = await starFighterRepository.getUser(secondUser);

    if(user1.length===0) await insertUserIfNotExistUser(user1, firstUser);
    if(user2.length===0) await insertUserIfNotExistUser(user2, secondUser);

    const starsCountUser1 = countStars(resultExistingUser1);
    const starsCountUser2 = countStars(resultExistingUser2);

    const result: { winner: string | null, loser: string | null, draw: boolean } = {
        winner: null,
        loser: null,
        draw: true
    }

    if (starsCountUser1 !== starsCountUser2) {
        result.winner = starsCountUser1 > starsCountUser2 ? firstUser : secondUser;
        result.loser = starsCountUser1 < starsCountUser2 ? firstUser : secondUser;
        result.draw = false;
    }

    if (result.winner) {
        await starFighterRepository.updateUserWin(result.winner);
        await starFighterRepository.updateUserLosses(result.loser);
    } else {
        await starFighterRepository.updateUsersDraw(firstUser, secondUser);
    }
    return result;
}

export async function getRanking() {
    return await starFighterRepository.getAllUsers();
}


