import { ConnDB } from '../db/ConnDB';
import { Customer } from '../models/Customer';
import { Measure, MeasureType } from '../models/Measure';
import { Confirmation } from '../models/Confirmation';

const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

const generateRandomDate = () => {
    const start = new Date(2023, 0, 1);
    const end = new Date();
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const generateCustomerData = (num: number) => {
    return Array.from({ length: num }, (_, i) => ({
        customer_code: `CUST${1000 + i}`,
        created_at: new Date(),
        updated_at: new Date(),
    }));
};

const generateMeasureData = (customers: Customer[], num: number) => {
    return Array.from({ length: num }, () => ({
        measure_datetime: generateRandomDate(),
        measure_type: Object.values(MeasureType)[getRandomInt(0, Object.values(MeasureType).length - 1)],
        measure_value: parseFloat((Math.random() * 100).toFixed(2)),
        image_url: `https://example.com/image${getRandomInt(1, 10)}.png`,
        customer: customers[getRandomInt(0, customers.length - 1)],
        created_at: new Date(),
        updated_at: new Date(),
    }));
};

const generateConfirmationData = (measures: Measure[], num: number) => {
    return Array.from({ length: num }, () => ({
        confirmed_value: parseFloat((Math.random() * 100).toFixed(2)),
        confirmed_at: generateRandomDate(),
        measure: measures[getRandomInt(0, measures.length - 1)],
        created_at: new Date(),
        updated_at: new Date(),
    }));
};

const seedDatabase = async () => {
    await ConnDB.initialize();

    const customerRepo = ConnDB.getRepository(Customer);
    const measureRepo = ConnDB.getRepository(Measure);
    const confirmationRepo = ConnDB.getRepository(Confirmation);

    // Generate and save customers
    const customers = generateCustomerData(getRandomInt(5, 20));
    await customerRepo.save(customers);
    console.log('Customers seeded');

    // Generate and save measures
    const allCustomers = await customerRepo.find();
    const measures = generateMeasureData(allCustomers, getRandomInt(5, 20));
    await measureRepo.save(measures);
    console.log('Measures seeded');

    // Generate and save confirmations
    const allMeasures = await measureRepo.find();
    const confirmations = generateConfirmationData(allMeasures, getRandomInt(5, 20));
    await confirmationRepo.save(confirmations);
    console.log('Confirmations seeded');

    console.log('Database seeding completed');
    await ConnDB.destroy();
};

seedDatabase().catch((err) => {
    console.error('Error seeding database:', err);
    process.exit(1);
});
