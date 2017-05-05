import { expect } from 'chai'
import { call, put } from 'redux-saga/effects'
import axios from 'axios'
import srs from './index'

let resourced
describe('simple-redux-saga', () => {
  beforeEach(() => {
    resourced = srs('company')
  })

  describe('fetch:', () => {
    it('catches errors', () => {
      const generator = resourced.fetch()

      expect(generator.next().value).to.deep.eql(put({ type: 'COMPANIES_FETCH_START' }))
      expect(generator.next().value).to.deep.eql(call(axios.get, '/api/companies'))
      expect(generator.throw('error').value).to.deep.eql(put({ type: 'COMPANIES_FETCH_FAILED', error: 'error' }))
      expect(generator.next().value).to.deep.eql(put({ type: 'COMPANIES_FETCH_FINALLY' }))
    })

    it('follows the fetch workflow', () => {
      const generator = resourced.fetch()
      const companiesResponseMock = { data: [{ name: 1 }] }

      expect(generator.next().value).to.deep.eql(put({ type: 'COMPANIES_FETCH_START' }))
      expect(generator.next().value).to.deep.eql(call(axios.get, '/api/companies'))
      expect(generator.next(companiesResponseMock).value).to.deep.eql(put({ type: 'COMPANIES_FETCH_SUCCEEDED', payload: [{ name: 1 }] }))
      expect(generator.next().value).to.deep.eql(put({ type: 'COMPANIES_FETCH_FINALLY' }))
    })

    it('makes a query', () => {
      const generator = resourced.fetch({ desc: 'some description' })
      const companiesResponseMock = { data: [{ name: 1 }] }

      expect(generator.next().value).to.deep.eql(put({ type: 'COMPANIES_FETCH_START' }))
      expect(generator.next().value).to.deep.eql(call(axios.get, '/api/companies', { params: { desc: 'some description' } }))
      expect(generator.next(companiesResponseMock).value).to.deep.eql(put({ type: 'COMPANIES_FETCH_SUCCEEDED', payload: [{ name: 1 }] }))
      expect(generator.next().value).to.deep.eql(put({ type: 'COMPANIES_FETCH_FINALLY' }))
    })
  })

  describe('create:', () => {
    it('catches errors', () => {
      const companyMock = { name: 1 }
      const generator = resourced.create({ payload: companyMock })

      expect(generator.next().value).to.deep.eql(put({ type: 'COMPANY_CREATE_START', payload: { name: 1 } }))
      expect(generator.next().value).to.deep.eql(call(axios.post, '/api/companies', { name: 1 }))
      expect(generator.throw('error').value).to.deep.eql(put({ type: 'COMPANY_CREATE_FAILED', error: 'error' }))
    })

    it('follows the create workflow', () => {
      const generator = resourced.create({ payload: { name: 1 } })
      const companyResponseMock = { data: { _id: 'new point id' } }

      expect(generator.next().value).to.deep.eql(put({ type: 'COMPANY_CREATE_START', payload: { name: 1 } }))
      expect(generator.next().value).to.deep.eql(call(axios.post, '/api/companies', { name: 1 }))
      expect(generator.next(companyResponseMock).value).to.deep.eql(put({ type: 'COMPANY_CREATE_SUCCEEDED', payload: { name: 1, _id: 'new point id' } }))
    })
  })

  describe('update:', () => {
    it('catches errors', () => {
      const updateCompanyMock = { name: 'new name', _id: 'company_id' }
      const generator = resourced.update({ payload: updateCompanyMock })

      expect(generator.next().value).to.deep.eql(put({ type: 'COMPANY_UPDATE_START', payload: { name: 'new name', _id: 'company_id' } }))
      expect(generator.next().value).to.deep.eql(call(axios.put, '/api/companies/company_id', { name: 'new name' }))
      expect(generator.throw('error').value).to.deep.eql(put({ type: 'COMPANY_UPDATE_FAILED', payload: { error: 'error', _id: 'company_id' } }))
    })

    it('follows the update workflow', () => {
      const updateCompanyMock = { name: 'new name', _id: 'company_id' }
      const generator = resourced.update({ payload: updateCompanyMock })

      expect(generator.next().value).to.deep.eql(put({ type: 'COMPANY_UPDATE_START', payload: { name: 'new name', _id: 'company_id' } }))
      expect(generator.next().value).to.deep.eql(call(axios.put, '/api/companies/company_id', { name: 'new name' }))
      expect(generator.next().value).to.deep.eql(put({ type: 'COMPANY_UPDATE_SUCCEEDED', payload: { _id: 'company_id' } }))
    })
  })

  describe('delete:', () => {
    it('catches errors', () => {
      const companyMock = { _id: 'company_id' }
      const generator = resourced.destroy({ payload: companyMock })

      expect(generator.next().value).to.deep.eql(put({ type: 'COMPANY_DELETE_START', payload: { _id: 'company_id' } }))
      expect(generator.next().value).to.deep.eql(call(axios.delete, '/api/companies/company_id'))
      expect(generator.throw('error').value).to.deep.eql(put({ type: 'COMPANY_DELETE_FAILED', payload: { error: 'error', _id: 'company_id' } }))
    })

    it('follows the delete workflow', () => {
      const companyMock = { _id: 'company_id' }
      const generator = resourced.destroy({ payload: companyMock })

      expect(generator.next().value).to.deep.eql(put({ type: 'COMPANY_DELETE_START', payload: { _id: 'company_id' } }))
      expect(generator.next().value).to.deep.eql(call(axios.delete, '/api/companies/company_id'))
      expect(generator.next().value).to.deep.eql(put({ type: 'COMPANY_DELETE_SUCCEEDED', payload: { _id: 'company_id' } }))
    })
  })
})
