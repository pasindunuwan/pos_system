const customer = require("../model/customerSchema");

//function
const saveCustomer = async (req, resp) => {
  //admin//manager
  try {
    const createCustomer = new customer(req.body);
    const savedCustomer = await createCustomer.save();
    resp.status(201).json({ data: savedCustomer });
  } catch (e) {
    resp.status(500).json({ error: e.message });
  }
};
const updateCustomer = async (req, resp) => {
  //admin//manager
  try {
    const updatedCustomer = await customer.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (updateCustomer) {
      resp
        .status(201)
        .json({ messge: "customer updated", data: updateCustomer });
    }
    resp.status(404).json({ messge: "customer not found" });
  } catch {
    resp.status(500).json({ error: e.message });
  }
};
const deleteCustomer = async (req, resp) => {
  try {
    const deleteCustomer = await customer.findByIdAndDelete(req.params.id);
    if (deletedCustomer) {
      resp
        .status(201)
        .json({ messge: "customer deleted", data: deleteCustomer });
    }
    resp.status(404).json({ messge: "customer not found" });
  } catch {
    resp.status(500).json({ error: e.message });
  }
};
const findCustomer = async (req, resp) => {
  try {
    const selectedCustomer = await customer.findById(req.params.id);
    if (selectedCustomer) {
      resp
        .status(201)
        .json({ messge: "customer found", data: selectedCustomer });
    }
    resp.status(404).json({ messge: "customer not found" });
  } catch {
    resp.status(500).json({ error: e.message });
  }
};
const loadAllCustomer = async (req, resp) => {
  try {
    const { searchText, page = 1, size = 10 } = req.query;
    const filter = searchText
      ? {
          $or: [
            { customerName: { $regex: searchText, $options: "i" } },
            { address: { $regex: searchText, $options: "i" } },
            { email: { $regex: searchText }, $options: "i" },
          ],
        }
      : {};
    const customerList = await customer
      .find(filter)
      .skip((page - 1) * size)
      .limit(parseInt(size));
    const total = await customer.countDocuments(filter);

    resp.status(200).json({
      messge: "data list",
      data: { dataList: customerList, count: total },
    });
  } catch (e) {
    resp.status(500).json({ error: e.message });
  }
};
module.exports = {
  saveCustomer,
  updateCustomer,
  deleteCustomer,
  findCustomer,
  loadAllCustomer,
};
