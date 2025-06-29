const express = require("express");
const requestRouter = express.Router();
const { userauth } = require("../middleware/auth");
const User = require("../models/user");
const ConnectionRequestModel = require("../models/ConnectionRequestModel"); // adjust path as needed

// POST API to send connection request
requestRouter.post("/send/request/:status/:touserId", userauth, async (req, res) => {
    try {
        const fromuserId = req.user._id;
        const touserId = req.params.touserId;
        const status = req.params.status;

        // Validation: allowed statuses
        const isAllowed = ["ignored", "interested"];
        if (!isAllowed.includes(status)) {
            return res.status(400).json({ message: `invalid type ${status}` });
        }

        // Validation: check if user exists
        const user = await User.findById(touserId);
        if (!user) {
            return res.status(400).json({ message: "User not found!!" });
        }

        // Validation: check if request already exists
        const checkExistingReq = await ConnectionRequestModel.findOne({
            $or: [
                { fromuserId: fromuserId, touserid: touserId },
                { fromuserId: touserId, touserid: fromuserId }
            ]
        });
        

        if (checkExistingReq) {
            return res.status(400).json({ message: "Request has been sent already!!" });
        }

        // Create connection request
        const newRequest = new ConnectionRequestModel({
            fromuserId,
            touserid: touserId,
            status
        });

        const savedRequest = await newRequest.save(); // schema will block sending request to oneself

        res.status(201).json({ message: "Request sent", data: savedRequest });
    } catch (err) {
        console.error(err);
        return res.status(400).json({ message: "Error: " + err.message });
    }
});

module.exports = requestRouter;
