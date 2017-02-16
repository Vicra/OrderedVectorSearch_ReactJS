import React from 'react';

export default class MainComponent extends React.Component {
	static propTypes = {
		arrayLength: React.PropTypes.number,
		array: React.PropTypes.array
	}; 

	static defaultProps = {
        arrayLength: 6,
        array : [
        			<div className="normal">1</div>,
    				<div className="normal">5</div>,
    				<div className="normal">6</div>,
    				<div className="normal">9</div>,
    				<div className="normal">11</div>,
    				<div className="normal">13</div>,
    				<div className="normal">14</div>,
    				<div className="normal">16</div>,
    				<div className="normal">18</div>,
    				<div className="normal">20</div>
    			]
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
		let half = Math.floor((start + end) / 2);
	    let b = array[half].props.children;
	    let updatedArray = this.state.array;
	    let activeElement = <div className="seleccionado" key={ half }>{ b }</div>;
	    updatedArray[half] = activeElement;

	    this.setState({array: updatedArray});
	    if (number == b)
	    {
		    let updatedArray = this.state.array;
		    let activeElement = <div className="encontrado" key={ half }>{ b }</div>;
		    updatedArray[half] = activeElement;
		    this.setState({array: updatedArray});
	        return true;
	    }

	    if(number > b && half<array.length - 1)
	    {
	    	let returnValue = {
	        	start: (half+1),
	        	end: end
	        };
	        this.setState({ values: returnValue });
	    }

	    if(number < b && half >= 0)
	    {
	    	let returnValue = {
	        	start: start,
	        	end: (half-1)
	        };
	        this.setState({ values: returnValue });
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
				<br></br>
				<br></br>
				<table>
					<tr>
						<th>Color</th><th>Significado</th>
					</tr>
					<tr>
						<td><div className="seleccionado-min"></div></td>
						<td>Medio</td>
					</tr>
					<tr>
						<td><div className="encontrado-min"></div></td>
						<td>Encontrado</td>
					</tr>
					<tr>
						<td><div className="normal-min"></div></td>
						<td>Demas Nodos</td>
					</tr>
				</table>
				<br></br>
				<div className="array-form">
					<div className="array-search-section">
						<div className="pr">Find</div>
						<input type="text" className="array-search-input pr" ref={ input => this.searchValue = input }/>
						<button type="submit" onClick={ () =>
							this.step(this.state.array, parseInt(this.searchValue.value), 0, 
							this.state.values.start, this.state.values.end) }>Step</button>
						<button type="submit" onClick={ () => this.refresh() }>Refresh</button>
					</div>
				</div>
			</div>
		)
	}
}