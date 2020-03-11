import React,{ Component } from 'react';
import Details from './DishDetails.js';
import {Card, CardTitle, CardText, CardImgOverlay, CardImg, CardBody} from 'reactstrap';

class Menu extends Component{
	constructor(props){
		super(props);

		this.state = {
			selectedDish : null
		} ;
	}

	onDishSelect(dish){
		this.setState({selectedDish: dish});
	}

	renderDishAndDetails(dish){
		if(dish!=null){
			return(
				<Details Dish={dish}/>
				);
		}
	}

	render(){
	
	const menu = this.props.dishes.map((dish) =>{
		return(
			<div key={dish.id} className="col-12 col-sm-5 m-1" onClick={()=> this.onDishSelect(dish)}>
		      <Card>
		        <CardImg width="100%" src={dish.image} alt={dish.name} />
		        <CardImgOverlay>
		          <CardTitle>{dish.name}</CardTitle>
		        </CardImgOverlay>
		      </Card>
		    </div>
			);
	});

		return(
			<div className="container">
				<div className="row">
					{menu}
				</div>
				{this.renderDishAndDetails(this.state.selectedDish)}
			</div>
			);
	}

}

export default Menu;