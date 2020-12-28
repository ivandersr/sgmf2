"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CreateAthletes1604690131171 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'athletes',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }, {
        name: 'name',
        type: 'varchar'
      }, {
        name: 'birthDate',
        type: 'timestamp'
      }, {
        name: 'phoneNumber',
        type: 'varchar'
      }, {
        name: 'subscription_id',
        type: 'uuid',
        isNullable: true
      }, {
        name: 'lastPayValue',
        type: 'decimal(5,2)',
        default: 0
      }, {
        name: 'dueDate',
        type: 'timestamp',
        default: 'now()'
      }, {
        name: 'lastPayDate',
        type: 'timestamp',
        default: 'now()'
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
    await queryRunner.createForeignKey('athletes', new _typeorm.TableForeignKey({
      name: 'SubscriptionAthlete',
      columnNames: ['subscription_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'subscriptions',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable('athletes');
  }

}

exports.default = CreateAthletes1604690131171;