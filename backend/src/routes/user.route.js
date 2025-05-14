import express from "express";
import { protectRoute } from "../middleware/authMiddleware.js";
import { User } from "../models/User.js";
import { FriendRequest } from "../models/FriendRequest.js";

export const userRoutes = express.Router();

userRoutes.get("/", protectRoute, async (req, res) => {
  console.log("MyAccountuser", req.user);
  try {
    const currentUserId = req.user._id;
    const currentUser = req.user;
    const recommendedUsers = await User.find({
      $and: [
        { _id: { $ne: currentUserId } }, // exclude currentUser
        { _id: { $nin: currentUser.friends } }, // exclude currentUser's friends,
        { isOnboarded: true },
      ],
    });
    res.status(200).json(recommendedUsers);
  } catch (error) {
    console.error("Error in getRecommendedUser controller", error.message);
    res.status(500).json({ message: "Internal Server error" });
  }
});

userRoutes.get("/friends", protectRoute, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select("friends")
      .populate(
        "friends",
        "fullName profilePic nativeLanguage learningLanguage"
      );

    res.status(200).json(user.friends);
  } catch (error) {
    console.log("error in userRoute-getFriends", error);
  }
});

userRoutes.post("/friend-requests/:id", protectRoute, async (req, res) => {
  try {
    const myId = req.user._id;
    const { id: recipientId } = req.params;

    if (myId === recipientId) {
      return res
        .status(400)
        .json({ message: "You can't send friend request to yourself" });
    }
    const recipient = await User.findById(recipientId);
    if (!recipient) {
      return res.status(400).json({ message: "Recipient not found" });
    }
    if (recipient.friends.includes(myId)) {
      return res
        .status(400)
        .json({ message: "You are already friends with this user" });
    }

    const existingRequest = await FriendRequest.findOne({
      $or: [
        { sender: myId, recipient: recipientId },
        { sender: recipientId, recipient: myId },
      ],
    });
    if (existingRequest) {
      return res
        .status(200)
        .json({ message: "A friend already exists between you and this user" });
    }
    const friendRequest = await FriendRequest.create({
      sender: myId,
      recipient: recipientId,
    });

    res.status(201).json(friendRequest);
  } catch (error) {
    console.log("error in userRoute friendReuest", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

userRoutes.put("/friend-request/:id/accept", protectRoute, async (req, res) => {
  try {
    const { id: requestId } = req.params;

    const friendRequest = await FriendRequest.findById(requestId);

    if (!friendRequest) {
      return res.status(404).json({ message: "Friend request not found" });
    }
    // check the user id if not work                    \|/
    if (friendRequest.recipient.toString() !== req.user._id.toString()) {
      return res
        .status(401)
        .json({ message: "You are not authorized to accept this request" });
    }

    friendRequest.status = "accepted";
    await friendRequest.save();

    await User.findByIdAndUpdate(friendRequest.sender, {
      $addToSet: { friends: friendRequest.recipient },
    });
    await User.findByIdAndUpdate(friendRequest.recipient, {
      $addToSet: { friends: friendRequest.sender },
    });
    res.status(201).json({ message: "Friend request accepted" });
  } catch (error) {
    console.log("error in userRoute friend-request accept ", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

userRoutes.get("/friend-requests", protectRoute, async (req, res) => {
  try {
    const incomingReqs = await FriendRequest.find({
      recipient: req.user._id,
      status: "pending",
    }).populate(
      "sender",
      "fullName profilePic nativeLanguage learningLanguage "
    );

    const acceptedRequest = await FriendRequest.find({
      sender: req.user._id,
      status: "accepted",
    }).populate("recipient", "fullName profilePic");
    res.status(200).json({ incomingReqs, acceptedRequest });
  } catch (error) {
    console.log("error in userRoute getPendingRequest", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

userRoutes.get("/outgoing-friend-requests", protectRoute, async (req, res) => {
  try {
    const outgoingRequests = await FriendRequest.find({
      sender: req.user._id,
      status: "pending",
    }).populate(
      "recipient",
      "fullName profilePic nativeLanguage learningLanguage"
    );
    res.status(200).json(outgoingRequests);
  } catch (error) {
    console.log("error in userRoutes outgoing-friend-requests", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
