import React from 'react'
import { bindActionCreators } from 'redux'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import Dragula from 'react-dragula';

import { deleteCard, deleteCardWithDelay, createCard } from '../../actions/cards'
import './style.css'
import spinner from '../../assets/spinner.gif'

class Cards extends React.Component {
    constructor(props) {
        super(props);
        this.handleDeleteCard = this.handleDeleteCard.bind(this);
        this.handleDeleteCardWithDelay = this.handleDeleteCardWithDelay.bind(this);
    }

    dragulaDecorator = (componentBackingInstance) => {
        if (componentBackingInstance) {
            let options = { direction: 'horizontal' };
            Dragula([componentBackingInstance], options);
        }
    };

    handleDeleteCard(id) {
        this.props.deleteCard(id)
    }


    handleDeleteCardWithDelay(id) {
        this.props.deleteCardWithDelay(id)
    }

    handleCreateCard() {
        this.props.createCard()
    }

    render() {
        return (
            <div className="col-sm-12 cardsPanel">
                <h1>My cards</h1>
                <p>Number of cards: <span style={{ fontSize: "20px", fontWeight: "bold" }}>{this.props.cards.length}</span></p>

                {this.props.error !== "" ? <p className="errorMsg">{this.props.error}</p> : ""}
                <p>
                    <button className="btn btn-danger" onClick={() => this.handleDeleteCard(42)}>
                        Try to delete card with id = 42.
                    </button>
                    <button className="btn btn-success" onClick={() => this.handleCreateCard()}>
                        Create new card
                    </button>
                </p>
                <ul className="cardsList" ref={this.dragulaDecorator}>
                    {this.props.cards.map(x =>
                        <li className="card" key={x.id}>
                            <div className="cardContent">
                                <h3>{x.id}</h3>
                                <p>{x.description}</p>
                                <p>
                                    <button className="btn btn-danger" onClick={() => this.handleDeleteCard(x.id)}>
                                        <i class="fas fa-trash-alt"></i>
                                    </button>
                                    <button style={{ marginLeft: "5px" }} className="btn btn-danger" onClick={() => this.handleDeleteCardWithDelay(x.id)}>
                                        <i class="fas fa-trash-alt"></i> with delay
                                    </button>
                                </p>
                            </div>
                        </li>
                    )}
                </ul>

                {this.props.isLoading ? <p><img src={spinner} alt="Loading spinner" width={100} />Loading...</p> : ""}

                <button className="btn btn-link" onClick={() => this.props.changePage()}>
                    Go to about page via redux
                </button>
            </div>
        )
    }
}

// Put info from the store state in props
const mapStateToProps = ({ cards }) => ({
    cards: cards.cards,
    isLoading: cards.isLoading,
    error: cards.error
})

// Put actions in props
const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            createCard,
            deleteCard,
            deleteCardWithDelay,
            changePage: () => push('/about-us')
        },
        dispatch
    )

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Cards)
