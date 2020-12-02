/* eslint-disable camelcase */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('images')
class Images {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  car_id: string;

  @Column()
  url: string;
}

export default Images;
