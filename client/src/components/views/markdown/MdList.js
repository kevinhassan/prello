import React from 'react';

import './listStyle.css';

const MdList = (props) => {
    const TagName = (props.ordered ? 'ol' : 'ul');
    return (<TagName className="uolMd" {...props} />);
};

export default MdList;
