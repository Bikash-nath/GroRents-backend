class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    console.log('queryObj-1', queryObj);
    excludedFields.forEach((el) => delete queryObj[el]);
    console.log('queryObj-2', queryObj);
    const queryStr = JSON.stringify(queryObj);
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  limitFields() {
    const fields = '-id -__v';
    // 'houseNo city title carpetArea maxTenants availableFor price deposit verified furnishing availability address imageCover bedroomsCount bathroomsCount';
    this.query = this.query.select(fields);

    return this;
  }
}
module.exports = APIFeatures;
