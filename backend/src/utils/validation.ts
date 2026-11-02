import { body, validationResult } from "express-validator";

// Validation middleware
export const validate = (req: any, res: any, next: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const firstError = errors.array()[0] as { msg?: string } | undefined;
    return res.status(400).json({
      success: false,
      message: firstError?.msg || "Validation failed",
      errors: errors.array(),
    });
  }
  next();
};

// User validation rules
export const userValidationRules = () => {
  return [
    body("name")
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage("Name must be between 2 and 50 characters"),
    body("email")
      .isEmail()
      .normalizeEmail()
      .withMessage("Please provide a valid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ];
};

// Blog validation rules
export const blogValidationRules = () => {
  return [
    body("title")
      .trim()
      .isLength({ min: 5, max: 200 })
      .withMessage("Title must be between 5 and 200 characters"),
    body("content")
      .trim()
      .isLength({ min: 10 })
      .withMessage("Content must be at least 10 characters long"),
    body("excerpt")
      .trim()
      .isLength({ min: 10, max: 300 })
      .withMessage("Excerpt must be between 10 and 300 characters"),
    body("author").trim().notEmpty().withMessage("Author is required"),
    body("category").trim().notEmpty().withMessage("Category is required"),
    body("featuredImage")
      .trim()
      .notEmpty()
      .withMessage("Featured image is required"),
  ];
};

// Contact validation rules
export const contactValidationRules = () => {
  return [
    body("name")
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage("Name must be between 2 and 100 characters"),
    body("email")
      .isEmail()
      .normalizeEmail()
      .withMessage("Please provide a valid email"),
    body("phone").trim().notEmpty().withMessage("Phone number is required"),
    body("subject")
      .trim()
      .isLength({ min: 2, max: 200 })
      .withMessage("Subject must be between 2 and 200 characters"),
    body("message")
      .trim()
      .isLength({ min: 2, max: 2000 })
      .withMessage("Message must be between 2 and 2000 characters"),
    body("preferredDate")
      .trim()
      .matches(/^\d{4}-\d{2}-\d{2}$/)
      .withMessage("Preferred date must be in YYYY-MM-DD format"),
    body("preferredTime")
      .trim()
      .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
      .withMessage("Preferred time must be in HH:mm format"),
    body("location")
      .optional()
      .trim()
      .isLength({ min: 2, max: 150 })
      .withMessage("Location must be valid"),
    body("preferredLocation")
      .optional()
      .trim()
      .isLength({ min: 2, max: 150 })
      .withMessage("Preferred location must be valid"),
    body("preferredMode")
      .optional()
      .trim()
      .isLength({ min: 2, max: 150 })
      .withMessage("Preferred mode must be valid"),
    body().custom((value) => {
      const locationValue =
        value?.location ?? value?.preferredLocation ?? value?.preferredMode;
      if (!locationValue) {
        throw new Error("Location is required");
      }
      return true;
    }),
  ];
};

export const enquiryValidationRules = () => {
  return [
    body("fname")
      .optional()
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage("Name must be between 2 and 100 characters"),
    body("name")
      .optional()
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage("Name must be between 2 and 100 characters"),
    body("email")
      .isEmail()
      .normalizeEmail()
      .withMessage("Please provide a valid email"),
    body("phone").trim().notEmpty().withMessage("Phone number is required"),
    body("company")
      .trim()
      .isLength({ min: 2, max: 150 })
      .withMessage("Company is required"),
    body("city")
      .optional({ values: "falsy" })
      .trim()
      .isLength({ min: 2, max: 120 })
      .withMessage("City must be valid"),
    body("message")
      .trim()
      .isLength({ min: 2, max: 2000 })
      .withMessage("Message must be between 2 and 2000 characters"),
    body("preferredDate")
      .trim()
      .matches(/^\d{4}-\d{2}-\d{2}$/)
      .withMessage("Preferred date must be in YYYY-MM-DD format"),
    body("preferredTime")
      .trim()
      .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
      .withMessage("Preferred time must be in HH:mm format"),
    body("location")
      .optional()
      .trim()
      .isLength({ min: 2, max: 150 })
      .withMessage("Location must be valid"),
    body("preferredLocation")
      .optional()
      .trim()
      .isLength({ min: 2, max: 150 })
      .withMessage("Preferred location must be valid"),
    body("preferredMode")
      .optional()
      .trim()
      .isLength({ min: 2, max: 150 })
      .withMessage("Preferred mode must be valid"),
    body().custom((value) => {
      const fullName = value?.fname ?? value?.name;
      if (!fullName) {
        throw new Error("Name is required");
      }
      const locationValue =
        value?.location ?? value?.preferredLocation ?? value?.preferredMode;
      if (!locationValue) {
        throw new Error("Location is required");
      }
      return true;
    }),
  ];
};

// Service validation rules
export const serviceValidationRules = () => {
  return [
    body("title")
      .trim()
      .isLength({ min: 5, max: 100 })
      .withMessage("Title must be between 5 and 100 characters"),
    body("description")
      .trim()
      .isLength({ min: 10 })
      .withMessage("Description must be at least 10 characters long"),
    body("shortDescription")
      .trim()
      .isLength({ min: 10, max: 300 })
      .withMessage("Short description must be between 10 and 300 characters"),
    body("category").trim().notEmpty().withMessage("Category is required"),
    body("icon").trim().notEmpty().withMessage("Icon is required"),
    body("image").trim().notEmpty().withMessage("Image is required"),
  ];
};

// Video validation rules
export const videoValidationRules = () => {
  return [
    body("title")
      .trim()
      .isLength({ min: 5, max: 200 })
      .withMessage("Title must be between 5 and 200 characters"),
    body("description")
      .trim()
      .isLength({ min: 10 })
      .withMessage("Description must be at least 10 characters long"),
    body("videoUrl").trim().notEmpty().withMessage("Video URL is required"),
    body("thumbnail").trim().notEmpty().withMessage("Thumbnail is required"),
    body("category").trim().notEmpty().withMessage("Category is required"),
  ];
};

// Testimonial validation rules
export const testimonialValidationRules = () => {
  return [
    body("clientName").trim().notEmpty().withMessage("Client name is required"),
    body("clientPosition")
      .trim()
      .notEmpty()
      .withMessage("Client position is required"),
    body("company").trim().notEmpty().withMessage("Company name is required"),
    body("companyLogo")
      .trim()
      .notEmpty()
      .withMessage("Company logo is required"),
    body("content")
      .trim()
      .isLength({ min: 10, max: 1000 })
      .withMessage("Content must be between 10 and 1000 characters"),
    body("rating")
      .isInt({ min: 1, max: 5 })
      .withMessage("Rating must be between 1 and 5"),
    body("image").trim().notEmpty().withMessage("Image is required"),
    body("category").trim().notEmpty().withMessage("Category is required"),
  ];
};

// Client validation rules
export const clientValidationRules = () => {
  return [
    body("name").trim().notEmpty().withMessage("Client name is required"),
    body("logo").trim().notEmpty().withMessage("Client logo is required"),
    body("description")
      .trim()
      .isLength({ min: 10 })
      .withMessage("Description must be at least 10 characters long"),
    body("website")
      .trim()
      .isURL()
      .withMessage("Please provide a valid website URL"),
    body("industry").trim().notEmpty().withMessage("Industry is required"),
    body("projectDetails")
      .trim()
      .isLength({ min: 10 })
      .withMessage("Project details must be at least 10 characters long"),
  ];
};

// Career validation rules
export const careerValidationRules = () => {
  return [
    body("position")
      .trim()
      .notEmpty()
      .withMessage("Position title is required"),
    body("department").trim().notEmpty().withMessage("Department is required"),
    body("location").trim().notEmpty().withMessage("Location is required"),
    body("type")
      .isIn(["full-time", "part-time", "contract", "internship"])
      .withMessage("Invalid employment type"),
    body("experience")
      .trim()
      .notEmpty()
      .withMessage("Experience requirement is required"),
    body("salary")
      .trim()
      .notEmpty()
      .withMessage("Salary information is required"),
    body("description")
      .trim()
      .isLength({ min: 10 })
      .withMessage("Job description must be at least 10 characters long"),
  ];
};
