import React from 'react';
import PropTypes from 'prop-types';

// ===== Others
import './style.css';

// ==================================

// Source: https://stackoverflow.com/a/3943023
// Following the W3C recommendation: https://www.w3.org/TR/WCAG20/#relativeluminancedef
const determineTextColorFromBackground = (backgroundColor) => {
    // Cast hexa to rgb value %
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(backgroundColor);
    const colors = result ? [
        parseInt(result[1], 16) / 255,
        parseInt(result[2], 16) / 255,
        parseInt(result[3], 16) / 255,
    ] : null;

    // Cast colors to Luminosity
    const lum = [];
    /* eslint-disable no-param-reassign */
    colors.forEach((c) => {
        if (c <= 0.03928) {
            lum.push(c / 12.92);
        } else {
            lum.push(((c + 0.055) / 1.055) ** 2.4);
        }
    });
    /* eslint-enable no-param-reassign */

    const L = 0.2126 * lum[0] + 0.7152 * lum[1] + 0.0722 * lum[2];
    if (L > 0.179) return '#000000';
    return '#ffffff';
};

const LabelPill = props => (
    <div
        className="labelPill"
        style={{
            backgroundColor: props.label.color,
            color: determineTextColorFromBackground(props.label.color),
        }}
    />
);

LabelPill.propTypes = {
    label: PropTypes.object.isRequired,
};
LabelPill.defaultProps = {
};

export default LabelPill;
