import { DatabaseConnection } from "..";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { DBColumn } from "../interfaces/db-column.interface";

/**
 * The queries in this model are very simplistic to suit the needs of this project.
 * If the project gets complex, it might be a good idea to extend this model
 * or import an orm like typeorm <https://github.com/typeorm/typeorm>.
 */
export abstract class BaseModel {
  /** @var mysql2.PromiseConnection */
  private readonly db = DatabaseConnection.promise();

  /** @var string name of table */
  protected table: string = '';

  /** @var Object columns in table. If marked false, will not be returned in find queries */
  protected columns: Record<string, DBColumn> = {};

  /**
   * Find all the model record in the DB
   *
   * @param includeGuarded bool
   *
   * @returns array
   */
  async findAll(includeGuarded = false): Promise<any[]> {
    const records = [];
    const sql = `SELECT * FROM ${this.table}`;

    const rows = (await this.db.query(sql))[0] as RowDataPacket[];

    for (const row of rows) {
      records.push(this.prepareRow(row, includeGuarded));
    }

    return records;
  }

  /**
   * Find all the model record in the DB by some filters
   *
   * @param includeGuarded bool
   *
   * @returns array
   */
  async findAllBy(where: Record<any, any>, includeGuarded = false): Promise<any[]> {
    const records = [];
    const columns = [];
    const binding = [];

    // tslint:disable-next-line: forin
    for (const key in where) {
      columns.push(key);
      binding.push(where[key]);
    }

    let whereClause = '';
    if (columns.length > 0) {
      whereClause = ' WHERE ';

      if (columns.length === 1) whereClause += `${columns[0]} = ?`;
      else whereClause += columns.join(' = ?, ');
    }

    const sql = `SELECT * FROM ${this.table} ${whereClause}`;
    const rows = (await this.db.query(sql, binding))[0] as RowDataPacket[];

    for (const row of rows) {
      records.push(this.prepareRow(row, includeGuarded));
    }

    return records;
  }

  /**
   * Find one model by id, since all tables will have id as the primary key
   *
   * @param id             Number
   * @param includeGuarded bool
   *
   * @returns array
   */
  async findOne(id: number, includeGuarded = false): Promise<any> {
    const sql = `SELECT * FROM ${this.table} WHERE id = ?`;

    const row = (await this.db.query(sql, id))[0] as RowDataPacket[];

    return this.prepareRow(row[0], includeGuarded);
  }

  /**
   * Create a DB record
   *
   * @param data           Record<any, any>
   * @param includeGuarded bool
   *
   * @returns array
   */
   async create(data: Record<any, any>, includeGuarded = false): Promise<any> {
    const columns = [];
    const binding = [];

    for (const key in data) {
      if (this.columns[key]) {
        if (this.columns[key].autoincrement) continue;

        columns.push(key);
        binding.push(data[key])
      }
    }

    if (!columns.length) throw new Error('No valid columns to insert');

    const values  = Array(columns.length).fill('?');
    const sql     = `INSERT INTO ${this.table} (${columns.join(', ')}) VALUES (${values.join(', ')})`;

    const result = (await this.db.query(sql, binding)) as ResultSetHeader[];

    return this.findOne(result[0].insertId, includeGuarded);
  }

  /**
   * Update a DB record
   *
   * @param id             number
   * @param data           Record<any, any>
   * @param includeGuarded bool
   *
   * @returns array
   */
  async update(id: number, data: Record<any, any>, includeGuarded = false): Promise<any> {
    const columns = [];
    const binding = [];

    for (const key in data) {
      if (this.columns[key]) {
        if (this.columns[key].autoincrement) continue;

        columns.push(key);
        binding.push(data[key])
      }
    }

    if (!columns.length) throw new Error('No valid columns to update');

    let set = '';
    if (columns.length === 1) set = `${columns[0]} = ?`;
    else set = columns.join(' = ?, ');

    binding.push(id);

    const sql    = `UPDATE ${this.table} SET ${set} WHERE id = ?`;
    const result = (await this.db.query(sql, binding)) as ResultSetHeader[];

    return this.findOne(id, includeGuarded);
  }

  /**
   * Prepare the record to fit the model definition
   *
   * @param row            RowDataPacket
   * @param includeGuarded boolean
   */
  private prepareRow(row: RowDataPacket, includeGuarded: boolean) {
    // Object.create(null) over {}. This Allows assigning any keys in typescript
    const record = Object.create(null);

    if (row) {
      for (const key of Object.keys(row)) {
        // We have the column
        if (key in this.columns) {
          // Either the hidden property is not defined or it is set to false
          if (this.columns[key].hidden && !includeGuarded) continue;

          const recordKey = this.columns[key].mutator || key;
          record[recordKey] = this.formatByType(row[key], this.columns[key].type);
        }
      }
    }

    return record;
  }

  /**
   * Format the value by defined time
   *
   * @param value any
   * @param type string
   */
   private formatByType(value: any, type?: string) {
    // tslint:disable-next-line: no-bitwise
    if (type === 'int') return value | 0; // bit-wise integer conversion
    if (type === 'float' || type === 'number') return +value;
    if (type === 'boolean') return !!value;
    if (type === 'date' && value) return new Date(value);

    return value;
  }
}
