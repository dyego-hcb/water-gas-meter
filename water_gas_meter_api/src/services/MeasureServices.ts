// src/services/MeasureServices.ts

import { ConnDB } from '../db/ConnDB';

// MODELS
import { Measure, MeasureType } from '../models/Measure';
import { Customer } from '../models/Customer';

// DTOS
import { CreateMeasureDTO } from '../dtos/measure-dto/CreateMeasureDTO';
import { UpdateMeasureDTO } from '../dtos/measure-dto/UpdateMeasureDTO';
import { MeasureResponseDTO } from '../dtos/measure-dto/MeasureResponseDTO';

export class MeasureServices {
    private static measureRepository = ConnDB.getRepository(Measure);
    private static customerRepository = ConnDB.getRepository(Customer);

    static async getAllMeasures(): Promise<MeasureResponseDTO[]> {
        try {

            const measures = await this.measureRepository.find({
                relations: ['customer']
            });

            return measures.map(measure => new MeasureResponseDTO(
                measure.id,
                measure.measure_uuid,
                measure.measure_datetime,
                measure.measure_type,
                measure.measure_value,
                measure.image_path,
                measure.image_url,
                measure.customer!.id,
                measure.created_at,
                measure.updated_at
            ));
        } catch (err) {
            console.error('Error retrieving all measures:', err);
            throw new Error('Failed to retrieve measures');
        }
    }

    static async getAllMeasuresByCustomerCode(id: number): Promise<MeasureResponseDTO[]> {
        try {

            const measures = await this.measureRepository.find({
                where: {
                    customer: {
                        id: id
                    }
                },
                relations: ['customer']
            });

            return measures.map(measure => new MeasureResponseDTO(
                measure.id,
                measure.measure_uuid,
                measure.measure_datetime,
                measure.measure_type,
                measure.measure_value,
                measure.image_path,
                measure.image_url,
                measure.customer!.id,
                measure.created_at,
                measure.updated_at
            ));
        } catch (err) {
            console.error('Error retrieving all measures:', err);
            throw new Error('Failed to retrieve measures');
        }
    }


    static async getMeasureById(id: number): Promise<MeasureResponseDTO | null> {
        if (isNaN(id)) {
            throw new Error('Invalid ID format');
        }

        try {
            const measure = await this.measureRepository.findOne({
                where: { id },
                relations: ['customer']
            });

            if (!measure) return null;

            return new MeasureResponseDTO(
                measure.id,
                measure.measure_uuid,
                measure.measure_datetime,
                measure.measure_type,
                measure.measure_value,
                measure.image_path,
                measure.image_url,
                measure.customer!.id,
                measure.created_at,
                measure.updated_at
            );
        } catch (err) {
            console.error('Error retrieving measure by ID:', err);
            throw new Error('Failed to retrieve measure');
        }
    }

    static async getMeasureByMeasureUUID(measure_uuid: string): Promise<MeasureResponseDTO | null> {
        if (!(measure_uuid)) {
            throw new Error('Invalid measure_uuid');
        }

        try {
            const measure = await this.measureRepository.findOne({
                where: { measure_uuid },
                relations: ['customer']
            });

            if (!measure) return null;

            return new MeasureResponseDTO(
                measure.id,
                measure.measure_uuid,
                measure.measure_datetime,
                measure.measure_type,
                measure.measure_value,
                measure.image_path,
                measure.image_url,
                measure.customer!.id,
                measure.created_at,
                measure.updated_at
            );
        } catch (err) {
            console.error('Error retrieving measure by ID:', err);
            throw new Error('Failed to retrieve measure');
        }
    }

    static async createMeasure(createMeasureDto: CreateMeasureDTO): Promise<Measure> {
        if (!createMeasureDto.customerId) {
            throw new Error('Customer ID is required');
        }

        try {
            const customer = await this.customerRepository.findOneBy({ id: createMeasureDto.customerId });
            if (!customer) {
                throw new Error('Customer not found');
            }
            const measure = this.measureRepository.create({
                ...createMeasureDto,
                customer: customer
            });
            return await this.measureRepository.save(measure);
        } catch (err) {
            console.error('Error creating measure:', err);
            throw new Error('Failed to create measure');
        }
    }

    static async updateMeasure(id: number, data: UpdateMeasureDTO): Promise<MeasureResponseDTO | null> {
        if (isNaN(id)) {
            throw new Error('Invalid ID format');
        }

        try {
            const measure = await this.measureRepository.findOneBy({ id: id });
            if (!measure) {
                throw new Error('Measure not found');
            }

            if (data.customerId) {
                const customer = await this.customerRepository.findOneBy({ id: data.customerId });
                if (!customer) {
                    throw new Error('Customer not found');
                }
                measure.customer = customer;
            }

            Object.assign(measure, data);

            const updatedMeasure = await this.measureRepository.save(measure);

            return new MeasureResponseDTO(
                updatedMeasure.id,
                measure.measure_uuid,
                updatedMeasure.measure_datetime,
                updatedMeasure.measure_type,
                updatedMeasure.measure_value,
                updatedMeasure.image_url,
                measure.image_path,
                updatedMeasure.customer!.id,
                updatedMeasure.created_at,
                updatedMeasure.updated_at
            );
        } catch (err) {
            console.error('Error updating measure:', err);
            throw new Error('Failed to update measure');
        }
    }

    static async deleteMeasure(id: number): Promise<boolean> {
        if (isNaN(id)) {
            throw new Error('Invalid ID format');
        }

        try {
            const result = await this.measureRepository.delete(id);
            return (result.affected ?? 0) > 0;
        } catch (err) {
            console.error('Error deleting measure:', err);
            throw new Error('Failed to delete measure');
        }
    }

    static async findMeasureByMonth(customer_code: string, measure_type: MeasureType, measure_date: Date) {
        try {
            const startOfMonth = new Date(measure_date.getFullYear(), measure_date.getMonth(), 1);
            const endOfMonth = new Date(measure_date.getFullYear(), measure_date.getMonth() + 1, 0);

            return await ConnDB.getRepository(Measure).createQueryBuilder('measure')
                .innerJoinAndSelect('measure.customer', 'customer')
                .where('customer.customer_code = :customer_code', { customer_code })
                .andWhere('measure.measure_type = :measure_type', { measure_type })
                .andWhere('measure.measure_datetime BETWEEN :startOfMonth AND :endOfMonth', {
                    startOfMonth,
                    endOfMonth
                })
                .getOne();
        } catch (err) {
            console.error('Error finding measure by month:', err);
            throw new Error('Error finding measure by month');
        }
    }
}

export default MeasureServices;
