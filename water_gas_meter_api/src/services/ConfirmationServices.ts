// src/services/ConfirmationServices.ts

import { ConnDB } from '../db/ConnDB';

// MODELS
import { Confirmation } from '../models/Confirmation';
import { Measure } from '../models/Measure';

// DTOS
import { CreateConfirmationDTO } from '../dtos/confirmation-dto/CreateConfirmationDTO';
import { UpdateConfirmationDTO } from '../dtos/confirmation-dto/UpdateConfirmationDTO';
import { ConfirmationResponseDTO } from '../dtos/confirmation-dto/ConfirmationResponseDTO';

export class ConfirmationServices {
    private static confirmationRepository = ConnDB.getRepository(Confirmation);
    private static measureRepository = ConnDB.getRepository(Measure);

    static async getAllConfirmation(): Promise<ConfirmationResponseDTO[]> {
        try {
            const confirmations = await this.confirmationRepository.find({
                relations: ['measure']
            });

            return confirmations.map(confirmation => new ConfirmationResponseDTO(
                confirmation.id,
                confirmation.confirmed_value,
                confirmation.confirmed_at,
                confirmation.measure.id,
                confirmation.created_at,
                confirmation.updated_at
            ));
        } catch (err) {
            console.error('Error retrieving all confirmations:', err);
            throw new Error('Failed to retrieve confirmations');
        }
    }

    static async getConfirmationById(id: number): Promise<ConfirmationResponseDTO | null> {
        if (isNaN(id)) {
            throw new Error('Invalid ID format');
        }

        try {
            const confirmation = await this.confirmationRepository.findOne({
                where: { id },
                relations: ['measure']
            });

            if (!confirmation) return null;

            return new ConfirmationResponseDTO(
                confirmation.id,
                confirmation.confirmed_value,
                confirmation.confirmed_at,
                confirmation.measure.id,
                confirmation.created_at,
                confirmation.updated_at
            );
        } catch (err) {
            console.error('Error retrieving confirmation by ID:', err);
            throw new Error('Failed to retrieve confirmation');
        }
    }

    static async createConfirmation(createConfirmationDTO: CreateConfirmationDTO): Promise<ConfirmationResponseDTO> {
        const measure = await this.measureRepository.findOneBy({ id: createConfirmationDTO.measureId });
        if (!measure) {
            throw new Error('Measure not found');
        }

        const confirmation = new Confirmation();
        confirmation.confirmed_value = createConfirmationDTO.confirmed_value;
        confirmation.confirmed_at = createConfirmationDTO.confirmed_at;
        confirmation.measure = measure;

        try {
            const savedConfirmation = await this.confirmationRepository.save(confirmation);
            return new ConfirmationResponseDTO(
                savedConfirmation.id,
                savedConfirmation.confirmed_value,
                savedConfirmation.confirmed_at,
                savedConfirmation.measure.id,
                savedConfirmation.created_at,
                savedConfirmation.updated_at
            );
        } catch (err) {
            console.error('Error creating confirmation:', err);
            throw new Error('Failed to create confirmation');
        }
    }

    static async updateConfirmation(id: number, updateConfirmationDTO: UpdateConfirmationDTO): Promise<ConfirmationResponseDTO | null> {
        if (isNaN(id)) {
            throw new Error('Invalid ID format');
        }

        try {
            const confirmation = await this.confirmationRepository.findOneBy({ id });
            if (!confirmation) {
                return null;
            }

            if (updateConfirmationDTO.measureId) {
                const measure = await this.measureRepository.findOneBy({ id: updateConfirmationDTO.measureId });
                if (!measure) {
                    throw new Error('Measure not found');
                }
                confirmation.measure = measure;
            }

            Object.assign(confirmation, updateConfirmationDTO);

            const updatedConfirmation = await this.confirmationRepository.save(confirmation);

            return new ConfirmationResponseDTO(
                updatedConfirmation.id,
                updatedConfirmation.confirmed_value,
                updatedConfirmation.confirmed_at,
                updatedConfirmation.measure.id,
                updatedConfirmation.created_at,
                updatedConfirmation.updated_at
            );
        } catch (err) {
            console.error('Error updating confirmation:', err);
            throw new Error('Failed to update confirmation');
        }
    }

    static async deleteConfirmation(id: number): Promise<boolean> {
        if (isNaN(id)) {
            throw new Error('Invalid ID format');
        }

        try {
            const result = await this.confirmationRepository.delete(id);
            return (result.affected ?? 0) > 0;
        } catch (err) {
            console.error('Error deleting confirmation:', err);
            throw new Error('Failed to delete confirmation');
        }
    }
}

export default ConfirmationServices;
