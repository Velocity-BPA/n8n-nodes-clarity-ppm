import {
  buildFilterExpression,
  getClarityErrorMessage,
  validateRequiredFields,
  formatClarityDate,
  simplifyResponse,
} from '../nodes/ClarityPpm/GenericFunctions';
import type { IClarityApiResponse } from '../nodes/ClarityPpm/types';

describe('GenericFunctions', () => {
  describe('buildFilterExpression', () => {
    it('should return empty string for empty object', () => {
      expect(buildFilterExpression({})).toBe('');
    });

    it('should build filter for string value', () => {
      const result = buildFilterExpression({ status: 'APPROVED' });
      expect(result).toBe("(status = 'APPROVED')");
    });

    it('should build filter for boolean value', () => {
      const result = buildFilterExpression({ isActive: true });
      expect(result).toBe('(isActive = true)');
    });

    it('should build filter for number value', () => {
      const result = buildFilterExpression({ priority: 5 });
      expect(result).toBe('(priority = 5)');
    });

    it('should combine multiple filters with and', () => {
      const result = buildFilterExpression({
        isActive: true,
        status: 'APPROVED',
      });
      expect(result).toBe("(isActive = true) and (status = 'APPROVED')");
    });

    it('should ignore null and undefined values', () => {
      const result = buildFilterExpression({
        isActive: true,
        status: null,
        name: undefined,
      });
      expect(result).toBe('(isActive = true)');
    });

    it('should ignore empty string values', () => {
      const result = buildFilterExpression({
        isActive: true,
        status: '',
      });
      expect(result).toBe('(isActive = true)');
    });
  });

  describe('getClarityErrorMessage', () => {
    it('should extract error message from Clarity error response', () => {
      const error = {
        _errors: [
          {
            errorMessage: "CMN-0007: Attribute 'name' is required.",
            errorCode: 'validation.requiredFieldMissing',
          },
        ],
      };
      expect(getClarityErrorMessage(error)).toBe(
        "CMN-0007: Attribute 'name' is required.",
      );
    });

    it('should return error code if no message', () => {
      const error = {
        _errors: [
          {
            errorCode: 'validation.requiredFieldMissing',
          },
        ],
      };
      expect(getClarityErrorMessage(error)).toBe('validation.requiredFieldMissing');
    });

    it('should handle message property', () => {
      const error = { message: 'Connection failed' };
      expect(getClarityErrorMessage(error)).toBe('Connection failed');
    });

    it('should handle nested error object', () => {
      const error = { error: { message: 'Nested error' } };
      expect(getClarityErrorMessage(error)).toBe('Nested error');
    });

    it('should handle string error', () => {
      const error = { error: 'Simple error string' };
      expect(getClarityErrorMessage(error)).toBe('Simple error string');
    });

    it('should return default message for unknown format', () => {
      const error = { unknown: 'format' };
      expect(getClarityErrorMessage(error)).toBe('An unknown error occurred');
    });
  });

  describe('validateRequiredFields', () => {
    it('should not throw for valid data', () => {
      expect(() =>
        validateRequiredFields({ code: 'PRJ001', name: 'Project' }, ['code', 'name'], 'create'),
      ).not.toThrow();
    });

    it('should throw for missing required field', () => {
      expect(() =>
        validateRequiredFields({ code: 'PRJ001' }, ['code', 'name'], 'create'),
      ).toThrow('Missing required fields for create operation: name');
    });

    it('should throw for null value', () => {
      expect(() =>
        validateRequiredFields({ code: 'PRJ001', name: null }, ['code', 'name'], 'create'),
      ).toThrow('Missing required fields for create operation: name');
    });

    it('should throw for empty string value', () => {
      expect(() =>
        validateRequiredFields({ code: 'PRJ001', name: '' }, ['code', 'name'], 'create'),
      ).toThrow('Missing required fields for create operation: name');
    });

    it('should list all missing fields', () => {
      expect(() => validateRequiredFields({}, ['code', 'name'], 'create')).toThrow(
        'Missing required fields for create operation: code, name',
      );
    });
  });

  describe('formatClarityDate', () => {
    it('should accept valid ISO date string', () => {
      const result = formatClarityDate('2024-01-15T10:30:00Z');
      expect(result).toMatch(/2024-01-15/);
    });

    it('should accept date string', () => {
      const result = formatClarityDate('2024-01-15');
      expect(result).toBeDefined();
    });

    it('should throw for invalid date', () => {
      expect(() => formatClarityDate('not-a-date')).toThrow('Invalid date format');
    });
  });

  describe('simplifyResponse', () => {
    it('should extract results from list response', () => {
      const response: IClarityApiResponse = {
        _self: 'http://host/ppm/rest/v1/projects',
        _totalCount: 2,
        _results: [
          { _internalId: 1, code: 'PRJ001' },
          { _internalId: 2, code: 'PRJ002' },
        ],
      };
      const result = simplifyResponse(response);
      expect(result).toEqual([
        { _internalId: 1, code: 'PRJ001' },
        { _internalId: 2, code: 'PRJ002' },
      ]);
    });

    it('should preserve _internalId but remove other metadata', () => {
      const response: IClarityApiResponse = {
        _internalId: 1,
        _self: 'http://host/ppm/rest/v1/projects/1',
        _links: { manager: 'http://host/...' },
        code: 'PRJ001',
        name: 'Project 1',
      } as IClarityApiResponse & { code: string; name: string };

      const result = simplifyResponse(response);
      expect(result).toEqual({
        _internalId: 1,
        code: 'PRJ001',
        name: 'Project 1',
      });
    });
  });
});
