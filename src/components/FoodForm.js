import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createFood } from '../actions/foodActions';

class FoodForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'food',
      name: '',
      time: ''
      };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.addFood = this.addFood.bind(this);
    this.addReaction = this.addReaction.bind(this);
    this.renderResponse = this.renderResponse.bind(this);
    this.formContainer = React.createRef();
    this.fieldsContainer = React.createRef();
    this.responseContainer = React.createRef();
  }

  componentWillUpdate() {
    if (this.props.displayAddForm === false) {
      this.setState({
        type: 'food',
        name: '',
        time: ''
      })
    }
  }

  componentDidUpdate() {
    this.toggleDisplay()
  }

  toggleDisplay() {
    if(this.props.displayAddForm) {
      this.formContainer.current.style.bottom = "60px";
    } else {
      this.formContainer.current.style.bottom = "-280px";
      this.fieldsContainer.current.style.visibility = "visible";
      this.responseContainer.current.style.visibility = "hidden";
    }
  }

  addFood() {
    this.setState({ type: "food"})
  }

  addReaction() {
    this.setState({ type: "reaction" })
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();

    const food = {
      type: this.state.type,
      name: this.state.name,
      time: this.state.time  // need to add a date helper function to convert simple time to Unix
    }
    this.props.createFood(food);
    this.renderResponse(this.props.foodResponse); // this doesn't work because createFood is async, need to implement async/await?  
  }

  renderResponse(response) {
    this.fieldsContainer.current.style.visibility = "hidden";
    this.responseContainer.current.style.visibility = "visible";
  }

  render() {

    const selectedTab = (type) => {
      return type === this.state.type ? "selected-tab" : ""
    }

    const namePlaceholder = () => {
      let type = this.state.type
      let capType = type.charAt(0).toUpperCase() + type.slice(1)
      return `Enter Name of ${capType}`;
    }

    return(
      <div id="food-form-container" ref={this.formContainer}>
        <div className="food-form-tabs-container">
          <div className={"food-form-tab add-food-tab " + selectedTab("food")} 
               onClick={this.addFood}>
            <h4>Add Food</h4>
          </div>
          <div className={"food-form-tab add-reaction-tab " + selectedTab("reaction")} 
               onClick={this.addReaction}>
            <h4>Add Reaction</h4>
          </div>
        </div>
        <div id="food-form-fields-container" ref={this.fieldsContainer}>
          <form onSubmit={this.onSubmit}>
            <div>
              <input type="text"
                     name="name"
                     value={this.state.name}
                     placeholder={namePlaceholder()}
                     onChange={this.onChange}
              />
            </div>
            <div>
              <input type="text"
                     name="time"
                     value={this.state.time}
                     placeholder="Enter Time"
                     onChange={this.onChange}
              />
              <button type="submit"> Submit </button>
            </div>
          </form>
        </div>
        <div id="food-form-response-container" ref={this.responseContainer}>
          <h3 id="food-form-response">{this.props.foodResponse}</h3>
          <h3>Click "X" below to close.</h3>
        </div>
      </div>
    )
  }
}

FoodForm.propTypes = {
  createFood: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
  displayAddForm: state.foodForm.display,
  foodResponse: state.foods.item.status
});

export default connect(mapStateToProps, {createFood} )(FoodForm);
