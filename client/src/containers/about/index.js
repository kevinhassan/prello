import React from 'react'

const About = () => (
    <div class="col-sm-12" style={{ padding: "0 30px" }}>
        <h1>All elements used in Prello</h1>

        <div class="row">
            <div class="col-sm-12">
                <button type="button" class="btn btn-primary">Primary</button><span> </span>
                <button type="button" class="btn btn-secondary">Secondary</button><span> </span>
                <button type="button" class="btn btn-success">Success</button><span> </span>
                <button type="button" class="btn btn-danger">Danger</button><span> </span>
                <button type="button" class="btn btn-warning">Warning</button><span> </span>
                <button type="button" class="btn btn-info">Info</button><span> </span>
                <button type="button" class="btn btn-light">Light</button><span> </span>
                <button type="button" class="btn btn-dark">Dark</button><span> </span>
                <button type="button" class="btn btn-link">Link</button><span> </span>
            </div>
        </div>

        <hr />

        <div class="row">
            <div className="col-sm-4"><h1>H1 title</h1></div>
            <div className="col-sm-4"><h2>H2 title</h2></div>
            <div className="col-sm-4"><h3>H1 title</h3></div>
        </div>

        <hr />

        <div class="row">
            <div class="col-sm-12">
                <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Dropdown button
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a class="dropdown-item" href="#">Action</a>
                        <a class="dropdown-item" href="#">Another action</a>
                        <a class="dropdown-item" href="#">Something else here</a>
                    </div>
                </div>
            </div>
        </div>

        <hr />

        <div class="row">
            <div class="col-sm-4"><div class="alert alert-primary" role="alert">This is a primary alert—check it out!</div></div>
            <div class="col-sm-4"><div class="alert alert-secondary" role="alert">This is a secondary alert—check it out!</div></div>
            <div class="col-sm-4"><div class="alert alert-success" role="alert">This is a success alert—check it out!</div></div>
            <div class="col-sm-4"><div class="alert alert-danger" role="alert">This is a danger alert—check it out!</div></div>
            <div class="col-sm-4"><div class="alert alert-warning" role="alert">This is a warning alert—check it out!</div></div>
            <div class="col-sm-4"><div class="alert alert-info" role="alert">This is a info alert—check it out!</div></div>
            <div class="col-sm-6"><div class="alert alert-light" role="alert">This is a light alert—check it out!</div></div>
            <div class="col-sm-6"><div class="alert alert-dark" role="alert">This is a dark alert—check it out!</div></div>
        </div>

        <hr />

        <div class="row">
            <div class="col-sm-6">
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

            <div class="col-sm-6">
                <h2>A Form</h2>
                <form>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
                    </div>
                    <div class="form-group">
                        <label for="exampleSelect1">Example select</label>
                        <select class="form-control" id="exampleSelect1">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="exampleSelect2">Example multiple select</label>
                        <select multiple class="form-control" id="exampleSelect2">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="exampleTextarea">Example textarea</label>
                        <textarea class="form-control" id="exampleTextarea" rows="3"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputFile">File input</label>
                        <input type="file" class="form-control-file" id="exampleInputFile" aria-describedby="fileHelp" />
                        <small id="fileHelp" class="form-text text-muted">This is some placeholder block-level help text for the above input. It's a bit lighter and easily wraps to a new line.</small>
                    </div>
                    <fieldset class="form-group">
                        <legend>Radio buttons</legend>
                        <div class="form-check">
                            <label class="form-check-label">
                                <input type="radio" class="form-check-input" name="optionsRadios" id="optionsRadios1" value="option1" checked />
                                Option one is this and that&mdash;be sure to include why it's great
                        </label>
                        </div>
                        <div class="form-check">
                            <label class="form-check-label">
                                <input type="radio" class="form-check-input" name="optionsRadios" id="optionsRadios2" value="option2" />
                                Option two can be something else and selecting it will deselect option one
                        </label>
                        </div>
                        <div class="form-check disabled">
                            <label class="form-check-label">
                                <input type="radio" class="form-check-input" name="optionsRadios" id="optionsRadios3" value="option3" disabled />
                                Option three is disabled
                        </label>
                        </div>
                    </fieldset>
                    <div class="form-check">
                        <label class="form-check-label">
                            <input type="checkbox" class="form-check-input" />
                            Check me out
                        </label>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>

            </div>

        </div >
    </div>
)

export default About
