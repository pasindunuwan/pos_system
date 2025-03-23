const payment = require("../model/paymentSchema");

//function
const makePayment = async (req, resp) => {
  //admin//manager
  try {
    const createPayment = new payment(req.body);
    const savedPayemnt = await createPayment.save();
    resp.status(201).json({ message: "payment saved", data: savedPayemnt });
  } catch (e) {
    resp.status(500).json({ error: e.message });
  }
};
const findIncomeToday = async (req, resp) => {
  //admin//manager
  try {
    const { day } = req.body; // Read from JSON body instead of query

    if (!day || isNaN(Date.parse(day))) {
      return resp
        .status(400)
        .json({ error: "Invalid date format. Use YYYY-MM-DD." });
    }

    const startDay = new Date(`${day}T00:00:00.000Z`);
    const endDay = new Date(startDay);
    endDay.setUTCDate(endDay.getUTCDate() + 1);

    const data = await payment.find({
      date: { $gte: startDay, $lt: endDay },
    });

    const totalIncome = data.reduce((sum, payment) => sum + payment.amount, 0);

    resp.status(200).json({ message: "Today's income", data: totalIncome });
  } catch (e) {
    resp.status(500).json({ error: e.message });
  }
};
const findIncomeByCurrentMonth = async (req, resp) => {
  //admin//manager
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    const data = await payment.find({
      date: {
        $gte: startOfMonth,
        $lt: endOfMonth,
      },
    });

    const incomeByDay = data.reduce((acc, payment) => {
      const day = payment.date.toISOString().split("T")[0]; //[date, time]
      acc[day] = (acc[day] || 0) + payment.amount;
      return acc;
    }, {});

    resp.status(200).json({
      message: "Monthly income",
      data: { month: now.getMonth() + 1, income: incomeByDay },
    });
  } catch (e) {
    resp.status(500).json({ error: e.message });
  }
};
module.exports = { makePayment, findIncomeToday, findIncomeByCurrentMonth };
