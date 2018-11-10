import React from 'react';
import PropTypes from 'prop-types';
import randomColor from 'randomcolor';
import { Link } from 'react-router-dom';

import './style.css';

const stringToRandomInt = (member) => {
    let result = ([].concat(member.initials)).reduce((accu, i) => accu * i.charCodeAt(), 1);
    result *= ([].concat(member._id)).reduce((accu, i) => accu * i.charCodeAt(), 1);
    return result % 200;
};

const MemberPill = props => (
    <span className="memberPill">
        <Link
            className="memberLink"
            to={`/members/${props.member._id}`}
            style={{
                padding: '0 2px',
                backgroundColor: randomColor({
                    luminosity: 'bright',
                    seed: stringToRandomInt(props.member),
                }),
            }}
            onClick={event => event.stopPropagation()}
        >
            {props.member.initials}
        </Link>
    </span>
);

MemberPill.propTypes = {
    member: PropTypes.object.isRequired,
};

export default MemberPill;
