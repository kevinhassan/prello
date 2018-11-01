import React from 'react';

import './linkStyle.css';

const MdLink = props => (
    <a className="aMD" {...props} onClick={e => e.stopPropagation()} onKeyDown={e => e.stopPropagation()}>
        { props.children }
    </a>
);

export default MdLink;
