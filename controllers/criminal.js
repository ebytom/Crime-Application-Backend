const { catchAsyncError } = require('../middleware/catchAsyncError');
const ErrorHandler = require('../middleware/errorHandlers');
const criminalModel = require('../models/criminal-model');

exports.postCriminal = catchAsyncError(async (req, res, next) => {
    console.log(req.body)
    const criminal = await criminalModel.create(req.body);

    if (!criminal) {
        return next(new ErrorHandler("Error, could not save internal defects", 401));
    }

    res.status(201).json({
        success: true,
        message: "criminal details added successfully"
    });
});

exports.getCriminal = catchAsyncError(async (req, res, next) => {
    const criminal = await criminalModel.findById(req.params.id);

    if (!criminal) {
        return next(new ErrorHandler("Internal defect not found", 400));
    }

    res.status(200).json({
        success: true,
        criminal
    });
});

exports.getAllCriminals = catchAsyncError(async (req, res, next) => {
    try {
        const criminals = await criminalModel.find()

        if (req.body.searchVal) {
            criminals = criminals.filter(criminal => criminal.name.startsWith(req.body.searchVal))
        }

        return res.status(200).json({
            criminals: criminals
        })
    }
    catch {
        return res.status(500).json({
            error: error,
            msg: "error"
        });
    }
});

exports.updateCriminal = catchAsyncError(async (req, res, next) => {
    const criminal = await criminalModel.findById(req.params.id);

    if (!criminal) {
        return next(new ErrorHandler("Internal defect not found", 400));
    }

    const result = await criminalModel.findByIdAndUpdate(req.params.id, req.body, {
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

exports.deleteCriminal = catchAsyncError(async (req, res, next) => {
    const criminal = await criminalModel.findById(req.params.id);

    if (!criminal) {
        return next(new ErrorHandler("Internal defect not found", 400));
    }

    const result = await criminalModel.findByIdAndDelete(req.params.id);

    res.status(202).json({
        success: true,
        message: "Deleted succesfully"
    });
});