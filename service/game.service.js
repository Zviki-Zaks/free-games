import axios from 'axios'
import { storageService } from './async.service';

export const gameService = {
    getGames,
    getGame,
    getGameById
}

const GAMES_KEY = 'free games'

const options = {
    method: 'GET',
    url: 'https://free-to-play-games-database.p.rapidapi.com/api/games',
    headers: {
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com',
        'X-RapidAPI-Key': 'd3f1c4cd2dmshc8299f35c9cd3cdp174c21jsna29fef61fb0b'
    }
};
async function getGames(page) {
    let games = await storageService.query(GAMES_KEY)
    if (!games.length) {
        console.log('api')
        axios.request(options).then(function (response) {
            console.log(response.data);
            games = response.data
            storageService.post(GAMES_KEY, games)
            return games[0].slice(0, 15)
        }).catch(function (error) {
            console.error(error);
            throw new Error('error on quey FE', error)
        });
    } else {
        console.log('local')
        console.log('games', games)
        return games[0].slice(0, 15)
    }
}

async function getGame(id) {
    console.log('id', id)
    const options = {
        method: 'GET',
        url: 'https://free-to-play-games-database.p.rapidapi.com/api/game',
        params: { id },
        headers: {
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com',
            'X-RapidAPI-Key': 'd3f1c4cd2dmshc8299f35c9cd3cdp174c21jsna29fef61fb0b'
        }
    }
    axios.request(options).then(async function (response) {
        console.log(response.data);
        const game = await response.data
        return game
    }).catch(function (error) {
        console.error(error);
        throw new Error('error on quey FE', error)
    });

}

async function getGameById(id) {
    console.log(id)
    let game
    const games = await storageService.query(GAMES_KEY)
    games.forEach(arr => {
        console.log('arr', arr)
        game = arr.find(g => g.id === id)
    });
    return game
}