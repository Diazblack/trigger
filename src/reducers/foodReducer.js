import { FETCH_FOODS, NEW_FOOD, DESTROY_FOOD } from '../actions/types'
const initialState = {
  items: [],
  item: {}
}
export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_FOODS:
      return {
        ...state,
        items: action.payload
      }
    case NEW_FOOD:
      return {
        ...state,
        item: action.payload
      }
    case DESTROY_FOOD:
      return state.filter(food => {
        return food.id !== action.payload;
      })

    default:
     return state;

  }
}
