import { describe, it, expect } from 'vitest';
import * as Models from '../../src/models/index.js';
import mongoose from 'mongoose';

describe('Model Schema Transforms', () => {
  // Test all models exported from the index
  const modelNames = Object.keys(Models).filter(
    (key) =>
      key !== 'default' &&
      typeof Models[key] === 'function' &&
      Models[key].modelName
  );

  modelNames.forEach((name) => {
    const Model = Models[name];

    describe(`${name} Model`, () => {
      it('should transform _id to id and remove __v in toJSON', () => {
        const doc = new Model({
          _id: new mongoose.Types.ObjectId(),
        });

        const json = doc.toJSON();

        expect(json.id).toBeDefined();
        expect(typeof json.id).toBe('string');
        expect(json._id).toBeUndefined();
        expect(json.__v).toBeUndefined();
      });

      it('should transform _id to id and remove __v in toObject', () => {
        const doc = new Model({
          _id: new mongoose.Types.ObjectId(),
        });

        const obj = doc.toObject();

        expect(obj.id).toBeDefined();
        expect(typeof obj.id).toBe('string');
        expect(obj._id).toBeUndefined();
        expect(obj.__v).toBeUndefined();
      });
    });
  });
});
