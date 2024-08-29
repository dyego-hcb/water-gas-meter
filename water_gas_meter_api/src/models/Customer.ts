// /src/models/Customer.ts

import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Measure } from './Measure';

@Entity()
export class Customer {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    customer_code?: string;

    @OneToMany(() => Measure, measure => measure.customer)
    measures?: Measure[];

    @Column()
    created_at: Date = new Date();

    @Column()
    updated_at: Date = new Date();
}
