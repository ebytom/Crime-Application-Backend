const { catchAsyncError } = require('../middleware/catchAsyncError');
const ErrorHandler = require('../middleware/errorHandlers');
const criminalModel = require('../models/criminal-model');

exports.postCriminal = catchAsyncError(async (req, res, next) => {
    console.log(req.body)
    const criminal = await criminalModel.create(req.body.criminalData);


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
    const headObject = new ApiFeatureHead(criminalModel, req.query.filtered)
        .filter()
        .pagination(req.query.currentPage, req.query.docsPerPage);

    const headCheckList = await headObject.query;

    if (headCheckList.length === 0) {
        return next(new ErrorHandler("could not find check list", 404));
    }

    var totalDoc = await BreakDown.countDocuments(headObject.newQueryStr);

    var totalCount = totalDoc / req.query.docsPerPage

    res.status(201).json({ 
        success: true, 
        headCheckList, 
        totalCount: Math.ceil(totalCount) 
    });
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