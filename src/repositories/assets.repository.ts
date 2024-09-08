import { Injectable } from '@nestjs/common';
import { pool } from '../config/db.config';

@Injectable()
export class AssetsRepository {
  async getAssets() {
    const query = 'SELECT * FROM asset WHERE location_id = 91495 OFFSET 900000 LIMIT 50';
    const result = await pool.query(query);
    return result.rows;
  }

  async insertAssets(asset: { name: string; type: string; serial: string }) {
    const { name, type, serial } = asset;
    const query = 'INSERT INTO asset (name, type, serial) VALUES ($1, $2, $3) RETURNING *';
    const values = [name, type, serial];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async deleteAsset(id: string) {
    const query = 'DELETE FROM asset WHERE id = $1';
    const values = [id];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async updateAsset(id: string, asset: { name: string; type: string; serial: string }) {
    const { name, type, serial } = asset;
    const query = 'UPDATE asset SET name = $1, type = $2, serial = $3 WHERE id = $4 RETURNING *';
    const values = [name, type, serial, id];
    const result = await pool.query(query, values);
    return result.rows[0];
  }
}
