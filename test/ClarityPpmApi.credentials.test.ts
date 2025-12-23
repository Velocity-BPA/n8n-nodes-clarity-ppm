import { ClarityPpmApi } from '../credentials/ClarityPpmApi.credentials';

describe('ClarityPpmApi Credentials', () => {
  let credentials: ClarityPpmApi;

  beforeEach(() => {
    credentials = new ClarityPpmApi();
  });

  describe('Credential Definition', () => {
    it('should have correct name', () => {
      expect(credentials.name).toBe('clarityPpmApi');
    });

    it('should have correct display name', () => {
      expect(credentials.displayName).toBe('Clarity PPM API');
    });

    it('should have documentation URL', () => {
      expect(credentials.documentationUrl).toBe('https://techdocs.broadcom.com/clarity');
    });
  });

  describe('Properties', () => {
    it('should have host URL property', () => {
      const hostProp = credentials.properties.find((p) => p.name === 'host');
      expect(hostProp).toBeDefined();
      expect(hostProp!.type).toBe('string');
      expect(hostProp!.required).toBe(true);
    });

    it('should have authType property with three options', () => {
      const authTypeProp = credentials.properties.find((p) => p.name === 'authType');
      expect(authTypeProp).toBeDefined();
      expect(authTypeProp!.type).toBe('options');

      const options = (authTypeProp as any).options.map((o: any) => o.value);
      expect(options).toContain('apiKey');
      expect(options).toContain('basic');
      expect(options).toContain('token');
    });

    it('should have username property for basic and token auth', () => {
      const usernameProp = credentials.properties.find((p) => p.name === 'username');
      expect(usernameProp).toBeDefined();
      expect(usernameProp!.displayOptions?.show?.authType).toEqual(['basic', 'token']);
    });

    it('should have password property for basic and token auth', () => {
      const passwordProp = credentials.properties.find((p) => p.name === 'password');
      expect(passwordProp).toBeDefined();
      expect(passwordProp!.displayOptions?.show?.authType).toEqual(['basic', 'token']);
      expect((passwordProp as any).typeOptions?.password).toBe(true);
    });

    it('should have apiKey property for apiKey auth', () => {
      const apiKeyProp = credentials.properties.find((p) => p.name === 'apiKey');
      expect(apiKeyProp).toBeDefined();
      expect(apiKeyProp!.displayOptions?.show?.authType).toEqual(['apiKey']);
      expect((apiKeyProp as any).typeOptions?.password).toBe(true);
    });

    it('should have clientId property for apiKey auth', () => {
      const clientIdProp = credentials.properties.find((p) => p.name === 'clientId');
      expect(clientIdProp).toBeDefined();
      expect(clientIdProp!.displayOptions?.show?.authType).toEqual(['apiKey']);
    });
  });

  describe('Authentication', () => {
    it('should have authenticate property', () => {
      expect(credentials.authenticate).toBeDefined();
      expect(credentials.authenticate.type).toBe('generic');
    });

    it('should have test request configuration', () => {
      expect(credentials.test).toBeDefined();
      expect(credentials.test.request.url).toBe('/ppm/rest/v1/virtual/userProfile');
      expect(credentials.test.request.method).toBe('GET');
    });
  });
});
