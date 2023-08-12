import { DirectiveMetadata } from "../directives/framework/types";

export function Directive(metadata: DirectiveMetadata) {
    return function (decoratedClass) {
        decoratedClass["selector"] = metadata.selector;
        decoratedClass["providers"] = metadata.providers || [];
        console.log(decoratedClass);
        return decoratedClass;
    }
}