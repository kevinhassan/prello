import React from 'react';

import './linkStyle.css';

const MdLink = props => (
    <a className="aMD" target="_blank" {...props} onClick={e => e.stopPropagation()} onKeyDown={e => e.stopPropagation()}>
        { props.children }
    </a>
);

export default MdLink;
