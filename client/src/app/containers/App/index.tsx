import { TodoActions, CardActions } from "app/actions";
import { Footer, Header, TodoList, CardList } from "app/components";
import { TodoModel } from "app/models";
import { RootState } from "app/reducers";
import { omit } from "app/utils";
import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { bindActionCreators, Dispatch } from "redux";
import * as style from "./style.css";

const FILTER_VALUES = (Object.keys(TodoModel.Filter) as Array<keyof typeof TodoModel.Filter>).map(
    (key) => TodoModel.Filter[key],
);

const FILTER_FUNCTIONS: Record<TodoModel.Filter, (todo: TodoModel) => boolean> = {
    [TodoModel.Filter.SHOW_ALL]: () => true,
    [TodoModel.Filter.SHOW_ACTIVE]: (todo) => !todo.completed,
    [TodoModel.Filter.SHOW_COMPLETED]: (todo) => todo.completed,
};

export namespace App {
    export interface Props extends RouteComponentProps<void> {
        cards: RootState.CardState;
        todos: RootState.TodoState;
        cardActions: CardActions;
        todoActions: TodoActions;
        filter: TodoModel.Filter;
    }
}

// @ts-ignore
@connect(
    (state: RootState): Pick<App.Props, "todos" | "filter" | "cards"> => {
        const hash = state.router.location && state.router.location.hash.replace("#", "");
        const filter = FILTER_VALUES.find((value) => value === hash) || TodoModel.Filter.SHOW_ALL;
        return { todos: state.todos, cards: state.cards, filter };
    },
    (dispatch: Dispatch): Pick<App.Props, "todoActions" |  "cardActions"> => ({
        todoActions: bindActionCreators(omit(TodoActions, "Type"), dispatch),
        cardActions: bindActionCreators(omit(CardActions, "Type"), dispatch),
    }),
)

export class App extends React.Component<App.Props> {
    public static defaultProps: Partial<App.Props> = {
        filter: TodoModel.Filter.SHOW_ALL,
    };

    constructor(props: App.Props, context?: any) {
        super(props, context);
        this.handleClearCompleted = this.handleClearCompleted.bind(this);
        this.handleFilterChange = this.handleFilterChange.bind(this);
    }

    public handleClearCompleted(): void {
        const hasCompletedTodo = this.props.todos.some((todo) => todo.completed || false);
        if (hasCompletedTodo) {
            this.props.todoActions.clearCompleted();
        }
    }

    public handleFilterChange(filter: TodoModel.Filter): void {
        this.props.history.push(`#${filter}`);
    }

    public render() {
        const { todos, todoActions, filter, cards, cardActions } = this.props;
        const activeCount = todos.length - todos.filter((todo) => todo.completed).length;
        const filteredTodos = filter ? todos.filter(FILTER_FUNCTIONS[filter]) : todos;
        const completedCount = todos.reduce((count, todo) => (todo.completed ? count + 1 : count), 0);

        return (
            <div>
                <div className={style.normal}>
                    <Header addTodo={todoActions.addTodo} />
                    <TodoList todos={filteredTodos} actions={todoActions} />
                    <Footer
                        filter={filter}
                        activeCount={activeCount}
                        completedCount={completedCount}
                        onClickClearCompleted={this.handleClearCompleted}
                        onClickFilter={this.handleFilterChange}
                    />
                </div>
                <div className={style.cards}>
                    <CardList cards={cards} actions={cardActions} />
                </div>
            </div>
        );
    }
}
