import React,{ Component } from 'react';
import {Card, CardTitle, CardText, CardImgOverlay, CardImg, CardBody} from 'reactstrap';

class Details extends Component{
	constructor(props){
		super(props)
		}

	renderDish(dish){
		if(dish!=null){
			return(
				<div className="col-12 col-sm-5 m-1">
					<Card>
						<CardImg top width="100%" src={dish.image} alt={dish.name} />
						<CardBody>
					        <CardTitle>{dish.name}</CardTitle>
					        <CardText>{dish.description}</CardText>
				        </CardBody>
					</Card>
				</div>
			);	
		}
		else {
            return (
                <div></div>
            );
        }
	}
	renderComments(comments){
		if(comments!=null){

			var com = comments.map((comment) => {
				return(
					<div>
						<ul>
							<li><p>{comment.comment}</p>
							<p>{comment.author}</p></li>
						</ul>
					</div>
				);});

			return(
				<div className="col-12 col-sm-5 m-1">
					<Card>
						<CardTitle>Comments</CardTitle>
						<CardBody>
					        {com}
				        </CardBody>
					</Card>
				</div>
			);	
		}
		else {
            return (
                <div></div>
            );
	    }
	}


	render(){

		return(
			<div className="row">
				{this.renderDish(this.props.Dish)}
				{this.renderComments(this.props.Dish.comments)}
			</div>
			);
	}
}

export default Details;