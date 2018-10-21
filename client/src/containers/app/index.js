import React from 'react'
import { Route, Link } from 'react-router-dom'
import About from '../about'
import Cards from '../cards'
import './style.css'

const App = () => (
    <div>
        <header className="row">
            <div className="col-sm-12">
                <Link className="link" to="/">Cards </Link>
                <Link className="link" to="/about-us">About</Link>
            </div>
        </header>

        <main className="row">
            <Route exact path="/" component={Cards} />
            <Route exact path="/about-us" component={About} />
        </main>
    </div>
)

export default App
