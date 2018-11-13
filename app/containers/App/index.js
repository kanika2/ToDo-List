/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import toDo from '../toDo/Loadable';
// import selectionPage from '../selectionPage/Loadable';

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={HomePage} />
        {/* <Route path="/selection" component={selectionPage} /> */}
        <Route path = "/toDo" component={toDo} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}

//ignore that for some time. ye aapka issue ni h boilerplate ka issue hai. pr vo todo me toh shi chl rha hai issi me dikat aa rhi hai'
// to aap kuch ni kr sakte iska .. kisi reason se hi aa rhi h is me but still vo boilerplate ka issue hai.. acha
