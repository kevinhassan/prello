import { App as PrelloApp } from "app/containers/App";
import * as React from "react";
import { hot } from "react-hot-loader";
import { Route, Switch } from "react-router";

export const App = hot(module)(() => (
    <Switch>
        <Route path="/" component={PrelloApp} />
    </Switch>
));
