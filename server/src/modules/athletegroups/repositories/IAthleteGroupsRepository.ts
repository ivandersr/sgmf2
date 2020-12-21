import ICreateAthleteGroupDTO from '../dtos/ICreateAthleteGroupDTO';
import AthleteGroup from '../infra/typeorm/entities/AthleteGroup';

export default interface IAthleteGroupsRepository {
  create(data: ICreateAthleteGroupDTO): Promise<AthleteGroup>;
  find(): Promise<AthleteGroup[]>;
}
