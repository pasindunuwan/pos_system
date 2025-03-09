const order = require("../model/orderSchema");

const saveOrder = async (req, resp) => {
  //admin//manager
  try {
    const createOrder = new Order(req.body);
    const savedOrder = await createOrder.save();
    resp.status(201).json({ message: "order saved", data: savedOrder });
  } catch (e) {
    resp.status(500).json({ error: e.message });
  }
};
const updateOrder = async (req, resp) => {
  //admin//manager
  try {
    const updatedOrder = await customer.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (updatedOrder) {
      resp.status(201).json({ messge: "order updated", data: updatedOrder });
    }
    resp.status(404).json({ messge: "order not found" });
  } catch {
    resp.status(500).json({ error: e.message });
  }
};
const updateOrderStatus = async (req, resp) => {
  //admin//manager
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!["PENDING", "REJECTED", "COMPLETED", "CANSELLED"].includes(status)) {
      return resp.status(400).json({ message: "invslid status" });
    }
    const updatedorder = await customer.findByIdAndUpdate(
      id,
      { status },
      {
        new: true,
      }
    );
    if (updatedorder) {
      resp.status(201).json({ messge: "order updated", data: updatedorder });
    }
    resp.status(404).json({ messge: "order not found" });
  } catch {
    resp.status(500).json({ error: e.message });
  }
};
const deleteOrder = async (req, resp) => {
  try {
    const deleteOrder = await customer.findByIdAndDelete(req.params.id);
    if (deleteOrder) {
      resp.status(201).json({ messge: "order deleted", data: deleteOrder });
    }
    resp.status(404).json({ messge: "order not found" });
  } catch {
    resp.status(500).json({ error: e.message });
  }
};

const findOrder = async (req, resp) => {
  try {
    const selectedOrder = await customer.findById(req.params.id);
    if (selectedOrder) {
      resp.status(201).json({ messge: "order found", data: selectedOrder });
    }
    resp.status(404).json({ messge: "order not found" });
  } catch {
    resp.status(500).json({ error: e.message });
  }
};
const loadAllOrder = async (req, resp) => {
  //manager admin
  try {
    const { page = 1, size = 10 } = req.query;

    const orderList = await customer
      .find()
      .sort({ Date: 1 })
      .skip((page - 1) * size)
      .limit(parseInt(size));
    const total = await customer.countDocuments();

    resp.status(200).json({
      messge: "data list",
      data: { orderList: orderList, count: total },
    });
  } catch {
    resp.status(500).json({ error: e.message });
  }
};
module.exports = {
  saveOrder,
  updateOrderStatus,
  updateOrder,
  deleteOrder,
  findOrder,
  loadAllOrder,
};
