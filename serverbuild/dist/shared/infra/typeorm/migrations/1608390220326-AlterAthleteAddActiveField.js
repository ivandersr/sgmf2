"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class AlterAthleteAddActiveField1608390220326 {
  async up(queryRunner) {
    await queryRunner.addColumn('athletes', new _typeorm.TableColumn({
      name: 'active',
      type: 'boolean',
      default: 'true'
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropColumn('athletes', 'active');
  }

}

exports.default = AlterAthleteAddActiveField1608390220326;