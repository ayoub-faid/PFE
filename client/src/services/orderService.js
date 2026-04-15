import axios from 'axios';

const API_URL = 'http://localhost:5000/api/orders';

const orderService = {
  checkoutOrder: (orderData) => {
    return axios.post(API_URL, orderData);
  }
};

export default orderService;
