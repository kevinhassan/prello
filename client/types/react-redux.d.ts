import { Component } from "react";
import "react-redux";

declare module "react-redux" {
  // Add removed inferrable type to support connect as decorator
  // https://github.com/DefinitelyTyped/DefinitelyTyped/pull/16652
    export type InferableComponentDecorator<TOwnProps> = <T extends Component<TOwnProps>>(component: T) => T;

  // overload connect interface to return built-in ClassDecorator
  // https://github.com/reactjs/react-redux/pull/541#issuecomment-269197189
}
