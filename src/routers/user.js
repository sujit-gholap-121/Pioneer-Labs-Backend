import express from "express";

import {  handleLoginUser } from "../controllers/login.js";
import Logout from "../controllers/logout.js";
import handleGetAPIs from "../controllers/getPublicAPIs.js";
import { handleGetAllUsers } from "../controllers/getUsers.js";
import { handleCreateUser } from "../controllers/createUser.js";
import { handleUserAuthentication } from "../controllers/authentication.js";
import getEthBalance from "../controllers/ethBalance.js";

const router = express.Router();

router
.route("/").get(handleGetAllUsers)
.post(handleCreateUser);

router
  .route("/login")
  .post( handleLoginUser);

router.
  route("/logout")
  .post(handleUserAuthentication,Logout)

  router.route("/public-apis")
.get(handleUserAuthentication,handleGetAPIs)

router.route("/ethBalance/:walletId")
.get(handleUserAuthentication,getEthBalance)



export default router;
