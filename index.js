import * as React from "react";

const createElementNext = React.createElement;
Object(React).createElement = (type, p, ...c) => {
    const children = [...c];
    let props = {...p};
    let result;

    if (props && props['tune']) {
        const {tune, ...rest} = props;
        if (typeof type === 'string') props = rest;
        const tuneUse = tune['use'];
        if (tuneUse) {
            const tuneName = tune['name'];
            if (typeof tuneUse === 'function') {
                result = tuneUse(tuneName, props, children);
            } else {
                result = tuneUse['tune'] && tuneUse['tune'](tuneName, props, children);
                const propsTune = tuneUse['props'] && tuneUse['props']['tune'];
                const elem = propsTune && propsTune['use'] && propsTune['use'](tuneName, props, children);
                if (elem !== undefined) result = elem;
            }
        }
    }

    return (result !== undefined) ? result : createElementNext(type, props, ...children);
};

export const Component = React.Component;
export const PureComponent = React.PureComponent;