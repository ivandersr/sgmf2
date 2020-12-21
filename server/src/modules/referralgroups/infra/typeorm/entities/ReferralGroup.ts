import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Athlete from '@modules/athletes/infra/typeorm/entities/Athlete';

@Entity('referral_groups')
class ReferralGroup {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  referral_id: string;

  @Column()
  title: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Athlete)
  @JoinColumn({ name: 'referral_id' })
  referral: Athlete;
}

export default ReferralGroup;
