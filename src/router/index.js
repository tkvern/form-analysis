import React, { useEffect, Fragment } from 'react'
import { Router, Switch, Route, withRouter } from 'react-router-dom'
import history from './history'

import App from '../App'
import NoMatch from '../page/404'
import form from './form'

const routes = [
  {
    path: '/app',
    component: App,
  },
  ...form,
]

function RouteWithSubRoutes(route) {
  return (
    <Route
      exact
      path={route.path}
      render={(props) => {
        return <RenderRoute props={props} route={route} />
      }}
    />
  )
}

function RenderRoute({ props, route, query }) {
  return <route.component {...props} routes={route.routes} query={query} />
}

export function SubRouter({ routes }) {
  return (
    <Switch>
      {routes.map((route, i) => (
        <RouteWithSubRoutes key={i} {...route} />
      ))}
    </Switch>
  )
}
/**
 * 路由跳转时 恢复scroll位置
 *
 * @param {*} { history, children }
 * @returns
 */
function ScrollTo({ history, children }) {
  useEffect(() => {
    const unlisten = history.listen(() => {
      document.body.scrollTop = 0
      window.scrollTo(0, 0)
    })
    return () => unlisten()
  }, [history])
  return <Fragment>{children}</Fragment>
}

const ScrollToTop = withRouter(ScrollTo)
export default function RouterComponent() {
  return (
    <Router history={history}>
      <ScrollToTop>
        <Switch>
          {/* 设置 / 默认页面  */}
          <Route path="/" exact component={App} />
          {routes.map((route, i) => {
            return <RouteWithSubRoutes key={i} {...route} />
          })}
          {/* 设置无匹配时 404页面 */}
          <Route component={NoMatch} />
        </Switch>
      </ScrollToTop>
    </Router>
  )
}
