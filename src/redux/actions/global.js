export const START_GAME = 'START_GAME'
export const RESIZE = 'RESIZE'
export const MUTATE_DATA = 'MUTATE_DATA'
export const CHANGE_GAME_STATE = 'CHANGE_GAME_STATE'
export const SHOW_HUMER = 'SHOW_HUMER'
export const SHOW_MENU = 'SHOW_MENU'
export const SELECT = 'SELECT'

export const start_game = (app) => ({
    type: START_GAME,
    data: {
        app
    }
})

export const resize = () => ({
    type: RESIZE
})

export const mutate_data = (mutate, key) => ({
    type: MUTATE_DATA,
    data: {
        mutate,
        key
    }
})

export const show_humer = () => ({
    type: SHOW_HUMER
})

export const change_game_state = (new_state) => ({
    type: CHANGE_GAME_STATE,
    data: {
        new_state
    }
})

export const show_menu = () => ({
    type: SHOW_MENU
})

export const select = (value) => ({
    type: SELECT,
    data: {
        value
    }
})