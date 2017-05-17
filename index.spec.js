'use strict';

var _chai = require('chai');

var _effects = require('redux-saga/effects');

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var resourced = void 0;
describe('simple-redux-saga', function () {
  beforeEach(function () {
    resourced = (0, _index2.default)('company');
  });

  describe('fetch:', function () {
    it('catches errors', function () {
      var generator = resourced.fetch();

      (0, _chai.expect)(generator.next().value).to.deep.eql((0, _effects.put)({ type: 'COMPANIES_FETCH_START' }));
      (0, _chai.expect)(generator.next().value).to.deep.eql((0, _effects.call)(_axios2.default.get, '/api/companies'));
      (0, _chai.expect)(generator.throw('error').value).to.deep.eql((0, _effects.put)({ type: 'COMPANIES_FETCH_FAILED', error: 'error' }));
      (0, _chai.expect)(generator.next().value).to.deep.eql((0, _effects.put)({ type: 'COMPANIES_FETCH_FINALLY' }));
    });

    it('follows the fetch workflow', function () {
      var generator = resourced.fetch();
      var companiesResponseMock = { data: [{ name: 1 }] };

      (0, _chai.expect)(generator.next().value).to.deep.eql((0, _effects.put)({ type: 'COMPANIES_FETCH_START' }));
      (0, _chai.expect)(generator.next().value).to.deep.eql((0, _effects.call)(_axios2.default.get, '/api/companies'));
      (0, _chai.expect)(generator.next(companiesResponseMock).value).to.deep.eql((0, _effects.put)({ type: 'COMPANIES_FETCH_SUCCEEDED', payload: [{ name: 1 }] }));
      (0, _chai.expect)(generator.next().value).to.deep.eql((0, _effects.put)({ type: 'COMPANIES_FETCH_FINALLY' }));
    });

    it('makes a query', function () {
      var generator = resourced.fetch({ params: { desc: 'some description' } });
      var companiesResponseMock = { data: [{ name: 1 }] };

      (0, _chai.expect)(generator.next().value).to.deep.eql((0, _effects.put)({ type: 'COMPANIES_FETCH_START' }));
      (0, _chai.expect)(generator.next().value).to.deep.eql((0, _effects.call)(_axios2.default.get, '/api/companies', { params: { desc: 'some description' } }));
      (0, _chai.expect)(generator.next(companiesResponseMock).value).to.deep.eql((0, _effects.put)({ type: 'COMPANIES_FETCH_SUCCEEDED', payload: [{ name: 1 }] }));
      (0, _chai.expect)(generator.next().value).to.deep.eql((0, _effects.put)({ type: 'COMPANIES_FETCH_FINALLY' }));
    });
  });

  describe('create:', function () {
    it('catches errors', function () {
      var companyMock = { name: 1 };
      var generator = resourced.create({ payload: companyMock });

      (0, _chai.expect)(generator.next().value).to.deep.eql((0, _effects.put)({ type: 'COMPANY_CREATE_START', payload: { name: 1 } }));
      (0, _chai.expect)(generator.next().value).to.deep.eql((0, _effects.call)(_axios2.default.post, '/api/companies', { name: 1 }));
      (0, _chai.expect)(generator.throw('error').value).to.deep.eql((0, _effects.put)({ type: 'COMPANY_CREATE_FAILED', error: 'error' }));
    });

    it('follows the create workflow', function () {
      var generator = resourced.create({ payload: { name: 1 } });
      var companyResponseMock = { data: { _id: 'new point id' } };

      (0, _chai.expect)(generator.next().value).to.deep.eql((0, _effects.put)({ type: 'COMPANY_CREATE_START', payload: { name: 1 } }));
      (0, _chai.expect)(generator.next().value).to.deep.eql((0, _effects.call)(_axios2.default.post, '/api/companies', { name: 1 }));
      (0, _chai.expect)(generator.next(companyResponseMock).value).to.deep.eql((0, _effects.put)({ type: 'COMPANY_CREATE_SUCCEEDED', payload: { name: 1, _id: 'new point id' } }));
    });
  });

  describe('update:', function () {
    it('catches errors', function () {
      var updateCompanyMock = { name: 'new name', _id: 'company_id' };
      var generator = resourced.update({ payload: updateCompanyMock });

      (0, _chai.expect)(generator.next().value).to.deep.eql((0, _effects.put)({ type: 'COMPANY_UPDATE_START', payload: { name: 'new name', _id: 'company_id' } }));
      (0, _chai.expect)(generator.next().value).to.deep.eql((0, _effects.call)(_axios2.default.put, '/api/companies/company_id', { name: 'new name' }));
      (0, _chai.expect)(generator.throw('error').value).to.deep.eql((0, _effects.put)({ type: 'COMPANY_UPDATE_FAILED', payload: { error: 'error', _id: 'company_id' } }));
    });

    it('follows the update workflow', function () {
      var updateCompanyMock = { name: 'new name', _id: 'company_id' };
      var generator = resourced.update({ payload: updateCompanyMock });

      (0, _chai.expect)(generator.next().value).to.deep.eql((0, _effects.put)({ type: 'COMPANY_UPDATE_START', payload: { name: 'new name', _id: 'company_id' } }));
      (0, _chai.expect)(generator.next().value).to.deep.eql((0, _effects.call)(_axios2.default.put, '/api/companies/company_id', { name: 'new name' }));
      (0, _chai.expect)(generator.next().value).to.deep.eql((0, _effects.put)({ type: 'COMPANY_UPDATE_SUCCEEDED', payload: { _id: 'company_id' } }));
    });
  });

  describe('delete:', function () {
    it('catches errors', function () {
      var companyMock = { _id: 'company_id' };
      var generator = resourced.destroy({ payload: companyMock });

      (0, _chai.expect)(generator.next().value).to.deep.eql((0, _effects.put)({ type: 'COMPANY_DELETE_START', payload: { _id: 'company_id' } }));
      (0, _chai.expect)(generator.next().value).to.deep.eql((0, _effects.call)(_axios2.default.delete, '/api/companies/company_id'));
      (0, _chai.expect)(generator.throw('error').value).to.deep.eql((0, _effects.put)({ type: 'COMPANY_DELETE_FAILED', payload: { error: 'error', _id: 'company_id' } }));
    });

    it('follows the delete workflow', function () {
      var companyMock = { _id: 'company_id' };
      var generator = resourced.destroy({ payload: companyMock });

      (0, _chai.expect)(generator.next().value).to.deep.eql((0, _effects.put)({ type: 'COMPANY_DELETE_START', payload: { _id: 'company_id' } }));
      (0, _chai.expect)(generator.next().value).to.deep.eql((0, _effects.call)(_axios2.default.delete, '/api/companies/company_id'));
      (0, _chai.expect)(generator.next().value).to.deep.eql((0, _effects.put)({ type: 'COMPANY_DELETE_SUCCEEDED', payload: { _id: 'company_id' } }));
    });
  });
});