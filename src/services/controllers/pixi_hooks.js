import { useTick } from '@inlet/react-pixi'

import { mutate_data } from 'redux/actions/global'
import { get_all_childrens } from 'helpers/stage'

const PixiHooks = ({ game_state, app, dispatch, data }) => {
    useTick(d => {
        if (app) {
            if (game_state === 'play') {
                for (let sprite of get_all_childrens([], app.stage)) {
                    if (sprite.vy) sprite.y = sprite.y + sprite.vy * d
                    if (sprite.move_y?.list.length > 0) {
                        let vy = sprite.move_y.list[0] * data.window.height < sprite.y ? -sprite.move_y.speed[0] : sprite.move_y.speed[0]
                        sprite.vy = vy
                        if ((sprite.y + vy > sprite.move_y.list[0] * data.window.height && sprite.vy > 0) || (sprite.y + vy < sprite.move_y.list[0] * data.window.height && sprite.vy < 0)) {
                            sprite.y = sprite.y + sprite.move_y.list[0] * data.window.height - sprite.y
                            sprite.vy = 0
                            dispatch(mutate_data({
                                y: sprite.move_y.list[0]
                            }, sprite.mutate_key))
                            sprite.move_y.list.shift()
                            sprite.move_y.speed.shift()
                        }
                    }

                    if (sprite.animte_alpha?.list.length > 0) {
                        let new_alpha = sprite.animte_alpha.list[0] > sprite.alpha ? sprite.alpha + sprite.animte_alpha.speed[0] : sprite.alpha - sprite.animte_alpha.speed[0]
                        if ((new_alpha >= sprite.animte_alpha.list[0] && new_alpha > sprite.alpha) || (new_alpha <= sprite.animte_alpha.list[0] && new_alpha < sprite.alpha)) {
                            new_alpha = sprite.animte_alpha.list[0]
                            sprite.animte_alpha.list.shift()
                            sprite.animte_alpha.speed.shift()
                        }
                        sprite.alpha = new_alpha
                    }
                }
            }
        }


    })
    return null
}

export default PixiHooks