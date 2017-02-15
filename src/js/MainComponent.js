import React from 'react';

export default class MainComponent extends React.Component {
	static propTypes = {
		arrayLength: React.PropTypes.number,
		array: React.PropTypes.array
	};

	static defaultProps = {
        arrayLength: 6,
        array : [<div className="normal">1</div>,
    				<div className="normal">5</div>,
    				<div className="normal">6</div>,
    				<div className="normal">8</div>]
    };

	constructor(props) {
		super(props);

		this.step = this.step.bind(this);
		this.refresh = this.refresh.bind(this);

		this.state = {
			array : props.array,
			values : {
				start: 0,
				end : props.array.length
			}
		}
	}

	step(array, number, lastChecked, start, end) {
		console.log("valor buscado:" + number);
		console.log("lastChecked:" + lastChecked);
		let half = Math.floor((start + end) / 2);
	    let b = array[half];
	    console.log("half:" + half);
	    console.log("b:" + b);
	    let updatedArray = this.state.array;
	    let activeElement = <div className="seleccionado" key={ half }>{ b }</div>;
	    updatedArray[half] = activeElement;
	    this.setState({array: updatedArray});

	    if (number === b)
	    {
	    	console.log("entra al if");
		    let updatedArray = this.state.array;
		    let activeElement = <div className="encontrado" key={ half }>{ b }</div>;
		    updatedArray[half] = activeElement;
		    this.setState({array: updatedArray});
	        return true;
	    }

	    if(number > b && half<array.length - 1 && half != lastChecked)
	    {
	    	console.log("entra al segundo if");
	    	let returnValue = {
	        	start: (half+1),
	        	end: end
	        };
	        return returnValue;
	    }

	    if(number < b && half >= 0 && half != lastChecked)
	    {
	    	console.log("entra al tercer if");
	    	let returnValue = {
	        	start: start,
	        	end: (half-1)
	        };
	        return returnValue;
	    }

	    return false;
	}

	refresh(){
		window.location.reload();
	}

	render() {
		return (
			<div>
				<div className = "array-container">
					{ this.state.array }
				</div>
				<div className="array-form">
					<div className="array-search-section">
						<div className="pr">Find</div>
						<input type="text" className="array-search-input pr" ref={ input => this.searchValue = input }/>
						<button type="submit" onClick={ () => this.state.values = 
							this.step(this.state.array, parseInt(this.searchValue.value), 0, 
							this.state.values.start, this.state.values.end) }>Step</button>
						<button type="submit" onClick={ () => this.refresh() }>Refresh</button>
					</div>
				</div>
			</div>
		)
	}
}