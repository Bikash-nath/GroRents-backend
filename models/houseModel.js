const mongoose = require('mongoose');
const slugify = require('slugify');

const houseSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    unique: true,
    required: [true, 'A house must have a title'],
    maxlength: [80, 'A house title must have atmost 80 characters'],
    minlength: [10, 'A house title must have atleast 10 characters'],
  },
  slug: String,
  carpetArea: {
    type: Number, //In sq. feet
    required: [true, 'A house must have carpet/plot area'],
  },
  propertyType: {
    type: String,
    enum: {
      values: ['Apartment', 'Residential Apartment', 'Flat', 'Commercial Flat', 'House', 'Studio'],
    },
  },
  availableFor: {
    type: String,
    enum: {
      values: ['All', 'Family', 'Bachelors'],
    },
  },
  maxTenants: {
    type: Number,
    required: [true, 'A house must have a maximum tenant size'],
  },
  price: {
    type: Number,
    required: [true, 'A house must have a Rental Price'],
  },
  deposit: {
    type: Number,
    default: 0,
  },
  negotiable: {
    type: Boolean,
    default: false,
  },
  address: {
        type: mongoose.Schema.ObjectId,
        ref: 'Address'
  },
  location: {
    // GeoJSON
    type: {
      type: String,
      default: 'Point',
      enum: ['Point']
    },
    coordinates: [Number],
  },
  availability: {
    type: Date,
    required: [true, 'A house must have availability date'],
  },
  postedOn: {
    type: Date,
    default: Date.now(),
  },
  constructionYear: {
    type: Number,
    required: [true, 'A property must have a contruction date'],
  },
  verified: {
    type: Boolean,
    default: false,
  },
  furnishing: {
    type: String,
    enum: {
      values: ['Well-Furnished', 'Furnished', 'Semi-Furnished', 'Unfurnished'],
    },
  },
  flooring: {
    type: String,
    enum: {
      values: ['Tiles', 'Granite', 'Stone'],
    },
  },
  floorNo: {
    type: String,
  },
  facing: {
    type: String,
    enum: {
      values: [
        'North',
        'East',
        'South',
        'West',
        'North-East',
        'South-East',
        'South-West',
        'North-West',
      ],
    },
  },
  imageCover: {
    type: String,
    required: [true, 'A house must have a cover image'],
  },
  images: [String],
  bedroomsCount: {
    type: Number,
  },
  bathroomsCount: {
    type: Number,
  },
  balconyCount: {
    type: Number,
  },
  additionalRooms: [String],
  coveredParking: {
    type: String,
    enum: {
      values: ['Car & Bike', 'Bike', 'Car', 'None'],
    },
  },
  houseAmenity: [String],
  societyAmenity: [String],

  nonVeg: {
    type: Boolean,
    default: true,
  },
  pets: {
    type: Boolean,
    default: true,
  },
  smoking: {
    type: Boolean,
    default: true,
  },
  maintenanceFee: {
    type: Number,
    default: 0,
  },
  brokerageFee: {
    type: Number,
    default: 0,
  },
  chargesIncluded: {
    type: String,
    enum: {
      values: ['Water', 'Electricity', 'Electricity & Water'],
    },
  },
  monthsOfNotice: {
    type: Number,
    default: 3,
  },
  agreementDuration: {
    type: Number,
    default: 11,
  },
  description: {
    type: String,
    trim: true,
  },
  nearbyPlaces: [String],
  owner:     {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    }
  // {
  //   toJSON: { virtuals: true },
  //   toObject: { virtuals: true }
  // }
});

const House = mongoose.model('House', houseSchema);
module.exports = House;

houseSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'owner',
    select: '-__v -passwordChangedAt'
  });

  next();
});