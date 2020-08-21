import * as React from "react";

declare namespace ReactTune {
    type ReactNode = React.ReactNode | void;

    interface Attr<P> {
        it: React.Component | ((name: string, props: any, children: React.ReactNode[]) => ReactTune.ReactNode);
        name: string;
    }

    interface Props<P> extends Attr<P> {
        use?(name: string, props: any, children: React.ReactNode[]): ReactTune.ReactNode;
    }

    class Component<P = {}, S = {}> extends React.Component<P & {tune?: Props<P>}, S> {
        tune(name: string, props: any, children: React.ReactNode[]): ReactTune.ReactNode;
    }

    class PureComponent<P = {}, S = {}, SS = any> extends React.PureComponent<P & {tune?: Props<P>}, S, SS> {
        tune(name: string, props: any, children: React.ReactNode[]): ReactTune.ReactNode;
    }
}

declare module 'React' {
    interface HTMLAttributes<T> extends React.DOMAttributes<T> {
        tune?: ReactTune.Attr<T>;
    }
}

export = ReactTune;
export as namespace ReactTune;