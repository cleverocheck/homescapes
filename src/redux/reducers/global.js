import { START_GAME, RESIZE, MUTATE_DATA, CHANGE_GAME_STATE, SHOW_HUMER, SHOW_MENU, SELECT } from 'redux/actions/global'

const get_data = (data_mutate, scene) => {
    let data = {}
    data.window = {
        height: window.innerHeight,
        width: window.innerWidth
    }
    const bg_proportion = 2.13
    const bg_cut_x = (data.window.width - (data.window.height * bg_proportion >= data.window.width ? data.window.height * bg_proportion : data.window.width)) / 2
    data.bg = {
        height: data.window.height,
        width: data.window.height * bg_proportion >= data.window.width ? data.window.height * bg_proportion : data.window.width,
        x: data.window.width / 2,
        y: data.window.height / 2
    }
    data.austin = {
        height: 0.45 * data.bg.height,
        width: 0.07 * data.bg.width,
        x: 0.5 * data.bg.width + bg_cut_x,
        y: 0.2 * data.bg.height
    }
    data.big_decoration = {
        height: 0.95 * data.bg.height,
        width: 0.82 * data.bg.width,
        x: 0.06 * data.bg.width + bg_cut_x
    }
    data.stair_old = {
        height: 0.74 * data.bg.height,
        width: 0.54 * data.bg.width,
        x: 0.66 * data.bg.width + bg_cut_x,
        y: 0.24 * data.bg.height
    }
    data.small_decoration = {
        height: 0.34 * data.bg.height,
        width: 0.16 * data.bg.width,
        x: 0.8 * data.bg.width + bg_cut_x,
        y: 0.70 * data.bg.height
    }
    data.humer = {
        height: 0.19 * data.bg.height,
        width: 0.07 * data.bg.width,
        x: 0.78 * data.bg.width + bg_cut_x,
        y: 0.41 * data.bg.height
    }
    data.menu_container = {
        x: 0.6 * data.bg.width + bg_cut_x,
        y: 0.02 * data.bg.height
    }
    const circle_d = 0.075 * data.bg.width
    data.select_blue = {
        height: circle_d,
        width: circle_d
    }
    data.select_red = {
        height: circle_d,
        width: circle_d,
        x: circle_d + 5
    }
    data.select_green = {
        height: circle_d,
        width: circle_d,
        x: circle_d * 2 + 5 * 2
    }
    data.select_blue_img = {
        height: 0.05 * data.bg.width,
        width: 0.05 * data.bg.width,
        x: circle_d / 2,
        y: circle_d / 2
    }
    data.select_red_img = {
        height: 0.05 * data.bg.width,
        width: 0.05 * data.bg.width,
        x: circle_d * 1.5 + 5,
        y: circle_d / 2
    }
    data.select_green_img = {
        height: 0.05 * data.bg.width,
        width: 0.05 * data.bg.width,
        x: circle_d * 2.5 + 5 * 2,
        y: circle_d / 2
    }
    data.ok = {
        height: 0.05 * data.bg.width,
        width: 0.09 * data.bg.width,
        y: circle_d - 5 * 3
    }
    data.carpet_blue = {
        height: 0.63 * data.bg.height,
        width: 0.3 * data.bg.width,
        x: 0.72 * data.bg.width + bg_cut_x,
        y: 0.24 * data.bg.height
    }
    data.carpet_red = {
        height: 0.67 * data.bg.height,
        width: 0.35 * data.bg.width,
        x: 0.685 * data.bg.width + bg_cut_x,
        y: 0.24 * data.bg.height
    }
    data.carpet_green = {
        height: 0.63 * data.bg.height,
        width: 0.3 * data.bg.width,
        x: 0.715 * data.bg.width + bg_cut_x,
        y: 0.24 * data.bg.height
    }

    if (scene.select === 'blue') {
        data.ok.x = circle_d / 2
    } else if (scene.select === 'red') {
        data.ok.x = circle_d * 1.5 + 5
    } else if (scene.select === 'green') {
        data.ok.x = circle_d * 2.5 + 5 * 2
    }

    for (let mutate in data_mutate) {
        for (let key in data_mutate[mutate]) {
            if (key === 'y') {
                data[mutate][key] = data_mutate[mutate][key] * data.bg.height
            }
        }
    }

    return data
}

const initialState = {
    data: get_data({}, {
        humer_visible: false,
        menu_visible: false,
        select: null
    }),
    data_mutate: {},
    game_state: 'loading',
    app: null,
    scene: {
        humer_visible: false,
        menu_visible: false,
        select: null
    }
}

const global = (state = initialState, action) => {
    switch (action.type) {
        case START_GAME:
            return {
                ...state,
                game_state: 'play',
                app: action.data.app,
                sheet: action.data.sheet
            }
        case RESIZE:
            return {
                ...state,
                data: get_data(state.data_mutate, state.scene)
            }
        case MUTATE_DATA:
            let size_mutate_acc = { ...state.data_mutate }
            size_mutate_acc[action.data.key] = size_mutate_acc[action.data.key] ? { ...size_mutate_acc[action.data.key], ...action.data.mutate } : action.data.mutate

            return {
                ...state,
                data_mutate: size_mutate_acc
            }
        case CHANGE_GAME_STATE:
            if (action.data.new_state === 'end_screen') {
                return {
                    ...state,
                    game_state: action.data.new_state,
                    data: get_data(state.data_mutate, {
                        ...state.scene,
                        menu_visible: false
                    }),
                    scene: {
                        ...state.scene,
                        menu_visible: false
                    }
                }
            } else return {
                ...state,
                game_state: action.data.new_state,
            }
        case SHOW_HUMER:
            return {
                ...state,
                scene: {
                    ...state.scene,
                    humer_visible: true
                }
            }
        case SHOW_MENU:
            return {
                ...state,
                scene: {
                    ...state.scene,
                    humer_visible: false,
                    menu_visible: true
                }
            }
        case SELECT:
            const acc_mutate = { ...state.data_mutate }
            delete acc_mutate.carpet_blue
            delete acc_mutate.carpet_red
            delete acc_mutate.carpet_green
            return {
                ...state,
                scene: {
                    ...state.scene,
                    select: action.data.value
                },
                data_mutate: acc_mutate,
                data: get_data(acc_mutate, {
                    ...state.scene,
                    select: action.data.value
                })
            }
        default:
            return state
    }
}

export default global