const { catchAsyncError } = require('../middleware/catchAsyncError');
const ErrorHandler = require('../middleware/errorHandlers');
const crimeModel = require('../models/crime-model');

exports.postCrime = catchAsyncError(async (req, res, next) => {
    const crime = await crimeModel.create(req.body.crimeData);

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
    const headObject = new ApiFeatureHead(crimeModel, req.query.filtered)
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