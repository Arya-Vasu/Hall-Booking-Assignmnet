// All the DB commands are here in this file.

import { client } from "./index.js";

export {
  checkingOutOfCustomer,
  vacatingRoomAfterCheckOut,
  getAllcustomersInRooms,
  updatingRoomOnBooking,
  creatingCustomerDetailsOnBooking,
  getAllAvailableRooms,
  viewingRoomById,
  getAllRooms,
  creatingRoom,
};

async function checkingOutOfCustomer(id) {
  return await client
    .db("Hall-Booking")
    .collection("Customers")
    .updateOne(
      {
        Room: id,
        Status: "IN",
      },
      {
        $set: {
          Status: "OUT",
        },
      }
    );
}

async function vacatingRoomAfterCheckOut(id) {
  return await client
    .db("Hall-Booking")
    .collection("Rooms")
    .updateOne(
      { Room_No: id },
      {
        $set: {
          Status: "Available",
          Customer_Name: "",
          Booked_On: "",
          Check_In: "",
          Check_Out: "",
        },
      }
    );
}

async function getAllcustomersInRooms() {
  return await client
    .db("Hall-Booking")
    .collection("Customers")
    .find({ Status: "IN" })
    .toArray();
}

async function updatingRoomOnBooking(id, req, date) {
  return await client
    .db("Hall-Booking")
    .collection("Rooms")
    .updateOne(
      { Room_No: id },
      {
        $set: {
          Status: "Booked",
          Customer_Name: req.body.Customer_Name,
          Booked_On: date.toDateString(),
          Check_In: req.body.Check_In,
          Check_Out: "",
        },
      }
    );
}

async function creatingCustomerDetailsOnBooking(customerDetails) {
  return await client
    .db("Hall-Booking")
    .collection("Customers")
    .insertOne(customerDetails);
}

async function getAllAvailableRooms() {
  return await client
    .db("Hall-Booking")
    .collection("Rooms")
    .find({ Status: "Available" })
    .toArray();
}

async function viewingRoomById(id) {
  return await client
    .db("Hall-Booking")
    .collection("Rooms")
    .findOne({ Room_No: id });
}

async function getAllRooms() {
  return await client.db("Hall-Booking").collection("Rooms").find({}).toArray();
}

async function creatingRoom(newRooms) {
  return await client
    .db("Hall-Booking")
    .collection("Rooms")
    .insertMany(newRooms);
}
