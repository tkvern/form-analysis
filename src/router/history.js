import { basename } from 'config'
import { createBrowserHistory as createHistory } from 'history'

const history = createHistory({ basename })

export default history