// /src/models/Confirmation.ts

import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Measure } from './Measure';

@Entity()
export class Confirmation {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'numeric' })
    confirmed_value!: number;

    @Column()
    confirmed_at!: Date;

    @OneToOne(() => Measure, measure => measure.confirmation)
    @JoinColumn()
    measure!: Measure;

    @Column()
    created_at: Date = new Date();

    @Column()
    updated_at: Date = new Date();
}
