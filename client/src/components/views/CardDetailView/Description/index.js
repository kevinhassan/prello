import React from 'react';
import PropTypes from 'prop-types';
import Textarea from 'react-textarea-autosize';
import ReactMarkdown from 'react-markdown';

// ===== Markdown Components
import MdHeader from '../../markdown/MdHeader';
import MdLink from '../../markdown/MdLink';
import MdList from '../../markdown/MdList';
import MdListItem from '../../markdown/MdListItem';
import MdParagraph from '../../markdown/MdParagraph';

// ===== Others
import './style.css';

// ==================================

const Description = props => (
    <div>
        <h2 className="cardDetail-h2">
            <i className="fas fa-align-left" />
            {' '}
                    Description
        </h2>

        <div className="cardElementContent">
            {props.isEditingDescription
                ? (
                    <form onSubmit={props.editDescription} className="descriptionForm">
                        <div className="form-group descriptionFormGroup">
                            <Textarea
                                className="form-control descriptionTextArea"
                                id="description"
                                name="description"
                                placeholder=""
                                type="text"
                                defaultValue={props.description}
                            />
                        </div>
                        <button className="btn btn-success" type="submit">Save</button>
                        <button
                            className="btn btn-secondary"
                            type="reset"
                            onClick={() => props.changeIsEditingDescription(false)}
                        >
                            <i className="fas fa-times" />
                        </button>
                    </form>
                )
                : (
                    <div className="descriptionContent">
                        {props.description
                            ? (
                                <div
                                    className="btn clickableDescription"
                                    onClick={() => props.changeIsEditingDescription(true)}
                                    onKeyPress={() => props.changeIsEditingDescription(true)}
                                >
                                    <ReactMarkdown
                                        source={props.description}
                                        className="text-left btnDescription"
                                        renderers={{
                                            heading: mdProps => (
                                                <MdHeader {...mdProps} />
                                            ),
                                            link: mdProps => (
                                                <MdLink {...mdProps} />
                                            ),
                                            list: mdProps => (
                                                <MdList {...mdProps} />
                                            ),
                                            listItem: mdProps => (
                                                <MdListItem {...mdProps} />
                                            ),
                                            paragraph: mdProps => (
                                                <MdParagraph {...mdProps} />
                                            ),
                                        }}
                                    />
                                </div>
                            )
                            : (
                                <button
                                    className="btn btn-link btn-addElement"
                                    type="button"
                                    onClick={() => props.changeIsEditingDescription(true)}
                                >
                                        Add a description...
                                </button>
                            )
                        }
                    </div>
                )
            }
        </div>

    </div>
);

Description.propTypes = {
    description: PropTypes.string.isRequired,
    editDescription: PropTypes.func.isRequired,
    isEditingDescription: PropTypes.bool.isRequired,
    changeIsEditingDescription: PropTypes.func.isRequired,
};

export default Description;
