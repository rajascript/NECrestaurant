const passport = require("passport");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const generatePassword = require("password-generator");
const bcrypt = require("bcrypt");
const keys = require("../config/keys");
const saltRounds = 10;
const Admin = mongoose.model("Admin");
const requireLogin = require("../middlewares/requireLogin");
module.exports = app => {
	app.post(
		"/api/admin/login",
		passport.authenticate("admin-login", { session: false }),
		(req, res) => {
			let currAdmin = {
				username: req.user.username,
				/* eslint-disable */
				id: req.user._id
				/* eslint-enable */
			};
			const token = jwt.sign(currAdmin, keys.jwtKey, {
				// define time here.
				expiresIn: 48 * 60 * 60
			});
			res.status(200).json({
				token,
				user: currAdmin
			});
		}
	);

	app.post(
		"/api/admin/create",
		passport.authenticate("jwt", { session: false }),
		async (req, res) => {
			if (!req.user.canCreate) {
				return res
					.status(403)
					.send(`${req.user.username} does not have admin create rights.`);
			}
			let { username, canCreate, canUpdate, name, empId, canDelete } = req.body;
			const password = generatePassword();
			let newAdmin = {
				username,
				canCreate,
				canUpdate,
				name,
				empId,
				canDelete
			};
			const existingUser = await Admin.findOne({ username });
			const existingUserWithEmp = await Admin.findOne({ empId });
			if (existingUser) {
				return res.status(401).json({
					responseError: `User with ${username} already exists.`
				});
			} else if (existingUserWithEmp) {
				return res.status(401).json({
					responseError: `User with employee id ${empId} already exists.`
				});
			} else {
				bcrypt.hash(password, saltRounds, async function(err, hash) {
					if (err) {
						return res.status(200).json({
							responseError: "server error."
						});
					}
					newAdmin.password = hash;
					new Admin(newAdmin).save();
					return res.status(200).json({
						response: "admin created successfully.",
						username,
						password
					});
				});
			}
		}
	);
	app.post(
		"/api/admin/delete",
		passport.authenticate("jwt", { session: false }),
		async (req, res) => {
			if (!req.user.canDelete) {
				res.status(403).send(`${username} does not have admin delete rights.`);
			}
			let { username } = req.body;
			try {
				let currAdmin = await Admin.findOne({ username });
				if (
					currAdmin === null ||
					typeof currAdmin === "undefined" ||
					!currAdmin
				) {
					res.status(404).json({
						response: `admin with username ${username} is not found.`
					});
				} else if (currAdmin.su) {
					return res.status(403).json({
						responseError: `${username} is a superuser.`
					});
				} else {
					let mongoRes = await Admin.deleteOne({ _id: currAdmin._id });
					console.log(mongoRes);
					res.status(200).json({
						response: `admin with username ${username} has been deleted successfully.`
					});
				}
			} catch (ex) {
				console.log("err at admin delete route", ex);
				res.status(500).json({
					response: `internal server error`
				});
			}
		}
	);
	app.post(
		"/api/admin/update",
		passport.authenticate("jwt", { session: false }),
		async (req, res) => {
			if (!req.user.canUpdate) {
				res.status(403).send(`${username} does not have admin update rights.`);
			}
			let { username } = req.body;
			let updated = findAdminUpdateFields(req.body);
			if (updated === {} || typeof updated === "undefined") {
				return res.status(400).json({
					response: `bad request.`
				});
			}
			try {
				let currAdmin = await Admin.findOne({ username });
				if (
					currAdmin === null ||
					typeof currAdmin === "undefined" ||
					!currAdmin
				) {
					return res.status(404).json({
						response: `admin with username  ${username} is not found.`
					});
				} else if (currAdmin.su) {
					return res.status(403).json({
						responseError: `${username} is a superuser.`
					});
				} else {
					for (key in updated) {
						currAdmin[key] = updated[key];
					}
					await currAdmin.save();
					res.status(200).json({
						response: `admin with username ${username} has been updated successfully.`
					});
				}
			} catch (ex) {
				console.log("err at admin update route", ex);
				res.status(500).json({
					response: `internal server error`
				});
			}
		}
	);
	app.get(
		"/api/admin/logout",
		passport.authenticate("jwt", { session: false }),
		(req, res) => {
			req.logout();
			res.redirect("/checkserver");
		}
	);

	app.get(
		"/api/admin/current_admin",
		passport.authenticate("jwt", { session: false }),
		(req, res) => {
			res.status(200).send(currUser);
		}
	);
};

function findAdminUpdateFields(obj) {
	let upObj = obj;
	let finalObj = {};
	for (key in upObj) {
		switch (key) {
			case "canCreate":
				finalObj[key] = upObj[key];
				break;
			case "canUpdate":
				finalObj[key] = upObj[key];
				break;
			case "name":
				finalObj[key] = upObj[key];
				break;
			case "empId":
				finalObj[key] = upObj[key];
				break;
			case "canDelete":
				finalObj[key] = upObj[key];
				break;
		}
	}
	return finalObj;
}
