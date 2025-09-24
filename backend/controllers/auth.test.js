const { register, login } = require('./auth');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

jest.mock('../models/user', () => ({
  findOne: jest.fn(),
  create: jest.fn(),
}));
jest.mock('bcryptjs', () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
}));
jest.mock('../util/SECRET', () => ({
  SECRET: 'fake_secret',
}));


const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('auth', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('loob uue kasutaja', async () => {
      const req = {
        body: { name: 'Test', email: 'test@test.com', password: 'secret' },
      };
      const res = mockRes();

      User.findOne.mockResolvedValue(null);
      bcrypt.hash.mockResolvedValue('hashed_pw');
      User.create.mockResolvedValue({ id: 1 });

      await register(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ where: { email: 'test@test.com' } });
      expect(bcrypt.hash).toHaveBeenCalledWith('secret', 10);
      expect(User.create).toHaveBeenCalledWith({
        name: 'Test',
        email: 'test@test.com',
        password: 'hashed_pw',
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ message: 'Konto loodud!' });
    });

    it('tagastab 400 kui email on juba kasutusel', async () => {
      const req = {
        body: { name: 'Test', email: 'test@test.com', password: 'secret' },
      };
      const res = mockRes();

      User.findOne.mockResolvedValue({ id: 1 });

      await register(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Email on juba kasutusel' });
    });
  });

  describe('login', () => {
    it('tagastab tokeni kui parool on õige', async () => {
      const req = { body: { email: 'test@test.com', password: 'secret' } };
      const res = mockRes();

      const fakeUser = { id: 1, email: 'test@test.com', password: 'hashed_pw' };
      User.findOne.mockResolvedValue(fakeUser);
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue('fake_token');

      await login(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ where: { email: 'test@test.com' } });
      expect(bcrypt.compare).toHaveBeenCalledWith('secret', 'hashed_pw');
      expect(jwt.sign).toHaveBeenCalledWith({ id: 1 }, 'fake_secret', { expiresIn: '1h' });
      expect(res.json).toHaveBeenCalledWith({ token: 'fake_token' });
    });
  });
});
