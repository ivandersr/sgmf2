"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CreatePayments1608128750657 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'payments',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }, {
        name: 'value',
        type: 'decimal(10,2)'
      }, {
        name: 'paymentDate',
        type: 'timestamp'
      }, {
        name: 'monthsPaid',
        type: 'smallint'
      }, {
        name: 'nextDueDate',
        type: 'timestamp'
      }, {
        name: 'athlete_id',
        type: 'uuid'
      }, {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()'
      }, {
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()'
      }]
    }));
    await queryRunner.createForeignKey('payments', new _typeorm.TableForeignKey({
      name: 'PaymentAthlete',
      columnNames: ['athlete_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'athletes',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable('payments');
  }

}

exports.default = CreatePayments1608128750657;