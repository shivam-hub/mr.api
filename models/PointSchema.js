const PointSchema = {
    type : {
        type : String,
        enum : ['Point'],
        default: 'Point'
    },
    coordinates : {
        type :[Number],
        default : [0,0]
    }
};

module.exports = PointSchema;