import * as PIXI from 'pixi.js'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Stage, Sprite, Container } from '@inlet/react-pixi'

import Interface from 'components/interface'
import PixiHooks from 'services/controllers/pixi_hooks'
import media_data from 'configs/media_data.json'
import { CanvasBlock } from 'styles/global'
import { start_game, resize, change_game_state, show_humer, mutate_data, show_menu, select } from 'redux/actions/global'
import { get_all_childrens } from 'helpers/stage'

PIXI.utils.skipHello()
PIXI.settings.RESOLUTION = window.devicePixelRatio || 1

const Game = () => {
  const dispatch = useDispatch()
  const game_state = useSelector(({ global }) => global.game_state)
  const scene = useSelector(({ global }) => global.scene)
  const app = useSelector(({ global }) => global.app)
  const data = useSelector(({ global }) => global.data)

  useEffect(() => {
    if (app !== null) {
      const resize_listener = () => {
        dispatch(resize())
        for (let sprite of get_all_childrens([], app.stage)) {
          if (sprite?.move_y?.list?.length > 0) {
            sprite.y = sprite.move_y.list[sprite.move_y.list.length - 1] * data.window.height
            sprite.vy = 0
            dispatch(mutate_data({
              y: sprite.move_y.list[sprite.move_y.list.length - 1]
            }, sprite.mutate_key))
            sprite.move_y.list = []
            sprite.move_y.speed = []
          }
        }
      }
      window.addEventListener('resize', resize_listener)
      return () => window.removeEventListener('resize', resize_listener)
    }
  }, [app])

  useEffect(() => {
    if (scene.menu_visible) {
      const childrens = get_all_childrens([], app.stage)
      childrens.filter(sprite => sprite.mutate_key === 'menu_container')[0].alpha = 0
      childrens.filter(sprite => sprite.mutate_key === 'menu_container')[0].animte_alpha = {
        list: [1],
        speed: [0.1]
      }
    }
  }, [scene.menu_visible])

  useEffect(() => {
    if (scene.select !== null) {
      const childrens = get_all_childrens([], app.stage)
      let carpet_green = childrens.filter(sprite => sprite.mutate_key === `carpet_${scene.select}`)[0]
      carpet_green.alpha = 0
      carpet_green.animte_alpha = {
        list: [1],
        speed: [0.05]
      }
      carpet_green.move_y = {
        list: [0.27],
        speed: [1.5]
      }
    }
  }, [scene.select])

  return (
    <CanvasBlock>
      <Stage
        width={data.window.width}
        height={data.window.height}
        onMount={(app) => {
          dispatch(start_game(app))
          setTimeout(() => {
            dispatch(show_humer())
            app.stage.children.filter(sprite => sprite.mutate_key === 'humer')[0].move_y = {
              list: [0.48, 0.46],
              speed: [6, 4]
            }
          }, 1500)
        }}
        options={{
          backgroundColor: 0xFFFFFF
        }}>
        <Sprite
          image={media_data.bg}
          height={data.bg.height}
          width={data.bg.width}
          x={data.bg.x}
          y={data.bg.y}
          anchor={[0.5, 0.5]}
        />
        <Sprite
          image={media_data.austin}
          height={data.austin.height}
          width={data.austin.width}
          x={data.austin.x}
          y={data.austin.y}
        />
        <Sprite
          image={media_data.big_decoration}
          height={data.big_decoration.height}
          width={data.big_decoration.width}
          x={data.big_decoration.x}
        />
        <Sprite
          image={media_data.stair_old}
          height={data.stair_old.height}
          width={data.stair_old.width}
          x={data.stair_old.x}
          y={data.stair_old.y}
        />
        <Sprite
          image={media_data.carpet_blue}
          height={data.carpet_blue.height}
          width={data.carpet_blue.width}
          x={data.carpet_blue.x}
          y={data.carpet_blue.y}
          visible={scene.select === 'blue'}
          mutate_key='carpet_blue'
        />
        <Sprite
          image={media_data.carpet_red}
          height={data.carpet_red.height}
          width={data.carpet_red.width}
          x={data.carpet_red.x}
          y={data.carpet_red.y}
          visible={scene.select === 'red'}
          mutate_key='carpet_red'
        />
        <Sprite
          image={media_data.carpet_green}
          height={data.carpet_green.height}
          width={data.carpet_green.width}
          x={data.carpet_green.x}
          y={data.carpet_green.y}
          visible={scene.select === 'green'}
          mutate_key='carpet_green'
        />
        <Sprite
          image={media_data.small_decoration}
          height={data.small_decoration.height}
          width={data.small_decoration.width}
          x={data.small_decoration.x}
          y={data.small_decoration.y}
        />
        <Sprite
          image={media_data.humer}
          height={data.humer.height}
          width={data.humer.width}
          x={data.humer.x}
          y={data.humer.y}
          visible={scene.humer_visible}
          interactive
          mutate_key='humer'
          pointerdown={() => dispatch(show_menu())}
          cursor='pointer'
        />
        <Container
          mutate_key='menu_container'
          x={data.menu_container.x}
          y={data.menu_container.y}
          visible={scene.menu_visible}>
          <Container
            interactive
            cursor='pointer'
            pointerdown={() => dispatch(select('blue'))}>
            <Sprite
              image={media_data.circle}
              height={data.select_blue.height}
              width={data.select_blue.width}
            />
            <Sprite
              image={media_data.circle_filled}
              height={data.select_blue.height}
              width={data.select_blue.width}
              visible={scene.select === 'blue'}
            />
            <Sprite
              image={media_data.select_blue}
              height={data.select_blue_img.height}
              width={data.select_blue_img.width}
              x={data.select_blue_img.x}
              y={data.select_blue_img.y}
              anchor={[0.5, 0.5]}
            />
          </Container>
          <Container
            interactive
            cursor='pointer'
            pointerdown={() => dispatch(select('red'))}>
            <Sprite
              image={media_data.circle}
              height={data.select_red.height}
              width={data.select_red.width}
              x={data.select_red.x}
            />
            <Sprite
              image={media_data.circle_filled}
              height={data.select_red.height}
              width={data.select_red.width}
              x={data.select_red.x}
              visible={scene.select === 'red'}
            />
            <Sprite
              image={media_data.select_red}
              height={data.select_red_img.height}
              width={data.select_red_img.width}
              x={data.select_red_img.x}
              y={data.select_red_img.y}
              anchor={[0.5, 0.5]}
            />
          </Container>
          <Container
            interactive
            cursor='pointer'
            pointerdown={() => dispatch(select('green'))}>
            <Sprite
              image={media_data.circle}
              height={data.select_green.height}
              width={data.select_green.width}
              x={data.select_green.x}
            />
            <Sprite
              image={media_data.circle_filled}
              height={data.select_green.height}
              width={data.select_green.width}
              x={data.select_green.x}
              visible={scene.select === 'green'}
            />
            <Sprite
              image={media_data.select_green}
              height={data.select_green_img.height}
              width={data.select_green_img.width}
              x={data.select_green_img.x}
              y={data.select_green_img.y}
              anchor={[0.5, 0.5]}
            />
          </Container>
          <Sprite
            image={media_data.ok}
            height={data.ok.height}
            width={data.ok.width}
            x={data.ok.x}
            y={data.ok.y}
            anchor={[0.5, 0]}
            visible={scene.select !== null}
            interactive
            cursor='pointer'
            pointerdown={() => dispatch(change_game_state('end_screen'))}
          />
        </Container>
        <PixiHooks game_state={game_state} app={app} dispatch={dispatch} data={data} />
      </Stage>
      <Interface />
    </CanvasBlock>)
}

export default Game