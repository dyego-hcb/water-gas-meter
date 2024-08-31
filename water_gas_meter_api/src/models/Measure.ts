// /src/models/Measure.ts

import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne } from 'typeorm';
import { Customer } from './Customer';
import { Confirmation } from './Confirmation';

export enum MeasureType {
    WATER = 'WATER',
    GAS = 'GAS',
}

@Entity()
export class Measure {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        unique: true,
    })
    measure_uuid!: string;

    @Column()
    measure_datetime!: Date;

    @Column({
        type: 'enum',
        enum: MeasureType
    })
    measure_type!: MeasureType;

    @Column({ type: 'numeric' })
    measure_value!: number;

    @Column()
    image_path!: string;

    @Column()
    image_url!: string;

    @ManyToOne(() => Customer, customer => customer.measures, { nullable: false })
    customer!: Customer;

    @OneToOne(() => Confirmation, confirmation => confirmation.measure)
    confirmation!: Confirmation;

    @Column()
    created_at: Date = new Date();

    @Column()
    updated_at: Date = new Date();
}
