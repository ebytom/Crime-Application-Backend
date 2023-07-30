const { catchAsyncError } = require('../middleware/catchAsyncError');
const ErrorHandler = require('../middleware/errorHandlers');
const crimeModel = require('../models/crime-model');
const criminalModel = require('../models/criminal-model');

exports.getFeeds = catchAsyncError(async (req, res, next) => {

    const currentDate = new Date()
    const yesterday = currentDate.setDate(currentDate.getDate() - 1)
    const yesterdaysDate = currentDate.toISOString().split("T")[0] + "T00:00:00.000+00:00"

    const todaysCrimes = await crimeModel.find({
        date: new Date().toISOString().split("T")[0] + "T00:00:00.000+00:00" // Today's Crimes only!
    })

    const yesterdaysCrimes = await crimeModel.find({
        date: yesterdaysDate
    })

    const todaysCrimesIncrease = ((todaysCrimes.length - yesterdaysCrimes.length) / (yesterdaysCrimes.length)) * 100

    const totalCrimes = await crimeModel.find()

    const totalCriminals = await criminalModel.find()

    const unClosedCases = await crimeModel.find({
        status: { $ne: 'Closed' }
    })

    const inProgressCases = await crimeModel.find({
        status: 'Inprogress'
    })


    if (!todaysCrimes || !totalCrimes || !totalCriminals || !unClosedCases) {
        return next(new ErrorHandler("feeds not found", 400));
    }

    res.status(200).json({
        success: true,
        todaysCrimes: todaysCrimes.length,
        todaysCrimesIncrease: todaysCrimesIncrease,
        totalCrimes: totalCrimes.length,
        totalCriminals: totalCriminals.length,
        unClosedCases: unClosedCases.length,
        inProgressCases: inProgressCases.length
    });
});

exports.getSubFeeds = catchAsyncError(async (req, res, next) => {

    const crimes = await crimeModel.find()

    const crimesThisMonth = crimes.filter((crime) => {
        crime.date
    });

    const totalCrimes = await crimeModel.find()

    const totalCriminals = await criminalModel.find()

    const unClosedCases = await crimeModel.find({
        status: { $ne: 'Closed' }
    })


    if (!todaysCrimes || !totalCrimes || !totalCriminals || !unClosedCases) {
        return next(new ErrorHandler("feeds not found", 400));
    }

    res.status(200).json({
        success: true,
        todaysCrimes: todaysCrimes.length,
        totalCrimes: totalCrimes.length,
        totalCriminals: totalCriminals.length,
        unClosedCases: unClosedCases.length
    });
});