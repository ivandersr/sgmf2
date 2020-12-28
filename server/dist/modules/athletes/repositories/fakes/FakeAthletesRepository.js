"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _uuid = require("uuid");

var _Athlete = _interopRequireDefault(require("../../infra/typeorm/entities/Athlete"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FakeAthletesRepository {
  constructor() {
    this.athletes = [];
  }

  async findAndCount(options) {
    if (options) {
      const {
        skip,
        take
      } = options;

      if (skip && take) {
        const findAthletes = this.athletes.slice(skip, skip + take);
        return [findAthletes, this.athletes.length];
      }
    }

    return [this.athletes, this.athletes.length];
  }

  async findByName({
    text,
    skip,
    take,
    order
  }) {
    if (skip && take) {
      const filteredAthletes = this.athletes.filter(athlete => athlete.name.toLocaleLowerCase().includes(text.toLowerCase()));
      const findAthletes = filteredAthletes.slice(skip, skip + take);
      return [findAthletes, this.athletes.length];
    }

    const filteredAthletes = this.athletes.filter(athlete => athlete.name.toLocaleLowerCase().includes(text.toLowerCase()));

    if (order) {
      filteredAthletes.sort((a, b) => a.name <= b.name ? 1 : -1);
    }

    return [filteredAthletes, this.athletes.length];
  }

  async findByReferralGroup({
    referral_group_id
  }) {
    const findAthletes = this.athletes.filter(athlete => athlete.referral_group_id === referral_group_id);
    return findAthletes;
  }

  async findActiveByReferralGroup({
    referral_group_id
  }) {
    const findAthletes = this.athletes.filter(athlete => athlete.referral_group_id === referral_group_id).filter(athlete => athlete.active);
    const count = findAthletes.length;
    return {
      athletes: findAthletes,
      count
    };
  }

  async findOne({
    id
  }) {
    const findAthlete = this.athletes.find(athlete => athlete.id === id);
    return findAthlete;
  }

  async create({
    name,
    phoneNumber,
    birthDate,
    athleteGroup,
    subscription
  }) {
    const newAthlete = new _Athlete.default();
    Object.assign(newAthlete, {
      id: (0, _uuid.v4)(),
      active: true,
      name,
      phoneNumber,
      birthDate,
      athleteGroup,
      subscription
    });
    this.athletes.push(newAthlete);
    return newAthlete;
  }

  async save(data) {
    const findIndex = this.athletes.findIndex(athlete => athlete.id === data.id);

    if (findIndex !== -1) {
      Object.assign(this.athletes[findIndex], data);
      return this.athletes[findIndex];
    }

    this.athletes.push(data);
    return data;
  }

}

var _default = FakeAthletesRepository;
exports.default = _default;