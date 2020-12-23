import Athlete from "@modules/athletes/infra/typeorm/entities/Athlete";

export default interface ICreateReferralGroupDTO {
  title: string;
  referral: Athlete;
}
