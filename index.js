import * as React from "react";

const createElementNext = React.createElement;
Object(React).createElement = (type, p, ...c) => {
    const children = [...c];
    let props = {...p};
    let result;

    if (props && props['tune']) {
        const {tune, ...rest} = props;
        if (typeof type === 'string') props = rest;
        const tuneIt = tune['it'];
        if (tuneIt) {
            const tuneName = tune['name'];
            if (typeof tuneIt === 'function') {
                result = tuneIt(tuneName, props, children);
            } else {
                result = tuneIt['tune'] && tuneIt['tune'](tuneName, props, children);
                const propsTune = tuneIt['props'] && tuneIt['props']['tune'];
                const elem = propsTune && propsTune['use'] && propsTune['use'](tuneName, props, children);
                if (elem !== undefined) result = elem;
            }
        }
    }

    return (result !== undefined) ? result : createElementNext(type, props, ...children);
};

export const Component = React.Component;
export const PureComponent = React.PureComponent;