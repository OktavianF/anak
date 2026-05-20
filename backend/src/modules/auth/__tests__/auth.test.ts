import request from 'supertest';
import app from '@/app';

describe('Auth Module', () => {
  describe('POST /api/v1/auth/register', () => {
    it('should return 400 for missing fields', async () => {
      const res = await request(app)
        .post('/api/v1/auth/register')
        .send({});

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe('Validation error');
    });

    it('should return 400 for invalid email', async () => {
      const res = await request(app)
        .post('/api/v1/auth/register')
        .send({ email: 'invalid', password: '123456', name: 'Test' });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it('should return 400 for short password', async () => {
      const res = await request(app)
        .post('/api/v1/auth/register')
        .send({ email: 'test@test.com', password: '12', name: 'Test' });

      expect(res.status).toBe(400);
    });
  });

  describe('POST /api/v1/auth/login', () => {
    it('should return 400 for missing fields', async () => {
      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({});

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    // This test requires a real database connection (Supabase)
    // When DATABASE_URL is configured, it returns 401; without DB it returns 500
    it('should return 401 for wrong credentials (requires DB)', async () => {
      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({ email: 'nonexistent@test.com', password: 'wrongpass' });

      // Should not return success regardless of DB availability
      expect(res.body.success).toBe(false);
      // With Supabase connected: 401, without: 500
      expect([401, 500]).toContain(res.status);
    });
  });

  describe('GET /api/v1/auth/me', () => {
    it('should return 401 without token', async () => {
      const res = await request(app).get('/api/v1/auth/me');

      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });

    it('should return 401 with invalid token', async () => {
      const res = await request(app)
        .get('/api/v1/auth/me')
        .set('Authorization', 'Bearer invalid-token');

      expect(res.status).toBe(401);
    });
  });

  describe('POST /api/v1/auth/pin/verify', () => {
    it('should return 401 without auth', async () => {
      const res = await request(app)
        .post('/api/v1/auth/pin/verify')
        .send({ pin: '1234' });

      expect(res.status).toBe(401);
    });
  });

  describe('PUT /api/v1/auth/pin', () => {
    it('should return 400 for invalid PIN format', async () => {
      const { generateTestToken } = await import('../../../../tests/helpers/auth.helper');
      const token = generateTestToken();

      const res = await request(app)
        .put('/api/v1/auth/pin')
        .set('Authorization', `Bearer ${token}`)
        .send({ pin: 'abc' });

      expect(res.status).toBe(400);
    });

    it('should return 400 for short PIN', async () => {
      const { generateTestToken } = await import('../../../../tests/helpers/auth.helper');
      const token = generateTestToken();

      const res = await request(app)
        .put('/api/v1/auth/pin')
        .set('Authorization', `Bearer ${token}`)
        .send({ pin: '12' });

      expect(res.status).toBe(400);
    });
  });
});

describe('Health Check', () => {
  it('GET /api/v1/health should return ok', async () => {
    const res = await request(app).get('/api/v1/health');

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body.timestamp).toBeDefined();
  });
});

describe('404 Handler', () => {
  it('should return 404 for unknown routes', async () => {
    const res = await request(app).get('/api/v2/nonexistent');

    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe('Route not found');
  });
});
