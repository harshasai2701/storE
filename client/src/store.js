import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import { userLoginReducer, userRegisterReducer, userListReducer } from './reducers/userReducers';
import { productListReducer, productDetailsReducer, productDeleteReducer, productCreateReducer, productUpdateReducer } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import { orderCreateReducer, orderListMyReducer, orderDetailsReducer, orderListReducer, orderDeliverReducer } from './reducers/orderReducers';

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userList: userListReducer,
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  cart: cartReducer,
  orderCreate: orderCreateReducer,
  orderListMy: orderListMyReducer,
  orderDetails: orderDetailsReducer,
  orderList: orderListReducer,
  orderDeliver: orderDeliverReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {};

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
