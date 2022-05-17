import { gameService } from "../../../service/game.service"

export default {
    state: {
        games: null,
        game: null,
        filterBy: {
            title: '',
            genre: ''
        },
        limit: 15,
        page: 0
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
        setFilterBy(state, { filterBy }) {
            state.filterBy = filterBy
        },
        setLimit(state, { limit }) {
            state.limit = limit
        },
        setPage(state, { diff }) {
            let { page } = state
            page += diff
            if (page < 0) {
                return
            }
            else {
                state.page = page
            }
        }
    },
    actions: {
        async loadGames({ commit, state }, { filterBy }) {
            try {
                const { filterBy, limit, page } = state
                const games = await gameService.getGames(filterBy, limit, page)
                commit({ type: 'setGames', games })

            } catch (error) {
                console.log('Cannot load games now')
            }
        },
        async loadGame({ commit }, { gameId }) {
            try {

                const game = await gameService.getGame(gameId)
                // const game = await gameService.getGameById(gameId)
                commit({ type: 'setGame', game })
                return game
            } catch (error) {
                console.log('Cannot load game now')
            }
        },
    }
}