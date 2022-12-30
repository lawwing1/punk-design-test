/**
 * file: Project Router File
 * date: 2020-07-21
 * author: Frank
 * lastModify: Frank 2020-07-21
 */
import React, { Suspense } from 'react';
import { Route, HashRouter as Router, Switch } from 'react-router-dom';

/* <------------------------------------ **** Lazy Loading all the pages START **** ------------------------------------ */

const HomePage = React.lazy(() => import(/* webpackChunkName: 'homepage' */ '../Pages/HomePage'));
const Test = React.lazy(() => import(/* webpackChunkName: 'homepage' */ '../Pages/Test'));

/* <------------------------------------ **** Lazy Loading all the pages END **** ------------------------------------ */

const RootRouter = (): JSX.Element => {
    return (
        <Suspense
            fallback={
                /* <------------------------------------ **** Loading Animation START **** ------------------------------------ */
                <div></div>
                /* <------------------------------------ **** Loading Animation END **** ------------------------------------ */
            }
        >
            <Router>
                <Switch>
                    <Route path="/" exact component={HomePage} />
                    <Route path="/a" exact component={Test} />
                </Switch>
            </Router>
        </Suspense>
    );
};

export default RootRouter;
