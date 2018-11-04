import React from 'react';

import './listItemStyle.css';

const MdListItem = props => (<li className="liMD" {...props}>{props.children}</li>);

export default MdListItem;
