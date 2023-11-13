import Booking from '../models/BookingSchema.js';

// Controller for getting all bookings
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('doctor').populate('user');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller for getting a specific booking by ID
export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('doctor').populate('user');
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller for creating a new booking
export const createBooking = async (req, res) => {
  try {
    const { doctor, user, ticketPrice, appointmentDate } = req.body;
    
    // You can perform additional validation here if needed

    const newBooking = new Booking({
      doctor,
      user,
      ticketPrice,
      appointmentDate,
      status: 'pending', // Default status
      isPaid: false,      // Default isPaid value
    });

    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
