import { gameService } from "../../../service/game.service"

export default {
    state: {
        games: null,
        game: null
    },
    getters: {
        getGames({ games }) {
            return JSON.parse(JSON.stringify(games))
        },
        getGame({ game }) {
            return JSON.parse(JSON.stringify(game))
        },
    },
    mutations: {
        setGames(state, { games }) {
            state.games = games
        },
        setGame(state, { game }) {
            state.game = game
        },
    },
    actions: {
        async loadGames({ commit }, { filterBy }) {
            try {
                const games = await gameService.getGames()
                console.log('games', games)
                commit({ type: 'setGames', games })

            } catch (error) {
                console.log('Cannot load games now')
            }
        },
        async loadGame({ commit }, { gameId }) {
            try {

                const game = await gameService.getGame(gameId)
                // const game = await gameService.getGameById(gameId)
                console.log('game', game)
                commit({ type: 'setGame', game })
                return game
            } catch (error) {
                console.log('Cannot load game now')
            }
        },
    }
}