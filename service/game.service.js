import axios from 'axios'
import { storageService } from './async.service';

export const gameService = {
    getGames,
    getGame,
    getGameById
}

const GAMES_KEY = 'free games'
let prePage = 0

async function getGames(filterBy = { title: '', genre: 'a' }, limit, page) {
    let games = await storageService.query(GAMES_KEY)
    if (!games.length) {
        const options = {
            method: 'GET',
            url: 'https://free-to-play-games-database.p.rapidapi.com/api/games',
            headers: {
                'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com',
                'X-RapidAPI-Key': 'd3f1c4cd2dmshc8299f35c9cd3cdp174c21jsna29fef61fb0b'
            }
        };
        console.log('api')
        // return axios.request(options)
        //     .then(response => {
        //         console.log(response.data);
        //         games = response.data
        //         storageService.post(GAMES_KEY, games)
        //         return games.slice(0, 15)
        //     })
        //     .catch(error => {
        //         console.error(error);
        //         throw new Error('error on quey FE', error)
        //     });
        try {
            const res = await axios.request(options)
            games = res.data
            storageService.post(GAMES_KEY, games)
            return _filter(games.slice(page * limit, page * limit + limit), filterBy)
        } catch (error) {

            console.error(error);
            throw new Error('error getGames', error)
        }
    } else {
        console.log('local')
        games = games.flat()
        games = _filter(games, filterBy)
        return games.slice(page * limit, page * limit + limit)

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
    return axios.request(options).then(response => {
        console.log(response.data);
        const game = response.data
        return game
    }).catch(error => {
        console.error(error);
        throw new Error('error on quey FE', error)
    });

}

async function getGameById(id) {
    console.log(id)
    let game
    const games = await storageService.query(GAMES_KEY)
    games.forEach(arr => {
        game = arr.find(g => g.id === id)
    });
    return game
}

function _filter(items, { title, genre }) {
    const regexTitle = new RegExp(title, 'i')
    const regexGenre = new RegExp(genre, 'i')
    const res = items.filter(item => {
        if (regexTitle.test(item.title) && regexGenre.test(item.genre)) {
            return item
        }
    })
    return res
    // return items.filter(item => item[filterBy.title])
}