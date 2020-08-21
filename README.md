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

class BaseComponent extends ReactTune.Component<{label: string}> {
	render(): React.ReactNode {
		return (
			<div tune={{name: 'BaseComponent.main', it: this}}>
				<span style={{color: '#aaa', fontSize: '12px'}}>{`${this.props.label} - `}</span>
				<span tune={{name: 'BaseComponent.span1', it: this}}>SPAN1</span>
				<span tune={{name: 'BaseComponent.span2', it: this}}>SPAN2</span>
				<span tune={{name: 'BaseComponent.span3', it: this}}>SPAN3</span>
			</div>
		);
	}
}

class BaseComponentTuned extends BaseComponent {
	tune(name: string, props: any, children: React.ReactNode[]): ReactTune.ReactNode {
		switch (name) {
			case 'BaseComponent.span2': {
				props.style = {...props.style, color: 'green'};
				break;
			}
			case 'BaseComponent.main': {
				children.push(<span tune={{name: 'BaseComponent.span4', it: this}}>SPAN4</span>);
			}
		}
	}
}

class PairComponent extends ReactTune.Component<{label: string}> {
	render(): React.ReactNode {
		return (
			<>
				<BaseComponent
					label={`${this.props.label} - BaseComponent`}
					tune={{name: 'PairComponent.BaseComponent', it: this}}
				/>
				<BaseComponentTuned
					label={`${this.props.label} - BaseComponentTuned`}
					tune={{name: 'PairComponent.BaseComponentTuned', it: this}}
				/>
			</>
		);
	}
}

class Main extends React.Component {
	render(): React.ReactNode {
		return (
			<div>
				<BaseComponent
					label={'BaseComponent tuned'}
					tune={{it: this, name: 'Main.BaseComponent', use: (name, props, children: React.ReactNode[]) => {
						if (name == 'BaseComponent.span2') {
							props.style = {...props.style, color: 'red'};
						}
					}}}
				/>
				<BaseComponentTuned label={'BaseComponentTuned'} />
				<BaseComponentTuned label={'BaseComponentTuned tuned'}
					tune={{it: this, name: 'Main.BaseComponentTuned', use: (name, props) => {
						if (name == 'BaseComponent.span2') {
							props.style = {...props.style, color: 'blue', display: 'inline-block'};
							return <div {...props}>{'DIV'}</div>;
						}
					}}}
				/>
				<PairComponent label={'Pair'} />
				<PairComponent
					label={'Pair tuned'}
					tune={{it: this, name: 'Main.PairComponent', use: (name, props) => {
						if (name == 'PairComponent.BaseComponentTuned') {
							props.tune = {...props.tune, use: (childName: string, childProps: any) => {
								if (childName == 'BaseComponent.span4') {
									childProps.style = {...props.style, fontWeight: 'bold'};
								}
							}};
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
