// src/controllers/trainController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const addTrain = async (req, res) => {
  try {
    const { name, source, destination, totalSeats } = req.body;
    
    const existingTrain = await prisma.train.findFirst({
      where: { name, source, destination }
    });

    if (existingTrain) {
      return res.status(400).json({ error: 'Train already exists' });
    }

    const train = await prisma.train.create({
      data: {
        name,
        source,
        destination,
        totalSeats,
        availableSeats: totalSeats
      }
    });

    res.status(201).json({ 
      message: 'Train added successfully', 
      trainId: train.id 
    });
  } catch (error) {
    res.status(500).json({ error: 'Train addition failed' });
  }
};

const getTrainAvailability = async (req, res) => {
  try {
    const { source, destination } = req.query;
    
    const trains = await prisma.train.findMany({
      where: { 
        source, 
        destination,
        availableSeats: { gt: 0 }
      },
      select: {
        id: true,
        name: true,
        availableSeats: true
      }
    });

    res.json(trains);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch train availability' });
  }
};

module.exports = { addTrain, getTrainAvailability };