import express from "express";
import {
  viewingRoomById,
  getAllRooms,
  checkingOutOfCustomer,
  vacatingRoomAfterCheckOut,
  getAllcustomersInRooms,
  updatingRoomOnBooking,
  creatingCustomerDetailsOnBooking,
  getAllAvailableRooms,
  creatingRoom,
} from "../helper.js";

const router = express.Router();

// Get All Rooms -

router.get("/rooms", async function (req, res) {
  const rooms = await getAllRooms();
  rooms
    ? res.send(rooms)
    : res
        .status(404)
        .send("Oops! Something went wrong. Please try again later.");
});

// View Room by id -

router.get("/rooms/:id", async function (req, res) {
  const { id } = req.params;
  const room = await viewingRoomById(id);
  room
    ? res.send(room)
    : res.status(404).send("Oops! Something went wrong. Please try again.");
});

// Creating the Room -

router.post("/create-rooms", async function (req, res) {
  const newRooms = req.body;
  const result = await creatingRoom(newRooms);
  res.send(result);
});

// Listing all Available Rooms -

router.get("/available-rooms", async function (req, res) {
  const result = await getAllAvailableRooms();
  result
    ? res.send(result)
    : res.status(404).send("Sorry, No Available Rooms founds!!!");
});

// Room Booking -

router.post("/book/:id", async function (req, res) {
  const { id } = req.params;
  const customerDetails = req.body;
  customerDetails.Room = id;
  customerDetails.Status = "IN";
  const result = await creatingCustomerDetailsOnBooking(customerDetails);
  res.send(result);
});

router.put("/book/:id", async function (req, res) {
  const { id } = req.params;
  const date = new Date();
  const roomUpdate = await updatingRoomOnBooking(id, req, date);
  res.send(roomUpdate);
});

// Listing all the Customers in the Hotel -

router.get("/customers", async function (req, res) {
  const result = await getAllcustomersInRooms();
  result
    ? res.send(result)
    : res.status(404).send("Sorry, No customers available.");
});

// Making Rooms Available after checkout -

router.put("/checkout/:id", async function (req, res) {
  const { id } = req.params;
  const result = await vacatingRoomAfterCheckOut(id);
  const customerUpdate = await checkingOutOfCustomer(id);
  res.send(result);
  res.send(customerUpdate);
});

export const roomsRouter = router;