import { useSelector } from 'react-redux'

import open_config from 'configs/open.json'
import media_data from 'configs/media_data.json'
import { LogoBlock, OpenBlock, Blackout } from 'components/interface/style'

const Interface = () => {
    const game_state = useSelector(({ global }) => global.game_state)

    // some specific sdk for webview of specific ad spaces
    const open = () => {
        if (/iPhone/gm.test(navigator.userAgent) || /iPad/gm.test(navigator.userAgent) || /Macintosh/gm.test(navigator.userAgent)) {
            window.open(open_config.ios)
        } else if (/Windows NT/gm.test(navigator.userAgent)) {
            window.open(open_config.windows)
        } else {
            window.open(open_config.android)
        }
    }

    if (game_state !== 'loading') {
        return (
            <>
                {game_state === 'end_screen' && <Blackout>
                    <img src={media_data.final} alt='' />
                </Blackout>}
                <LogoBlock>
                    <img src={media_data.logo} alt='' />
                </LogoBlock>
                <OpenBlock>
                    <img src={media_data.open} onClick={open} alt='' />
                </OpenBlock>
            </>
        )
    } else return null
}

export default Interface