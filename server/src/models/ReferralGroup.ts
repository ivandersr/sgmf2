import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Athlete from './Athlete';

@Entity('referral_groups')
class ReferralGroup {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  referral_id: string;

  @Column()
  title: string;

  @ManyToOne(() => Athlete)
  @JoinColumn({ name: 'referral_id' })
  referral: Athlete;
}

export default ReferralGroup;
