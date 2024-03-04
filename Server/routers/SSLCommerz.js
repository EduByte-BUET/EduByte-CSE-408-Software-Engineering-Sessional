require("dotenv").config();
const express = require("express");
const { uuid } = require("uuidv4");
const SSLCommerzPayment = require("sslcommerz-lts");

const router = express.Router();

const payment_router = express.Router();
router.use("/payment", payment_router);
const success_router = express.Router();
router.use("/payment/success", success_router);
const failure_router = express.Router();
router.use("/payment/fail", failure_router);
const cancel_router = express.Router();
router.use("/payment/cancel", cancel_router);

const store_id = "eduby65e524da7f98c";
const store_passwd = "eduby65e524da7f98c@ssl";

payment_router.route("/").post(async (req, res) => {
	console.log("/donate/payment POST");

	const tran_id = uuid();
	const amount = req.body.amount;
	const username = req.session.username;

	const data = {
		total_amount: parseInt(amount), // may have security issues
		currency: "BDT",
		tran_id: tran_id, // use unique tran_id for each api call
		success_url: "http://localhost:3000/donate/payment/success",
		fail_url: "http://localhost:3000/donate/payment/fail",
		cancel_url: "http://localhost:3000/donate/payment/cancel",
		ipn_url: "http://localhost:3000/ipn",
		shipping_method: "Courier",
		product_name: "Computer.",
		product_category: "Electronic",
		product_profile: "general",
		cus_name: username,
		cus_email: "customer22@gmail.com",
		cus_add1: "Dhaka",
		cus_add2: "Dhaka",
		cus_city: "Dhaka",
		cus_state: "Dhaka",
		cus_postcode: "1000",
		cus_country: "Bangladesh",
		cus_phone: "01711111111",
		cus_fax: "01711111111",
		ship_name: "Customer Name",
		ship_add1: "Dhaka",
		ship_add2: "Dhaka",
		ship_city: "Dhaka",
		ship_state: "Dhaka",
		ship_postcode: 1000,
		ship_country: "Bangladesh",
	};

	console.log(
		"tran_id: " + tran_id + ", store_id: ",
		store_id + "\nstore_passwd: ",
		store_passwd
	);
	console.log("Amount: ", amount);
	const sslcz = new SSLCommerzPayment(store_id, store_passwd, false);
	sslcz.init(data).then((apiRes) => {
		// Redirect the user to payment gateway
		if (apiRes?.GatewayPageURL) {
			res.status(200).json({ url: apiRes.GatewayPageURL });
		} else {
			res.status(400).json({
				message: "Session was not successful",
			});
		}
	});
});

success_router.route("/").post(async (req, res) => {
	console.log("/donate/payment/success POST");

	res.redirect("http://localhost:5173/donate/payment/success");
});

failure_router.route("/").post(async (req, res) => {
	console.log("/donate/payment/fail POST");

	res.redirect("http://localhost:5173/donate/payment/fail");
});

cancel_router.route("/").post(async (req, res) => {
	console.log("/donate/payment/cancel POST");

	res.redirect("http://localhost:5173/donate/payment/cancel");
});

module.exports = router;
