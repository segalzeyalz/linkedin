import express from "express";
import ctrl from "./users.ctrl";

const router = express.Router();
router
    .route("/users")
    // GET /api/v1/users - Get list of users
    .get(ctrl.getAll)

    // POST /api/v1/users - Create new users
    .post(ctrl.create);

router
    .route("/users/:id")
    .get(ctrl.getUser)
    // DELETE /api/v1/users/:id - Delete user
    .delete(ctrl.remove)

// PUT /api/v1/users/:id - Update user
    .put(ctrl.update);

export default router;