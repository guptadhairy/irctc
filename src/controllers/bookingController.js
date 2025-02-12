const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const bookSeat = async (req, res) => {
  try {
    const { trainId } = req.body;
    const userId = req.user.id;

    const booking = await prisma.$transaction(async (tx) => {
      
      const train = await tx.train.findUnique({
        where: { id: trainId },
        select: {
          id: true,
          availableSeats: true,
          totalSeats: true,
          name: true,
          source: true,
          destination: true
        }
      }); 

      
      if (!train) {
        throw new Error('Train not found');
      }

      
      if (train.availableSeats <= 0) {
        throw new Error('No seats available');
      }

      
      const existingBooking = await tx.booking.findFirst({
        where: { 
          userId, 
          trainId,
          status: 'CONFIRMED' 
        }
      });

      if (existingBooking) {
        throw new Error('You have already booked a seat on this train');
      }

    

      
      const newBooking = await tx.booking.create({
        data: {
          userId,
          trainId,
          seatNumber: train.totalSeats - train.availableSeats + 1,
          status: 'CONFIRMED'
        }
      });

      
      await tx.train.update({
        where: { id: trainId },
        data: { 
          availableSeats: { decrement: 1 } 
        }
      });

      return {
        ...newBooking,
        trainName: train.name,
        source: train.source,
        destination: train.destination
      };
    }, {
      isolationLevel: 'Serializable'
    });

    res.status(201).json({
      message: 'Seat booked successfully',
      booking: {
        id: booking.id,
        trainName: booking.trainName,
        source: booking.source,
        destination: booking.destination,
        seatNumber: booking.seatNumber
      }
    });
  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({ 
      error: 'Seat booking failed', 
      message: error.message 
    });
  }
};

const getBookingDetails = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const bookings = await prisma.booking.findMany({
      where: { userId },
      include: {
        train: {
          select: {
            name: true,
            source: true,
            destination: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json({
      totalBookings: bookings.length,
      bookings: bookings.map(booking => ({
        id: booking.id,
        trainName: booking.train.name,
        source: booking.train.source,
        destination: booking.train.destination,
        seatNumber: booking.seatNumber,
        status: booking.status,
        bookingDate: booking.createdAt
      }))
    });
  } catch (error) {
    console.error('Booking details error:', error);
    res.status(500).json({ 
      error: 'Failed to retrieve booking details', 
      message: error.message 
    });
  }
};

module.exports = { bookSeat, getBookingDetails };