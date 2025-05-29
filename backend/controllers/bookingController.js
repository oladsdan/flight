import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


//create a booking
export const createBooking = async (req, res) => {

    //we check if the user is authenticated from the req.user midddleware
    const {id} = req.user;
    
    //check id the id is valid and the user exists
    const user = await prisma.user.findUnique({
        where: {
            id: id,
        },
    });
   
    if (!user) {
        return res.status(404).json({
            message: "User not found",
        });
    }
    

    const {flightNumber, airline, departure, arrival, travelDate, returnDate, stopCount,  price,} = req.body;

    //we create the bookings
    const booking = await prisma.Bookings.create({
        data: {
            flightNumber,
            departure,
            arrival,
            travelDate,
            returnDate,
            price,
            airline,
            stopCount,
            userId: id,
        },
    });
    if (!booking) {
        return res.status(500).json({
            message: "Unable to create booking",
        });
    }

    res.status(201).json({
        "suuccess": true,
        "message": "Booking created successfully",

    });


}

//get all bookings
export const getAllBookings = async (req, res) => {
    const {id} = req.user;

    //check if the user exists
    const user = await prisma.user.findUnique({
        where: {
            id: id,
        },
    });
   
    if (!user) {
        return res.status(404).json({
            message: "User not found",
        });
    }

    //get all bookings
    const bookings = await prisma.Bookings.findMany({
        where: {
            userId: id,
        },
    });

    if (!bookings) {
        return res.status(500).json({
            message: "Unable to get bookings",
        });
    }

    res.status(200).json({
        "suuccess": true,
        "message": "Bookings retrieved successfully",
        bookings,
    });

}

//delete a booking
export const deleteBooking = async (req, res) => {
    const {id} = req.user;
    const {bookingId} = req.params;

    //check if the user exists
    const user = await prisma.user.findUnique({
        where: {
            id: id,
        },
    });
   
    if (!user) {
        return res.status(404).json({
            message: "User not found",
        });
    }

    //check if the booking exists
    const booking = await prisma.Bookings.findUnique({
        where: {
            id: bookingId,
        },
    });

    if (!booking) {
        return res.status(404).json({
            message: "Booking not found",
        });
    }

    //delete the booking
    await prisma.Bookings.delete({
        where: {
            id: bookingId,
        },
    });

    res.status(200).json({
        "suuccess": true,
        "message": "Booking deleted successfully",
    });
}