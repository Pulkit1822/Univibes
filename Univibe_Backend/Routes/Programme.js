const express = require('express');
const router = express.Router();


const User = require('../Models/UserSchema')
const Programme = require('../Models/ProgrammeSchema')
const Booking = require('../Models/BookingSchema')
const Auditorium = require('../Models/AuditoriumSchema')


const errorHandler = require('../Middlewares/errorMiddleware');
const authTokenHandler = require('../Middlewares/checkAuthToken');
const adminTokenHandler = require('../Middlewares/checkAdminToken');


function createResponse(ok, message, data) {
    return {
        ok,
        message,
        data,
    };
}

router.get('/test', async (req, res) => {
    res.json({
        message: "Programme api is working"
    })
})


// admin access
router.post('/createprogramme', adminTokenHandler, async (req, res, next) => {
    try {
        const { title, description, portraitImgUrl, landscapeImgUrl, theme} = req.body;

        const newProgramme = new Programme({ title, description, portraitImgUrl, landscapeImgUrl,  theme,})
        await newProgramme.save();
        res.status(201).json({
            ok: true,
            message: "Programme added successfully"
        });
    }
    catch (err) {
        next(err); // Pass any errors to the error handling middleware
    }
})

router.post('/createauditorium', adminTokenHandler, async (req, res, next) => {
    try {
        const { username, location, seats, campus, auditoriumType } = req.body;
        const newAuditorium = new Auditorium({
            username,
            location,
            seats,
            campus: campus.toLowerCase(),
            auditoriumType,
            programmeSchedules: []
        });

        await newAuditorium.save();


        res.status(201).json({
            ok: true,
            message: "Auditorium added successfully"
        });
    }
    catch (err) {
        console.log(err);
        next(err); // Pass any errors to the error handling middleware
    }
})
router.post('/addprogrammescheduletoauditorium', adminTokenHandler, async (req, res, next) => {
    console.log("Inside addprogrammescheduletoauditorium")
    try {
        const { auditoriumId, programmeId, showTime, showDate } = req.body;
        const auditorium = await Auditorium.findById(auditoriumId);
        if (!auditorium) {
            return res.status(404).json({
                ok: false,
                message: "Auditorium not found"
            });
        }

        const programme = await Programme.findById(programmeId);
        if (!programme) {
            return res.status(404).json({
                ok: false,
                message: "Programme not found"
            });
        }

        auditorium.programmeSchedules.push({
            programmeId,
            showTime,
            notavailableseats: [],
            showDate
        });

        await auditorium.save();

        res.status(201).json({
            ok: true,
            message: "Programme schedule added successfully"
        });

    }
    catch (err) {
        next(err); // Pass any errors to the error handling middleware
    }
})


// user access
router.post('/bookticket', authTokenHandler, async (req, res, next) => {
    try {
        const { showTime, showDate, programmeId, auditoriumId, seats, totalPrice, paymentId, paymentType } = req.body;
        console.log(req.body);

        // You can create a function to verify payment id

        const auditorium = await Auditorium.findById(auditoriumId);

        if (!auditorium) {
            return res.status(404).json({
                ok: false,
                message: "Theatre not found"
            });
        }



        const programmeSchedule = auditorium.programmeSchedules.find(schedule => {
            console.log(schedule);
            let showDate1 = new Date(schedule.showDate);
            let showDate2 = new Date(showDate);
            if (showDate1.getDay() === showDate2.getDay() &&
                showDate1.getMonth() === showDate2.getMonth() &&
                showDate1.getFullYear() === showDate2.getFullYear() &&
                schedule.showTime === showTime &&
                schedule.programmeId == programmeId) {
                return true;
            }
            return false;
        });

        if (!programmeSchedule) {
            return res.status(404).json({
                ok: false,
                message: "Programme schedule not found"
            });
        }

        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({
                ok: false,
                message: "User not found"
            });
        }
        console.log('before newBooking done');
        const newBooking = new Booking({ userId: req.userId, showTime, showDate, programmeId, auditoriumId, seats, totalPrice, paymentId, paymentType })
        await newBooking.save();
        console.log('newBooking done');



        programmeSchedule.notAvailableSeats.push(...seats);
        await auditorium.save();
        console.log('auditorium saved');

        user.bookings.push(newBooking._id);
        await user.save();
        console.log('user saved');
        res.status(201).json({
            ok: true,
            message: "Booking successful"
        });

    }
    catch (err) {
        next(err); // Pass any errors to the error handling middleware
    }
})


