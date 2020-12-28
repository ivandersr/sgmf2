"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class AddReferralGroupToAthlete1604830766788 {
  async up(queryRunner) {
    await queryRunner.addColumn('athletes', new _typeorm.TableColumn({
      name: 'referral_group_id',
      type: 'uuid',
      isNullable: true
    }));
    await queryRunner.createForeignKey('athletes', new _typeorm.TableForeignKey({
      name: 'ReferralGroupAthletes',
      columnNames: ['referral_group_id'],
      referencedTableName: 'referral_groups',
      referencedColumnNames: ['id']
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropForeignKey('athletes', 'ReferralGroupAthletes');
    await queryRunner.dropColumn('athletes', 'referral_group_id');
  }

}

exports.default = AddReferralGroupToAthlete1604830766788;