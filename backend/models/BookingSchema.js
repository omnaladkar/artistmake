import mongoose from "mongoose";

let Booking;

try {
    // Check if the model already exists
    Booking = mongoose.model("Booking");
} catch (error) {
    // If it doesn't exist, define the model
    const bookingSchema = new mongoose.Schema({
        doctor: {
            type: mongoose.Types.ObjectId,
            ref: "Doctor",
            required: true,
        },
        user: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true,
        },
        ticketPrice: { type: String, required: true },
        appointmentDate: {
            type: Date,
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "approved", "cancelled"],
            default: "pending",
        },
        isPaid: {
            type: Boolean,
            default: true,
        },
    }, { timestamps: true });

    Booking = mongoose.model("Booking", bookingSchema);
}

export default Booking;

