const {User} = require('./models/user');
const {UserRole} = require('./models/user_role');
const {Company} = require('./models/company');
const {Service} = require('./models/service');
const {Engine} = require('./models/engine');
const {BoatType} = require('./models/boat_type');
const {BoatSubtype} = require('./models/boat_subtype');
const {Boat} = require('./models/boat');
const {Job} = require('./models/job');
const {Proposal} = require('./models/proposal');
const {Conversation} = require('./models/conversation');

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Simple class to seed the database
// Use this when the db is empty
// Cant run this script if it has already run unless the database is wiped

async function seedDb(){
    // Init mongooseDb
    mongoose.connect('mongodb://localhost/test')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...'));

    const role1 = new UserRole({
        role: 'User',
        created_at: Date.now(),
        updated_at: Date.now()
    });

    const role2 = new UserRole({
        role: 'Admin',
        created_at: Date.now(),
        updated_at: Date.now()
    });

    await role1.save();
    await role2.save();

    const salt = await bcrypt.genSalt(10);
    const pw = await bcrypt.hash('12345', salt);

    const user1 = new User({
        profile_pic: 'some url',
        name: 'User1',
        email: 'user1@user.user',
        user_role_id: role1._id,
        password: pw,
        phone_number: '12345678',
        address: 'a valid address',
        zip_code: '2000',
        city: 'city',
        created_at: Date.now(),
        updated_at: Date.now()
    });
    const user2 = new User({
        profile_pic: 'some url',
        name: 'User2',
        email: 'user2@user.user',
        user_role_id: role1._id,
        password: pw,
        phone_number: '12345678',
        address: 'a valid address',
        zip_code: '2000',
        city: 'city',
        created_at: Date.now(),
        updated_at: Date.now()
    });
    const user3 = new User({
        profile_pic: 'some url',
        name: 'User3',
        email: 'user3@user.user',
        user_role_id: role1._id,
        password: pw,
        phone_number: '12345678',
        address: 'a valid address',
        zip_code: '2000',
        city: 'city',
        created_at: Date.now(),
        updated_at: Date.now()
    });
    const user4 = new User({
        profile_pic: 'some url',
        name: 'User4',
        email: 'user4@user.user',
        user_role_id: role2._id,
        password: pw,
        phone_number: '12345678',
        address: 'a valid address',
        zip_code: '2000',
        city: 'city',
        created_at: Date.now(),
        updated_at: Date.now()
    });

    await user1.save();
    await user2.save();
    await user3.save();
    await user4.save();

    const company1 = new Company({
        name: 'company1',
        lat: 10,
        lng: 10,
        user_id: user1._id,
        logo_image_url: 'img url',
        cvr: 'cvr num',
        created_at: Date.now(),
        updated_at: Date.now()
    });

    const company2 = new Company({
        name: 'company2',
        lat: 15,
        lng: 15,
        user_id: user2._id,
        logo_image_url: 'img url',
        cvr: 'cvr num',
        created_at: Date.now(),
        updated_at: Date.now()
    });

    await company1.save();
    await company2.save();

    const service1 = new Service({
        name: 'service 1',
        img: 'img url',
        created_at: Date.now(),
        updated_at: Date.now()
    });

    await service1.save();

    const engine1 = new Engine({
        type: 'engine type 1',
        brand: 'brand 1',
        created_at: Date.now(),
        updated_at: Date.now()
    });

    await engine1.save();

    const boatType1 = new BoatType({
        name: 'boat type 1',
        img: 'img url',
        created_at: Date.now(),
        updated_at: Date.now()
    });

    await boatType1.save();

    const boatSubtype1 = new BoatSubtype({
        name: 'boat subtype 1',
        img: 'img url',
        boat_type_id: boatType1._id,
        created_at: Date.now(),
        updated_at: Date.now()
    });

    await boatSubtype1.save();

    const boat1 = new Boat({
        name: 'boat 1',
        year: 2010,
        boat_subtype_id: boatSubtype1._id,
        engine_id: engine1._id,
        user_id: user3._id,
        engine_serial_number: 'serial id',
        description: 'desc',
        length: 10,
        address: 'a valid address',
        zip_code: '2000',
        city: 'city',
        created_at: Date.now(),
        updated_at: Date.now()
    });

    await boat1.save();

    const job1 = new Job({
        title: 'job 1',
        description: 'description',
        lat: 10,
        lng: 10,
        price: 100,
        due_date: Date.now(),
        due_time: Date.now(),
        user_id: user3._id,
        boat_id: boat1._id,
        service_id: service1._id,
        awarded_company_id: company1._id,
        created_at: Date.now(),
        updated_at: Date.now()
    });

    await job1.save();

    const proposal1 = new Proposal({
        date: Date.now(),
        time: Date.now(),
        description: 'description',
        status: 'pending',
        company_id: company1._id,
        job_id: job1._id,
        created_at: Date.now(),
        updated_at: Date.now()
    });

    const proposal2 = new Proposal({
        date: Date.now(),
        time: Date.now(),
        description: 'description',
        status: 'pending',
        company_id: company2._id,
        job_id: job1._id,
        created_at: Date.now(),
        updated_at: Date.now()
    });

    await proposal1.save();
    await proposal2.save();

    mongoose.connection.close();
}

seedDb();