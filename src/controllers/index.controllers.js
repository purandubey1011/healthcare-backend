const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler"); // Fixed typo
const contactSchema = require("../models/Contactform.schema.js");
const Applynow = require("../models/Applyform.schema.js");
const Readytoapply = require("../models/Readytoapply.schema.js");
// tasting
exports.homepage = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "Welcome to falverra",
  });
});

// contact form
exports.contactForm = catchAsyncErrors(async (req, res, next) => {
  const { fullName, email, phone, message, course } = req.body;
  if (!fullName || !email || !phone || !message || !course) {
    return next(new ErrorHandler("Please fill all the fields", 400));
  }

  const contact = await contactSchema.create({
    fullName,
    email,
    phone,
    message,
    course,
  });
  if (!contact) {
    return next(new ErrorHandler("Contact form not created", 400));
  }
  await contact.save();

  res.status(200).json({
    success: true,
    message: "contact form",
  });
});

// applynow form
exports.applynow = catchAsyncErrors(async (req, res, next) => {
  const { name, email, phone, course } = req.body;
  if (!name || !email || !phone  || !course) {
    return next(new ErrorHandler("Please fill all the fields", 400));
  }

  const applynow = await Applynow.create({
    name,
    email,
    phone,
    course,
  });
  
  await applynow.save();

  res.status(200).json({
    success: true,
    message: "applynow form",
  });
});
// readytoapply form
exports.readytoapply = catchAsyncErrors(async (req, res, next) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone ) {
    return next(new ErrorHandler("Please fill all the fields", 400));
  }

  const readytoapply = await Readytoapply.create({
    name,
    email,
    phone,
  });
  
  await readytoapply.save();

  res.status(200).json({
    success: true,
    message: "readytoapply form",
  });
});
