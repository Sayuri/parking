import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Rate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rate: number;

  @Column('date')
  startDate: Date;
}
