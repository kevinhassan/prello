import { CardModel } from "app/models";
import { CardActions } from "app/actions";
import * as React from "react";
import * as style from "./style.css";

export namespace CardItem {
    export interface Props {
        card: CardModel;
        deleteCard: typeof CardActions.deleteCard;
    }
}

export class CardItem extends React.Component<CardItem.Props> {
    constructor(props: CardItem.Props, context?: any) {
        super(props, context);
    }


    public render() {
        const { card, deleteCard } = this.props;
        let element = (
            <div>
                <div className={style.cardInfo}>
                    <p>{card.id} - {card.description} - {card.dueDate.toLocaleDateString()}</p>
                    <button
                        className={style.delete}
                        onClick={() => {
                            if (card.id) { deleteCard(card.id); }
                        }}
                    />
                </div>
            </div>
        );

        return <li>{element}</li>;
    }
}
