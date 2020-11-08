import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import AthleteGroup from './AthleteGroup';

import Subscription from './Subscription';

@Entity('athletes')
class Athlete {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  birthDate: Date;

  @Column()
  phoneNumber: string;

  @Column()
  subscription_id: string;

  @Column()
  athlete_group_id: string;

  @Column()
  lastPayValue: number;

  @Column()
  dueDate: Date;

  @Column()
  lastPayDate: Date;

  @ManyToOne(() => Subscription)
  @JoinColumn({ name: 'subscription_id' })
  subscription: Subscription;

  @ManyToOne(() => AthleteGroup)
  @JoinColumn({ name: 'athlete_group_id' })
  athleteGroup: AthleteGroup;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Athlete;
