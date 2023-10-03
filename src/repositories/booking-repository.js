const CrudRepository = require('./crud-repository');
const { booking } = require('../models');
const { StatusCodes } = require('http-status-codes');
class BookingRepository extends CrudRepository {

    constructor(){
        super(booking);
    }
    async createBooking(data, transaction) {
        const response = await booking.create(data, {transaction: transaction});
        return response;
    } 
};

module.exports = BookingRepository;