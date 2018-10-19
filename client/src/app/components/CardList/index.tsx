import { CardActions } from "app/actions/cards";
import { CardModel } from "app/models/CardModel";
import { CardItem } from "app/components/CardItem";
import * as React from "react";

export namespace CardList {
    export interface Props {
        cards: CardModel[];
        actions: CardActions;
    }
}

export class CardList extends React.Component<CardList.Props> {

    public render() {
        const { actions, cards } = this.props;
        return (
            <section>
                <h2>Cards</h2>
                <ul>
                    {cards.map((card) => (
                        <CardItem
                            key={card.id}
                            card={card}
                            deleteCard={actions.deleteCard}
                        />
                    ))}
                </ul>
            </section>
        );
    }
}
