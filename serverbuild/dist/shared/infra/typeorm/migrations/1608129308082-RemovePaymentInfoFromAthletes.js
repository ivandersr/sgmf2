"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class RemovePaymentInfoFromAthletes1608129308082 {
  async up(queryRunner) {
    await queryRunner.dropColumn('athletes', 'lastPayValue');
    await queryRunner.dropColumn('athletes', 'dueDate');
    await queryRunner.dropColumn('athletes', 'lastPayDate');
  }

  async down(queryRunner) {
    await queryRunner.addColumns('athletes', [new _typeorm.TableColumn({
      name: 'lastPayValue',
      type: 'decimal(10, 2)'
    }), new _typeorm.TableColumn({
      name: 'dueDate',
      type: 'timestamp'
    }), new _typeorm.TableColumn({
      name: 'lastPayDate',
      type: 'timestamp'
    })]);
  }

}

exports.default = RemovePaymentInfoFromAthletes1608129308082;