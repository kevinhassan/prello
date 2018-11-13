import React from 'react';

import './headerStyle.css';

const MdHeader = (props) => {
    const TagName = `h${props.level}`;
    return (<TagName className={`h${props.level}MD`} {...props} />);
};

export default MdHeader;
