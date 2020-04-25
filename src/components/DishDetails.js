import React,{ Component } from 'react';
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem , Button, Col, Modal, ModalHeader, ModalBody, Label, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);


class CommentForm extends Component {

  constructor(props){
        super(props);
        this.toggleModal=this.toggleModal.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.state = {
            isModalOpen: false
        };
    }

    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
      this.toggleModal();
      this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    }

  render(){
    return(
      <React.Fragment>
        <Button onClick={this.toggleModal} outline className="offset-2 btn-info"><span className="fa fa-lg fa-pencil"></span> Submit Comment</Button>

        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
              <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                  <Label htmlFor="rating">Rating</Label>
                  <Row className="form-group">
                      <Col className="col-12">
                          <Control.select model=".rating" name="rating" default="3"
                          className="custom-select col-md-12 from-control">
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                          </Control.select>
                      </Col>
                  </Row>
                  <Label htmlFor="author">Your name</Label>
                  <Row className="form-group">
                      <Col md={12}>
                          <Control.text model=".author" id="author" name="author" placeholder="Your Name" 
                          className="form-control"
                          validators={{
                              required, minLength: minLength(3), maxLength: maxLength(15)
                          }}
                          />
                          <Errors 
                              className="text-danger"
                              model=".author"
                              show="touched"
                              messages={{
                                  required: 'Required',
                                  minLength: 'Must be greater than 2 chracters',
                                  maxLength: 'Must be 15 characters or less'
                              }}
                          />
                      </Col>
                  </Row>
                  <Label htmlFor="comment">Comment</Label>
                  <Row className="form-group">
                      <Col>
                          <Control.textarea model=".comment" id="comment" name="comment" 
                          rows="6"  
                          className="form-control"/>
                              
                      </Col>
                  </Row>
                  <Row className="form-group">
                      <Col>
                          <Button type="submit" color="primary">
                              Submit
                          </Button>
                      </Col>
                  </Row>
              </LocalForm>
          </ModalBody>
      </Modal>
    </React.Fragment>
    );
  }
}

function RenderDish({dish}){
	if(dish!=null){
		return(
			<div className="col-12 col-sm-5 m-1">
				<Card>
					<CardImg top width="100%" src={dish.image} alt={dish.name} />
					<CardBody>
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

  function RenderComments({comments, addComment, dishId}) {
  	if(comments!=null){

		var com = comments.map((comment) => {
			return(
				<div>
						<li><p>{comment.comment}</p>
						<p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p></li>
				</div>
			);});

		return(
			<div className='col-12 col-md-5 m-1'>
                <h4> Comments </h4>
                <ul>
                    {com}
                </ul>
                <CommentForm dishId={dishId} addComment={addComment} />
            </div>
		);	
	}
	else {
        return (
            <div></div>
        );
    }
}

function Details(props) {
  if(props.dish!=null){
              return (
                <React.Fragment>
                    <div className="container">
                        <div className="row">
                            <Breadcrumb>
                                <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                                <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                                <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                            </Breadcrumb>
                            <div className="col-12">
                                <h3>{props.dish.name}</h3>
                                <hr />
                            </div>                
                        </div>
                        <div className="row">
                            <RenderDish dish={props.dish} />
                            <RenderComments comments={props.comments} addComment={props.addComment} dishId={props.dish.id} />
                        </div>
                    </div>
                </React.Fragment>
            );  
  }
  else{
    return(<div></div>);
  }
}
       	



export default Details;