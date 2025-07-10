const express = require("express");
const router = express.Router();

const getStatOrder = require("./getOrder/getStatOrder.cjs");
const getCurrencyOrder = require("./getOrder/getCurrencyOrder.cjs");
const getBountyOrder = require("./getOrder/getBountyOrder.cjs");

router.post('/user/allOrders', async (req, res) => {
  const { type, username } = req.body;

  try {
    if (type === "All") {
      //console.log("Calling getCurrencyOrder...");
      const currencyOrders = await getCurrencyOrder(username);
      //console.log("✅ Currency OK");

      //console.log("Calling getBountyOrder...");
      const bountyOrders = await getBountyOrder(username);
      //console.log("✅ Bounty OK");

      //console.log("Calling getStatOrder...");
      const statOrders = await getStatOrder(username);
      //console.log("✅ Stat OK");

      const allOrders = [
        ...currencyOrders.map(o => (
          {
             ...o, 
             type: "Currency", 
             id: o.orderid,
             uniqueID: `Currency-${o.orderID}`
          }
          )),
        ...bountyOrders.map(o => (
          {
             ...o, 
             type: "Bounty", 
             id: o.orderid,
             uniqueID: `Bounty-${o.orderID}`
          }
          )),
        ...statOrders.map(o => (
          {
             ...o, 
             type: "Stat", 
             id: o.orderid,
             uniqueID: `Stat-${o.orderID}`
          }
          ))
      ];


      return res.json(allOrders);
    }

    else if (type === "Currency") {
      //console.log("Currency-only request received.");
      const currencyOrders = await getCurrencyOrder(username);
      //console.log("✅ Currency-only data fetched");
      return res.json({ currencyOrders });
    }

    else if (type === "Bounty") {
      //console.log("Bounty-only request received.");
      const bountyOrders = await getBountyOrder(username);
      //console.log("✅ Bounty-only data fetched");
      return res.json({ bountyOrders });
    }

    else if (type === "Stat") {
      //console.log("Stat-only request received.");
      const statOrders = await getStatOrder(username);
      //console.log("✅ Stat-only data fetched");
      return res.json({ statOrders });
    }

    else {
      //console.warn("⚠️ Invalid type parameter:", type);
      return res.status(400).json({ error: "Invalid type parameter" });
    }

  } catch (error) {
    //console.error("❌ Error in /user/allOrders:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
