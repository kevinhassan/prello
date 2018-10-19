import { TodoActions } from "app/actions/todos";
import * as React from "react";
import { TodoTextInput } from "../TodoTextInput";

export namespace Header {
  export interface Props {
    addTodo: typeof TodoActions.addTodo;
  }
}

export class Header extends React.Component<Header.Props> {
  constructor(props: Header.Props, context?: any) {
    super(props, context);
    this.handleSave = this.handleSave.bind(this);
  }

  public handleSave(text: string) {
    if (text.length) {
      this.props.addTodo({ text });
    }
  }

  public render() {
    return (
      <header>
        <h1>Prello</h1>
        <TodoTextInput newTodo onSave={this.handleSave} placeholder="What needs to be done?" />
      </header>
    );
  }
}
