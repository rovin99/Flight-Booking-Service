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
    async get(data, transaction) {
        const response = await booking.findByPk(data, {transaction: transaction});
        if(!response) {
            throw new AppError('Not able to fund the resource', StatusCodes.NOT_FOUND);
        }
        return response;
    }

    async update(id, data, transaction) { // data -> {col: value, ....}
        const response = await booking.update(data, {
            where: {
                id: id
            }
        }, {transaction: transaction});
        return response;
    }

    async cancelOldBooking(id, transaction) {

        console.log("in repo");
        const response = await booking.update({status: CANCELLED},{
            where: {
                [Op.and]: [
                    {
                        createdAt: {
                            [Op.lt]: timestamp
                        }
                    }, 
                    {
                        status: {
                            [Op.ne]: BOOKED
                        }
                    },
                    {
                        status: {
                            [Op.ne]: CANCELLED
                        }
                    }
                ]
                
            }
        });
        return response;
    }
};

module.exports = BookingRepository;