router.get('/programmes', async (req, res, next) => {
    try {
        const programmes = await Programme.find();

        // Return the list of programmes as JSON response
        res.status(200).json({
            ok: true,
            data: programmes,
            message: 'Programmes retrieved successfully'
        });
    }
    catch (err) {
        next(err); // Pass any errors to the error handling middleware
    }
})
router.get('/programmes/:id', async (req, res, next) => {
    try {
        const programmeId = req.params.id;
        const programme = await Programme.findById(programmeId);
        if (!programme) {
            // If the programme is not found, return a 404 Not Found response
            return res.status(404).json({
                ok: false,
                message: 'Programme not found'
            });
        }

        res.status(200).json({
            ok: true,
            data: programme,
            message: 'Programme retrieved successfully'
        });
    }
    catch (err) {
        next(err); // Pass any errors to the error handling middleware
    }
})
router.get('/auditoriumsbycampus/:campus', async (req, res, next) => {
    const campus = req.params.campus.toLowerCase();

    try {
        const auditoriums = await Auditorium.find({ campus });
        if (!auditoriums || auditoriums.length === 0) {
            return res.status(404).json(createResponse(false, 'No auditoriums found in the specified campus', null));
        }

        res.status(200).json(createResponse(true, 'Auditoriums retrieved successfully', auditoriums));
    }
    catch (err) {
        next(err); // Pass any errors to the error handling middleware
    }
});
router.get('/auditoriumsbyprogrammeschedule/:campus/:date/:programmeid', async (req, res, next) => {
    try {
        const campus = req.params.campus.toLowerCase();
        const date = req.params.date;
        const programmeId = req.params.programmeid;

        // Retrieve auditoriums for the specified campus
        const auditoriums = await Auditorium.find({ campus });

        // Check if auditoriums were found
        if (!auditoriums || auditoriums.length === 0) {
            return res.status(404).json(createResponse(false, 'No auditoriums found in the specified campus', null));
        }

        // Filter auditoriums based on the programmeId
        // const filteredAuditoriums = auditoriums.filter(auditorium =>
        //     auditorium.programmeSchedules.some(schedule => schedule.programmeId == programmeId)
        // );


        let temp = []
        // Filter auditoriums based on the showDate
        const filteredAuditoriums = auditoriums.forEach(auditorium => {
            // auditorium 

            auditorium.programmeSchedules.forEach(schedule => {
                let showDate = new Date(schedule.showDate);
                let bodyDate = new Date(date);
                // console.log(showDate , bodyDate);
                if (showDate.getDay() === bodyDate.getDay() &&
                    showDate.getMonth() === bodyDate.getMonth() &&
                    showDate.getFullYear() === bodyDate.getFullYear() &&
                    schedule.programmeId == programmeId) {
                    temp.push(
                        auditorium
                    );
                }
            })
        }
        );

        console.log(temp);

        res.status(200).json(createResponse(true, 'Auditoriums retrieved successfully', temp));

    } catch (err) {
        next(err); // Pass any errors to the error handling middleware
    }
});

router.get('/schedulebyprogramme/:auditoriumid/:date/:programmeid', async (req, res, next) => {
    const auditoriumId = req.params.auditoriumid;
    const date = req.params.date;
    const programmeId = req.params.programmeid;

    const auditorium = await Auditorium.findById(auditoriumId);

    if (!auditorium) {
        return res.status(404).json(createResponse(false, 'Auditorium not found', null));
    }

    const programmeSchedules = auditorium.programmeSchedules.filter(schedule => {
        let showDate = new Date(schedule.showDate);
        let bodyDate = new Date(date);
        if (showDate.getDay() === bodyDate.getDay() &&
            showDate.getMonth() === bodyDate.getMonth() &&
            showDate.getFullYear() === bodyDate.getFullYear() &&
            schedule.programmeId == programmeId) {
            return true;
        }
        return false;
    });
    console.log(programmeSchedules)

    if (!programmeSchedules) {
        return res.status(404).json(createResponse(false, 'Programme schedule not found', null));
    }

    res.status(200).json(createResponse(true, 'Programme schedule retrieved successfully', {
        auditorium,
        programmeSchedulesforDate: programmeSchedules
    }));

});


router.get('/getuserbookings' , authTokenHandler , async (req , res , next) => {
    try {
        const user = await User.findById(req.userId).populate('bookings');
        if(!user){
            return res.status(404).json(createResponse(false, 'User not found', null));
        }

        let bookings = [];
        // user.bookings.forEach(async booking => {
        //     let bookingobj = await Booking.findById(booking._id);
        //     bookings.push(bookingobj);
        // })

        for(let i = 0 ; i < user.bookings.length ; i++){
            let bookingobj = await Booking.findById(user.bookings[i]._id);
            bookings.push(bookingobj);
        }

        res.status(200).json(createResponse(true, 'User bookings retrieved successfully', bookings));
        // res.status(200).json(createResponse(true, 'User bookings retrieved successfully', user.bookings));
    } catch (err) {
        next(err); // Pass any errors to the error handling middleware
    }
})

router.get('/getuserbookings/:id' , authTokenHandler , async (req , res , next) => {
    try {
        const bookingId = req.params.id;
        const booking = await Booking.findById(bookingId);

        if(!booking){
            return res.status(404).json(createResponse(false, 'Booking not found', null));
        }

        res.status(200).json(createResponse(true, 'Booking retrieved successfully', booking));
    } catch (err) {
        next(err); // Pass any errors to the error handling middleware
    }
})



router.use(errorHandler)

module.exports = router;
