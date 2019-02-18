import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchFoods} from '../actions/foodActions';
import * as dateHelper from '../helpers/date';
import deleteButton from "../images/delete.svg";
import editButton from "../images/edit.svg";

class Foods extends Component {
  constructor(props) {
    super(props);
    this.deleteDialog = this.deleteDialog.bind(this);
    this.cancelDelete = this.cancelDelete.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
  }

  componentWillMount() {
    this.props.fetchFoods();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.newFood) {
      this.props.foods.push(nextProps.newFood);
    }
  }

  deleteDialog = (event) => {
    let card = event.target.parentNode.parentNode;
    let dialog = card.querySelector(".delete-dialog-container");
    let editButton = card.querySelector(".edit-card");
    let deleteButton = card.querySelector(".delete-card");

    dialog.style.display = "flex";
    editButton.style.visibility = "hidden";
    deleteButton.style.visibility = "hidden";
  }

  cancelDelete = (event) => {
    let card = event.target.parentNode.parentNode.parentNode.parentNode;
    let dialog = card.querySelector(".delete-dialog-container");
    let editButton = card.querySelector(".edit-card");
    let deleteButton = card.querySelector(".delete-card");
    
    dialog.style.display = "none";
    editButton.style.visibility = "visible";
    deleteButton.style.visibility = "visible";
  }

  confirmDelete = (event) => {
    let card = event.target.parentNode.parentNode.parentNode.parentNode;
    let type = card.id.split("-")[0]
    let id = card.id.split("-")[2]

    // add fetch and update state here
    console.log(type, id);
    // cancelDelete after fetch and render to close the dialog
    this.cancelDelete(event);
  }

   componentWillReceiveProps(nextProps) {
   if(nextProps.newFood &&
     (nextProps.newFood.time >= dateHelper.dateRange.begin) &&
     ( nextProps.newFood.time <= dateHelper.dateRange.end) ) {
     this.props.foods.push(nextProps.newFood);
   }
  }
  render() {

    const foodItems = this.props.foods.map(food => (
      <div key={[food.id, food.attributes.type]}
           id={food.attributes.type + "-card-" + food.id}
           className={"card-container " + food.attributes.type} >
        <div className="card-container-visible">
          <div className="name-time-container" >
            <h5 className="card-name"> {food.attributes.name} </h5>
            <h5 className="card-time"> {dateHelper.unixDateToTime(food.attributes.time)}</h5>
          </div>
          <img src={editButton}
               className="edit-card"
               alt="edit food or reaction button" />
          <img src={deleteButton}
               className="delete-card" 
               alt="delete food or reaction button"
               onClick={event => this.deleteDialog(event)} />
        </div>
        <div className="card-container-hidden">
          <div className="delete-dialog-container" 
               ref={"delete-dialog-" + food.attributes.type + "-" + food.id}>
            <div className="delete-dialog-prompt">
              <h5>Are you sure you want to delete {food.attributes.name}?</h5>
            </div>
            <div className="delete-dialog-buttons">
              <button className="dialog-button" 
                      onClick={event => this.cancelDelete(event)}>
                Cancel
              </button>
              <button className="dialog-button"
                      onClick={event => this.confirmDelete(event)}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    ))

    return(
      <div id='day-summary-container'>
        {foodItems}
      </div>
    )
  }
}

Foods.propTypes = {
  fetchFoods: PropTypes.func.isRequired,
  foods: PropTypes.array.isRequired,
  newFood: PropTypes.object
}

const mapStateToProps = state => ({
  foods: state.foods.items,
  newFood: state.foods.item
});

export default connect(mapStateToProps, { fetchFoods })(Foods);
