"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CreateReferralGroups1604830748927 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'referral_groups',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }, {
        name: 'referral_id',
        type: 'uuid'
      }, {
        name: 'title',
        type: 'varchar'
      }]
    }));
    await queryRunner.createForeignKey('referral_groups', new _typeorm.TableForeignKey({
      name: 'ReferralAthlete',
      columnNames: ['referral_id'],
      referencedTableName: 'athletes',
      referencedColumnNames: ['id']
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable('referral_groups');
  }

}

exports.default = CreateReferralGroups1604830748927;