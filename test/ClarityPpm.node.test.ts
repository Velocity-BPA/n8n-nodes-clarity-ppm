import { ClarityPpm } from '../nodes/ClarityPpm/ClarityPpm.node';

describe('ClarityPpm Node', () => {
  let clarityPpmNode: ClarityPpm;

  beforeEach(() => {
    clarityPpmNode = new ClarityPpm();
  });

  describe('Node Description', () => {
    it('should have correct display name', () => {
      expect(clarityPpmNode.description.displayName).toBe('Clarity PPM');
    });

    it('should have correct node name', () => {
      expect(clarityPpmNode.description.name).toBe('clarityPpm');
    });

    it('should have correct icon', () => {
      expect(clarityPpmNode.description.icon).toBe('file:clarity-ppm.svg');
    });

    it('should have correct version', () => {
      expect(clarityPpmNode.description.version).toBe(1);
    });

    it('should require credentials', () => {
      expect(clarityPpmNode.description.credentials).toBeDefined();
      expect(clarityPpmNode.description.credentials![0].name).toBe('clarityPpmApi');
      expect(clarityPpmNode.description.credentials![0].required).toBe(true);
    });

    it('should have main input and output', () => {
      expect(clarityPpmNode.description.inputs).toEqual(['main']);
      expect(clarityPpmNode.description.outputs).toEqual(['main']);
    });
  });

  describe('Resources', () => {
    it('should have all expected resources', () => {
      const resourceProperty = clarityPpmNode.description.properties.find(
        (p) => p.name === 'resource',
      );
      expect(resourceProperty).toBeDefined();
      expect(resourceProperty!.type).toBe('options');

      const resourceOptions = (resourceProperty as any).options.map((o: any) => o.value);
      expect(resourceOptions).toContain('project');
      expect(resourceOptions).toContain('task');
      expect(resourceOptions).toContain('timesheet');
      expect(resourceOptions).toContain('resource');
      expect(resourceOptions).toContain('roadmap');
      expect(resourceOptions).toContain('team');
      expect(resourceOptions).toContain('costPlan');
      expect(resourceOptions).toContain('benefitPlan');
      expect(resourceOptions).toContain('lookup');
      expect(resourceOptions).toContain('integration');
      expect(resourceOptions).toContain('userProfile');
    });

    it('should have 11 resources total', () => {
      const resourceProperty = clarityPpmNode.description.properties.find(
        (p) => p.name === 'resource',
      );
      expect((resourceProperty as any).options.length).toBe(11);
    });
  });

  describe('Project Operations', () => {
    it('should have all project operations', () => {
      const operationProperty = clarityPpmNode.description.properties.find(
        (p) =>
          p.name === 'operation' &&
          p.displayOptions?.show?.resource?.includes('project'),
      );
      expect(operationProperty).toBeDefined();

      const operations = (operationProperty as any).options.map((o: any) => o.value);
      expect(operations).toContain('create');
      expect(operations).toContain('get');
      expect(operations).toContain('getMany');
      expect(operations).toContain('update');
      expect(operations).toContain('delete');
    });
  });

  describe('Timesheet Operations', () => {
    it('should have submit and approve operations for timesheets', () => {
      const operationProperty = clarityPpmNode.description.properties.find(
        (p) =>
          p.name === 'operation' &&
          p.displayOptions?.show?.resource?.includes('timesheet'),
      );
      expect(operationProperty).toBeDefined();

      const operations = (operationProperty as any).options.map((o: any) => o.value);
      expect(operations).toContain('submit');
      expect(operations).toContain('approve');
    });
  });

  describe('Task Operations', () => {
    it('should require projectId for all task operations', () => {
      const projectIdField = clarityPpmNode.description.properties.find(
        (p) =>
          p.name === 'projectId' && p.displayOptions?.show?.resource?.includes('task'),
      );
      expect(projectIdField).toBeDefined();
      expect(projectIdField!.required).toBe(true);
    });
  });

  describe('Cost Plan Operations', () => {
    it('should require investmentId filter for getMany', () => {
      const investmentIdField = clarityPpmNode.description.properties.find(
        (p) =>
          p.name === 'investmentIdFilter' &&
          p.displayOptions?.show?.resource?.includes('costPlan'),
      );
      expect(investmentIdField).toBeDefined();
      expect(investmentIdField!.required).toBe(true);
    });
  });

  describe('Lookup Operations', () => {
    it('should only have getValues operation', () => {
      const operationProperty = clarityPpmNode.description.properties.find(
        (p) =>
          p.name === 'operation' &&
          p.displayOptions?.show?.resource?.includes('lookup'),
      );
      expect(operationProperty).toBeDefined();

      const operations = (operationProperty as any).options.map((o: any) => o.value);
      expect(operations).toEqual(['getValues']);
    });
  });

  describe('User Profile Operations', () => {
    it('should only have get operation', () => {
      const operationProperty = clarityPpmNode.description.properties.find(
        (p) =>
          p.name === 'operation' &&
          p.displayOptions?.show?.resource?.includes('userProfile'),
      );
      expect(operationProperty).toBeDefined();

      const operations = (operationProperty as any).options.map((o: any) => o.value);
      expect(operations).toEqual(['get']);
    });
  });
});
