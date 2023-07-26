const { catchAsyncError } = require('../middleware/catchAsyncError');
const ErrorHandler = require('../middleware/errorHandlers');
const crimeModel = require('../models/crime-model');

exports.postCrime = catchAsyncError(async (req, res, next) => {
    const crime = await crimeModel.create(req.body);

    if (!crime) {
        return next(new ErrorHandler("Error, could not save internal defects", 401));
    }
    
    res.status(201).json({
        success: true,
        message: "crime details added successfully"
    });
});

exports.getCrime = catchAsyncError(async (req, res, next) => {
    const crime = await crimeModel.findById(req.params.id);

    if (!crime) {
        return next(new ErrorHandler("Internal defect not found", 400));
    }

    res.status(200).json({ 
        success: true, 
        crime 
    });
});

exports.getAllCrimes = catchAsyncError(async (req, res, next) => {
    try {
        const crimes = await crimeModel.find()

        return res.status(200).json({
            crimes: crimes
        })
    }
    catch {
        return res.status(500).json({
            error: error,
            msg: "error"
        });
    }
});

exports.updateCrime = catchAsyncError(async (req, res, next) => {
    const crime = await crimeModel.findById(req.params.id);

    if (!crime) {
        return next(new ErrorHandler("Internal defect not found", 400));
    }

    const result = await crimeModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(202).json({ 
        success: true, 
        message: "update succesfully", 
        result 
    });
});

exports.deleteCrime = catchAsyncError(async (req, res, next) => {
    const crime = await crimeModel.findById(req.params.id);

    if (!crime) {
        return next(new ErrorHandler("Internal defect not found", 400));
    }

    const result = await crimeModel.findByIdAndDelete(req.params.id);

    res.status(202).json({ 
        success: true, 
        message: "Deleted succesfully" 
    });
});