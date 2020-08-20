import * as React from "react";

declare namespace ReactTune {
    type ReactNode = React.ReactNode | void;

    interface Params<P> {
        name?: string;
        use: React.Component | ((name: string, props: any, children: React.ReactNode[]) => ReactTune.ReactNode);
    }

    class Component<P = {}, S = {}> extends React.Component<P & {tune?: Params<P>}, S> {
        tune(name: string, props: any, children: React.ReactNode[]): ReactTune.ReactNode;
    }

    class PureComponent<P = {}, S = {}, SS = any> extends React.PureComponent<P & {tune?: Params<P>}, S, SS> {
        tune(name: string, props: any, children: React.ReactNode[]): ReactTune.ReactNode;
    }
}

declare module 'React' {
    interface HTMLAttributes<T> extends React.DOMAttributes<T> {
        tune?: ReactTune.Params<T>;
    }
}

export = ReactTune;
export as namespace ReactTune;