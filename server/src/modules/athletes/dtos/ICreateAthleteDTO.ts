export default interface ICreateAthleteDTO {
  name: string;
  birthDate: string;
  phoneNumber: string;
  subscription_id: string;
  athlete_group_id: string;
  referral_group_id?: string;
}
