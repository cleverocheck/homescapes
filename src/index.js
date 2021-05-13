import ReactDOM from 'react-dom'
import Game from 'game'
import { Provider } from 'react-redux'

import store from 'redux/store'
import { GlobalStyle } from 'styles/global'

ReactDOM.render(
  <Provider store={store}>
    <GlobalStyle />
    <Game />
  </Provider>, document.getElementById('root'))
