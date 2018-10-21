import React from 'react'
import { bindActionCreators } from 'redux'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'

import { deleteCard, deleteCardWithDelay } from '../../actions/cards'
import './style.css'
import spinner from '../../assets/spinner.gif'

class Cards extends React.Component {
    constructor(props) {
        super(props);
        this.handleDeleteCard = this.handleDeleteCard.bind(this);
        this.handleDeleteCardWithDelay = this.handleDeleteCardWithDelay.bind(this);
    }

    handleDeleteCard(id) {
        this.props.deleteCard(id)
    }

    handleDeleteCardWithDelay(id) {
        this.props.deleteCardWithDelay(id)
    }

    render() {
        return (
            <div>
                <h1>My cards</h1>
                <p>Number of cards: <span style={{fontSize: "20px", fontWeight: "bold"}}>{this.props.cards.length}</span></p>

                <ul style={{display: "flex"}}>
                    {this.props.cards.map(x =>
                        <li className="card" key={x.id}>
                            <h3>{x.id}</h3>
                            <p>{x.description}</p>
                            <button className="btn-delete" onClick={() => this.handleDeleteCard(x.id)}>DELETE</button>
                            <button className="btn-delete" onClick={() => this.handleDeleteCardWithDelay(x.id)}>DELETE with delay</button>
                        </li>
                    )}
                </ul>

                {this.props.isLoading ? <p><img src={spinner} alt="Loading spinner" width={100}/>Loading...</p> : ""}

                <button onClick={() => this.props.changePage()}>
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
