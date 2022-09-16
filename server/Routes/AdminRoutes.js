const { checkAdmin } = require("../Middlewares/AdminMiddle");
const {
  adminlogin,
  viewApplication,
  pendingApplications,
  allApplications,
  changeStatus,
  allSlots,
  slotUpdate,
  newdata,
  getAllUsers,
  deleteUser,
  editUser,
  addNewUser,
} = require("../Controllers/AdminControllers");
const router = require("express").Router();

router.post("/", checkAdmin);
router.post("/login", adminlogin);
router.get("/newdata", newdata);
router.get("/alldata", allApplications);
router.get("/pendingapplications", pendingApplications);
router.post("/changestatus", changeStatus);
router.get("/allslots", allSlots);
router.post("/slotupdate", slotUpdate);
router.get("/viewapplication/:id", viewApplication);
router.get("/getUsers", getAllUsers);
router.delete("/deleteUser/:id", deleteUser);
router.put("/updateUser/:id", editUser);
router.post("/addUser", addNewUser);
module.exports = router;
