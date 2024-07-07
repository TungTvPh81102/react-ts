const productReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return {
        ...state,
        products: action.payload
      }
    case 'ADD_PRODUCT':
      return {
        ...state,
        products: [...state.products, action.payload]
      }
    default:
      break
  }
}

export default productReducer
