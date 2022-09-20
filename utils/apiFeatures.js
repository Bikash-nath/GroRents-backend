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

  limitFields() {
    const fields =
      'title carpetArea maxTenants availableFor price deposit verified furnishing availability address imageCover bedroomsCount bathroomsCount';
    this.query = this.query.select(fields);

    return this;
  }
}
module.exports = APIFeatures;
