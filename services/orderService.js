const Order = require("../modules/orderSchema");
const Product = require("../modules/productSchema");

exports.createOrder = async (params) => {
  const { userId, cart } = params;

  if (!cart) throw { message: "cart was not provided", statusCode: 400 };
  if (!userId) throw { message: "userId was not provided", statusCode: 400 };

  try {
    const newOrder = await Order.create({ userId });
    
    for (const prod of cart.products) {
      const product = await Product.findById(prod.id);
      if (!product) {
        throw { message: `Product with id ${prod.id} not found`, statusCode: 400 };
      }

      let updatedQuantity = product.quantity - prod.quantity;
      if (updatedQuantity < 0) updatedQuantity = 0;

      await OrderDetails.create({
        orderId: newOrder._id,
        productId: prod.id,
        quantity: prod.quantity
      });

      await Product.findByIdAndUpdate(prod.id, { quantity: updatedQuantity });
    }

    return {
      message: `Order was successfully placed with order id ${newOrder._id}`,
      orderId: newOrder._id,
      products: cart.products,
      statusCode: 201
    };
  } catch (error) {
    throw { message: "Failed to create order", statusCode: 500, data: error };
  }
};

exports.getSingleOrder = async (params) => {
  const { orderId, userId } = params;

  if (!orderId) throw { message: "orderId was not provided", statusCode: 400 };
  if (!userId) throw { message: "userId was not provided", statusCode: 400 };

  try {
    const order = await Order.findOne({ _id: orderId, userId }).populate('products');
    if (!order) throw { message: "Order not found", statusCode: 400 };

    return { statusCode: 200, message: "Order found", data: order };
  } catch (error) {
    throw { message: "Failed to get order", statusCode: 500, data: error };
  }
};

exports.getOrders = async (params) => {
  const { userId } = params;

  if (!userId) throw { message: "userId was not provided", statusCode: 400 };

  try {
    const orders = await Order.find({ userId }).populate('products');
    if (orders.length === 0) throw { message: "No orders found", statusCode: 400 };

    return { statusCode: 200, message: `${orders.length} orders found`, data: orders };
  } catch (error) {
    throw { message: "Failed to get orders", statusCode: 500, data: error };
  }
};
