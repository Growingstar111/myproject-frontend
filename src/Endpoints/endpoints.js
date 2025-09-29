import axios from "axios";
import { https } from "./baseURL";

export const showAllUsers = async (pageNumber) => {
  return await https.get(`/admin/view-customer?page=${pageNumber}`);
};

export const banUser = async (id) => {
  return await https.put(`/admin/banuser/${id}`);
};
export const unbanUser = async (id) => {
  return await https.put(`/admin/unbanuser/${id}`);
};
export const viewUSer = async (id) => {
  return await https.get(`/admin/viewuser/${id}`);
};

//api foruserProfile
export const viewUSerProfile = async () => {
  return await https.get(`/viewuser-profile`);
}

export const loginUser = async (body) => {
  return await axios.post("http://localhost:5000/api/login", body);
};

export const addUser = async (body) => {
  return await axios.post("http://localhost:5000/api/register", body);
};
export const verifyUser = async (values) => {
  return await axios.post("http://localhost:5000/api/verifyuser", values, {});
};
export const logoutUser = async () => {
  return await https.delete("/logout");
};

export const forgetPassword = async (values) => {
  return await axios.post("http://localhost:5000/api/forgetpassword", values);
};

export const setNewPassword = async (values) => {
  return await axios.put("http://localhost:5000/api/setpassword", values);
};
// api for getting all products of a comapny
export const getAllProducts = async () => {
  return await https.get("/product/view-products");
};

export const addProduct = async (values) => {
  return await https.post("/product/add-product", values);
};
export const getcategories = async () => {
  return await axios.get("http://localhost:5000/api/product/get-categories");
};
export const viewSingleProductt = async (id) => {
  return await https.get(
    `/product/view-single-product/${id}`
  );
};
//api for update product
export const updateProduct = async(id)=>{
  return await https.put(`/product/update-product/${id}`)
}

// api for viewing all the products at the userend
export const viewAllProductsForUsers = async (pageNumber ,search="") => {
  return await https.get(`/product/view-all-user-products?page=${pageNumber}&search=${search}`);
};

//api for add product to wishlist
export const addToWishlist = async (product) => {
  return await https.post("/product/add-to-wishlist", product);
};


//api for view products in wishlist
export const viewWishlist = async () => {
  return await https.get("/product/view-wishlist");
};

//api for remove product from wishlist
export const removeFromWishlist = async (product) => {
  return await https.put("/product/remove-from-wishlist", product);
};

//api for add to cart product 
export const addToCart = async(product) =>{
  return await https.post('/product/add-to-cart', product)
};
//api for remove product from cart 
export const removeFromCart = async(product) =>{
  return await https.put('/product/remove-from-cart',product)
};

//api for view cart
export const viewCart = async() =>{
  return await https.get('/product/view-cart')
}


//api for  updating cart product qauntity 
export const updateCartQuantity = async(values) =>{
  return await https.patch('/product/update-quantity', values)
}

//api for adding new address
export const addNewAddress = async(values)=>{
  return await https.post('/add-address', values)
}

export const getUserAddress = async() =>{
  return await https.get('/get-addersses')
}

export const deleteAddress = async(addressId) =>{
  return await https.put(`/delete-address`,addressId)
}

export const accountOnboarding = async()=>{
  return await https.post('/link-account')
}

export const addCategory = async(value)=>{
  return await https.post('/admin/add-category', value)
}

export const retrieveAccount = async()=>{
  return await https.get('/payment/retrive-account')
}

export const viewAllOrders = async ()=>{
  return await https.get('/order/view-orders')
}

