
            <PrivateRoute authed={isAuthenticated()} exact path="/boards/:boardId" component={BoardComp} />
            <PrivateRoute authed={isAuthenticated()} exact path="/boards" component={BoardsComp} />
            <PrivateRoute authed={isAuthenticated()} exact path="/profile" component={ProfileComp} />
        </main>
    </div>
);

export default App;

            <PrivateRoute authed={isAuthenticated()} exact path="/boards/:boardId" component={BoardComp} />
            <PrivateRoute authed={isAuthenticated()} exact path="/boards" component={BoardsComp} />
            <PrivateRoute authed={isAuthenticated()} exact path="/profile" component={ProfileComp} />
        </main>
    </div>
);

export default App;

            <PrivateRoute authed={isAuthenticated()} exact path="/boards/:boardId" component={BoardComp} />
            <PrivateRoute authed={isAuthenticated()} exact path="/boards" component={BoardsComp} />
            <PrivateRoute authed={isAuthenticated()} exact path="/profile" component={ProfileComp} />
        </main>
    </div>
);

export default App;

            <Switch>
                <Route exact path="/" component={HomeComp} />
                <Route exact path="/graphical-charter" component={GraphicalCharter} />
                <Route exact path="/register" component={RegisterComp} />
                <Route exact path="/signin" component={SignInComp} />
            <Route exact path="/members/:memberId" component={MemberComp} />
            <PrivateRoute authed={isAuthenticated()} exact path="/boards/:boardId" component={BoardComp} />
            <PrivateRoute authed={isAuthenticated()} exact path="/boards" component={BoardsComp} />
            <PrivateRoute authed={isAuthenticated()} exact path="/profile" component={ProfileComp} />
                <PrivateRoute authed={isAuthenticated()} exact path="/boards/:boardId" component={BoardComp} />
                <PrivateRoute authed={isAuthenticated()} exact path="/boards" component={BoardsComp} />
                <PrivateRoute authed={isAuthenticated()} exact path="/profile" component={ProfileComp} />

                <Route component={Page404} />
            </Switch>
        </main>
    </div>
);

export default App;
