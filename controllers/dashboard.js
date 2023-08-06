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

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const criminalsThisMonth = await criminalModel.find({
        criminalId: { $gte: startOfMonth },
    });

    const crimesThisMonth = await crimeModel.find({
        crimeId: { $gte: startOfMonth },
    });

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
        inProgressCases: inProgressCases.length,
        criminalsThisMonth: criminalsThisMonth.length,
        crimesThisMonth: crimesThisMonth.length
    });
});

exports.getCharts = catchAsyncError(async (req, res, next) => {
    const currentDate = new Date();
    const months = [
        "January", "February", "March", "April",
        "May", "June", "July", "August", "September",
        "October", "November", "December"
    ];
    // Get the day, month, year, and day of the week
    const day = currentDate.getDate();
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const dayOfWeek = currentDate.getDay();

    const month1 = await crimeModel.find({
        'dateMetaData.month': month - 4,
        'dateMetaData.year': year,
    });
    const month2 = await crimeModel.find({
        'dateMetaData.month': month - 3,
        'dateMetaData.year': year,
    });
    const month3 = await crimeModel.find({
        'dateMetaData.month': month - 2,
        'dateMetaData.year': year,
    });
    const month4 = await crimeModel.find({
        'dateMetaData.month': month - 1,
        'dateMetaData.year': year,
    });
    const month5 = await crimeModel.find({
        'dateMetaData.month': month,
        'dateMetaData.year': year,
    });

    // -----------------------

    const proMonth1 = await crimeModel.find({
        'dateMetaData.month': month - 4,
        'dateMetaData.year': year,
        status: { $ne: "Closed" }
    });
    const proMonth2 = await crimeModel.find({
        'dateMetaData.month': month - 3,
        'dateMetaData.year': year,
        status: { $ne: "Closed" }
    });
    const proMonth3 = await crimeModel.find({
        'dateMetaData.month': month - 2,
        'dateMetaData.year': year,
        status: { $ne: "Closed" }
    });
    const proMonth4 = await crimeModel.find({
        'dateMetaData.month': month - 1,
        'dateMetaData.year': year,
        status: { $ne: "Closed" }
    });
    const proMonth5 = await crimeModel.find({
        'dateMetaData.month': month,
        'dateMetaData.year': year,
        status: { $ne: "Closed" }
    });

    // ----------------------------


    const year1 = await crimeModel.find({
        'dateMetaData.year': year-4,
    });

    const year2 = await crimeModel.find({
        'dateMetaData.year': year-3,
    })

    const year3 = await crimeModel.find({
        'dateMetaData.year': year-2,
    })

    const year4 = await crimeModel.find({
        'dateMetaData.year': year-1,
    })

    const year5 = await crimeModel.find({
        'dateMetaData.year': year,
    })

    res.status(200).json({
        success: true,
        graph1:{
            key: [month-4, month-3, month-2, month-1, month],
            data: [year1.length, year2.length, year3.length, year4.length, year5.length]
        },
        graph2: {
            key: [months[currentDate.getMonth() - 4], months[currentDate.getMonth() - 3], months[currentDate.getMonth() - 2], months[currentDate.getMonth() - 1], months[currentDate.getMonth()]],
            data: [month1.length, month2.length, month3.length, month4.length, month5.length]
        },
        graph3: {
            key: [months[currentDate.getMonth() - 4], months[currentDate.getMonth() - 3], months[currentDate.getMonth() - 2], months[currentDate.getMonth() - 1], months[currentDate.getMonth()]],
            data: [proMonth1.length, proMonth2.length, proMonth3.length, proMonth4.length, proMonth5.length]
        }
    })


});