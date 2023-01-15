class APIQuery {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    search(fields) {
        const options = {
            page: this.query?.page || 1,
            limit: this.query?.limit || 6,
            collation: {
                locale: 'en',
            },
            sort: { createdAt: -1 },
            

        }
        const keyword = this.queryString.keyword ? {
            $or: fields.map(field => ({
                [field]: {
                    $regex: this.queryString.keyword,
                }
            }))
        } : {}
        this.query = this.query.paginate(keyword, options)
        return this;
    }

}