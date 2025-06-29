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
requestRouter.post("/review/request/:status/:requestId", userauth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const { status, requestId } = req.params;

        const allowed = ["accepted", "rejected"];
        if (!allowed.includes(status)) {
            return res.status(400).json({ message: "Status is not valid" });
        }

        const connectionReq = await ConnectionRequestModel.findOne({
            _id: requestId,
            touserid: loggedInUser._id,
            status: "interested"
        });

        if (!connectionReq) {
            return res.status(400).json({ message: "Request not found or not valid" });
        }

        // Update status before saving
        connectionReq.status = status;
        const data = await connectionReq.save();

        res.json({
            message: `Request has been ${status}`,
            data
        });

    } catch (err) {
        res.status(400).send("Error: " + err.message);
    }
});


module.exports = requestRouter;
