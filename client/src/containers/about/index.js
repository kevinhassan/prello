import React from 'react'
import spinner from '../../assets/spinner.gif'

const About = () => (
    <div className="col-sm-12" style={{ padding: "0 30px" }}>
        <h1>All elements used in Prello</h1>
        <hr />
        <div className="row">
            <div className="col-sm-12">
                <button type="button" className="btn btn-primary">Primary</button><span> </span>
                <button type="button" className="btn btn-secondary">Secondary</button><span> </span>
                <button type="button" className="btn btn-success">Success</button><span> </span>
                <button type="button" className="btn btn-danger">Danger</button><span> </span>
                <button type="button" className="btn btn-warning">Warning</button><span> </span>
                <button type="button" className="btn btn-info">Info</button><span> </span>
                <button type="button" className="btn btn-light">Light</button><span> </span>
                <button type="button" className="btn btn-dark">Dark</button><span> </span>
            </div>
        </div>

        <hr />

        <div className="row">
            <div className="col-sm-4"><h1>H1 title</h1></div>
            <div className="col-sm-4"><h2>H2 title</h2></div>
            <div className="col-sm-4"><h3>H1 title</h3></div>
        </div>
        <div className="row">
            <div className="col-sm-4"><a href="#">This is a link</a></div>
            <div className="col-sm-4"><a href="#">This is a link</a></div>
            <div className="col-sm-4"><a href="#">This is a link</a></div>
        </div>

        <hr />

        <div className="row">
            <div className="col-sm-6">
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Dropdown button
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a className="dropdown-item" href="#">Action</a>
                        <a className="dropdown-item" href="#">Another action</a>
                        <a className="dropdown-item" href="#">Something else here</a>
                    </div>
                </div>
            </div>
            <div className="col-sm-6">
                <p>Loading spinner: <img src={spinner} alt="Loading spinner" width="100"/></p>
            </div>
        </div>

        <hr />

        <div className="row">
            <div className="col-sm-4"><div className="alert alert-primary" role="alert">This is a primary alert—check it out!</div></div>
            <div className="col-sm-4"><div className="alert alert-secondary" role="alert">This is a secondary alert—check it out!</div></div>
            <div className="col-sm-4"><div className="alert alert-success" role="alert">This is a success alert—check it out!</div></div>
            <div className="col-sm-4"><div className="alert alert-danger" role="alert">This is a danger alert—check it out!</div></div>
            <div className="col-sm-4"><div className="alert alert-warning" role="alert">This is a warning alert—check it out!</div></div>
            <div className="col-sm-4"><div className="alert alert-info" role="alert">This is a info alert—check it out!</div></div>
            <div className="col-sm-6"><div className="alert alert-light" role="alert">This is a light alert—check it out!</div></div>
            <div className="col-sm-6"><div className="alert alert-dark" role="alert">This is a dark alert—check it out!</div></div>
        </div>

        <hr />

        <div className="row">
            <div className="col-sm-6">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Praesent rhoncus, libero eget interdum porta, diam dolor blandit nunc,
                    quis porttitor dui nisl ut sem. Morbi nibh lorem, elementum ut tempus quis,
                    elementum non sapien. Sed non lacus augue. Nullam luctus risus felis,
                    sed scelerisque ipsum facilisis et. In ut nibh sit amet dui ornare finibus.
                    Maecenas euismod pellentesque sapien et convallis.
                    Aenean malesuada magna vitae erat tempor, ac venenatis dolor porttitor.
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Praesent rhoncus, libero eget interdum porta, diam dolor blandit nunc,
                    quis porttitor dui nisl ut sem. Morbi nibh lorem, elementum ut tempus quis,
                    elementum non sapien. Sed non lacus augue. Nullam luctus risus felis,
                    sed scelerisque ipsum facilisis et. In ut nibh sit amet dui ornare finibus.
                    Maecenas euismod pellentesque sapien et convallis.
                    Aenean malesuada magna vitae erat tempor, ac venenatis dolor porttitor.
                </p>
            </div>

            <div className="col-sm-6">
                <h2>A Form</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleSelect1">Example select</label>
                        <select className="form-control" id="exampleSelect1">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleSelect2">Example multiple select</label>
                        <select multiple className="form-control" id="exampleSelect2">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleTextarea">Example textarea</label>
                        <textarea className="form-control" id="exampleTextarea" rows="3"></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputFile">File input</label>
                        <input type="file" className="form-control-file" id="exampleInputFile" aria-describedby="fileHelp" />
                        <small id="fileHelp" className="form-text text-muted">This is some placeholder block-level help text for the above input. It's a bit lighter and easily wraps to a new line.</small>
                    </div>
                    <fieldset className="form-group">
                        <legend>Radio buttons</legend>
                        <div className="form-check">
                            <label className="form-check-label">
                                <input type="radio" className="form-check-input" name="optionsRadios" id="optionsRadios1" value="option1" defaultChecked />
                                Option one is this and that&mdash;be sure to include why it's great
                        </label>
                        </div>
                        <div className="form-check">
                            <label className="form-check-label">
                                <input type="radio" className="form-check-input" name="optionsRadios" id="optionsRadios2" value="option2" />
                                Option two can be something else and selecting it will deselect option one
                        </label>
                        </div>
                        <div className="form-check disabled">
                            <label className="form-check-label">
                                <input type="radio" className="form-check-input" name="optionsRadios" id="optionsRadios3" value="option3" disabled />
                                Option three is disabled
                        </label>
                        </div>
                    </fieldset>
                    <div className="form-check">
                        <label className="form-check-label">
                            <input type="checkbox" className="form-check-input" />
                            Check me out
                        </label>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>

            </div>

        </div >
    </div>
)

export default About
