"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class AlterRefGroupsAddCreateUpdateDate1608554808438 {
  async up(queryRunner) {
    await queryRunner.addColumns('referral_groups', [new _typeorm.TableColumn({
      name: 'created_at',
      type: 'timestamp',
      default: 'now()'
    }), new _typeorm.TableColumn({
      name: 'updated_at',
      type: 'timestamp',
      default: 'now()'
    })]);
  }

  async down(queryRunner) {
    await queryRunner.dropColumn('referral_groups', 'updated_at');
    await queryRunner.dropColumn('referral_groups', 'created_at');
  }

}

exports.default = AlterRefGroupsAddCreateUpdateDate1608554808438;