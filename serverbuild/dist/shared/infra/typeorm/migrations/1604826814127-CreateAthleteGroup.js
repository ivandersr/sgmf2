"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CreateAthleteGroup1604826814127 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'athlete_groups',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }, {
        name: 'title',
        type: 'varchar'
      }, {
        name: 'description',
        type: 'varchar'
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable('athlete_groups');
  }

}

exports.default = CreateAthleteGroup1604826814127;