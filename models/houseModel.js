const mongoose = require('mongoose');
const slugify = require('slugify');

const houseSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    unique: true,
    required: [true, 'A house must have a title'],
    maxlength: [80, 'A house title must have less or equal then 80 characters'],
    minlength: [10, 'A house title must have more or equal then 10 characters'],
  },
  slug: String,
  availability: {
    type: Number,
    required: [true, 'A house must have availability status'],
  },
  carpetArea: {
    type: Number, //In sq. feet
    required: [true, 'A house must have carpet/plot area'],
  },
  propertyType: {
    type: String,
    enum: {
      values: ['Apartment', 'Residential Apartment', 'Flat', '..'],
    },
  },
  availableFor: {
    type: String,
    enum: {
      values: ['All', 'Family', 'Bachelors'],
    },
  },
  maxTenant: {
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
    type: String,
    trim: true,
  },
  postedOn: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  constructionYear: {
    type: Number,
    required: [true, 'A property must have a contruction date'],
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
});

const House = mongoose.model('houses', houseSchema);

module.exports = House;
