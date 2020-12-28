"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class AddAthleteGroupToAthlete1604827054272 {
  async up(queryRunner) {
    await queryRunner.addColumn('athletes', new _typeorm.TableColumn({
      name: 'athlete_group_id',
      type: 'uuid',
      isNullable: true
    }));
    await queryRunner.createForeignKey('athletes', new _typeorm.TableForeignKey({
      name: 'AtheteGroupAthlete',
      columnNames: ['athlete_group_id'],
      referencedTableName: 'athlete_groups',
      referencedColumnNames: ['id'],
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropForeignKey('athlets', 'AtheteGroupAthlete');
    await queryRunner.dropColumn('athletes', 'athlete_group_id');
  }

}

exports.default = AddAthleteGroupToAthlete1604827054272;