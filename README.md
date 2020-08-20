ReactTune
===========

[![Version](http://img.shields.io/npm/v/react-tune.svg)](https://www.npmjs.org/package/classnames)

Allows a parent component to modify his children before render.

Install with [npm](https://www.npmjs.com/):

npm:
```sh
npm install react-tune --save
```

### How to use

```tsx
import * as React from "react";
import * as ReactTune from "react-tune";

class SomeComponent extends ReactTune.Component {
    render(): React.ReactNode {
        return (
            <div tune={{name: 'SomeComponent.main', use: this}}>
                <span tune={{name: 'SomeComponent.span1', use: this}}>SPAN1</span>
                <span tune={{name: 'SomeComponent.span2', use: this}}>SPAN2</span>
                {this.props.children}
                <span tune={{name: 'divEx.span3', use: this}}>SPAN3</span>
            </div>
        );
    }
}
class SomeComponentEx extends SomeComponent {
    tune(name: string, props: any, children: React.ReactNode[]): ReactTune.ReactNode {
        if (name == 'SomeComponent.span2') {
            props.style = {color: 'green'};
        }
    }
}

class Main extends React.Component {
    render(): React.ReactNode {
        return (
            <div>
                <SomeComponent
                    tune={{name: 'Main.SomeComponent', use: (name, props, children: React.ReactNode[]) => {
                        if (name == 'SomeComponent.span2') {
                            props.style = {color: 'red'};
                        }
                    }}}
                >
                    {' CHILDREN '}
                </SomeComponent>
                <SomeComponentEx />
                <SomeComponentEx
                    tune={{use: (name, props) => {
                        if (name == 'SomeComponent.span2') {
                            props.style.display = 'inline-block';
                            props.style.color = 'blue';
                            return <div {...props}>{'DIV'}</div>;
                        }
                    }}}
                />
            </div>
        );
    }
}

```

## License

[MIT](LICENSE). Copyright (c) 2020 Vitaliy Dyukar.
