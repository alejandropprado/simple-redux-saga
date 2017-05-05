import { call, put } from 'redux-saga/effects'
import axios from 'axios'
import _ from 'lodash'

export default _resource => {
  const RESOURCE_PLURAL = _resource.slice(-1).toLowerCase() == 'y'
    ? `${_resource.slice(0, -1).toUpperCase()}IES`
    : `${_resource.toUpperCase()}S`

  const RESOURCE_SINGULAR = _resource.toUpperCase()
  const resource = RESOURCE_PLURAL.toLowerCase()

  return {
    fetch: function* fetch (params) {
      yield put({ type: `${RESOURCE_PLURAL}_FETCH_START` })
      try {
        const base = [axios.get, `/api/${resource}`]
        const args = params ? base.concat({ params }) : base
        const response = yield call(...args)
        yield put({ type: `${RESOURCE_PLURAL}_FETCH_SUCCEEDED`, payload: response.data })
      } catch (error) {
        yield put({ type: `${RESOURCE_PLURAL}_FETCH_FAILED`, error })
      }
      yield put({ type: `${RESOURCE_PLURAL}_FETCH_FINALLY` })
    },
    create: function* create ({ payload }) {
      yield put({ type: `${RESOURCE_SINGULAR}_CREATE_START`, payload })
      try {
        const response = yield call(axios.post, `/api/${resource}`, payload)
        yield put({ type: `${RESOURCE_SINGULAR}_CREATE_SUCCEEDED`, payload: Object.assign({}, payload, response.data) })
      } catch (error) {
        yield put({ type: `${RESOURCE_SINGULAR}_CREATE_FAILED`, error })
      }
    },
    update: function*  update ({ payload }) {
      yield put({ type: `${RESOURCE_SINGULAR}_UPDATE_START`, payload })
      try {
        const response = yield call(axios.put, `/api/${resource}/${payload._id}`, _.omit(payload, ['_id']))
        yield put({ type: `${RESOURCE_SINGULAR}_UPDATE_SUCCEEDED`, payload: _.pick(payload, ['_id']) })
      } catch (error) {
        yield put({ type: `${RESOURCE_SINGULAR}_UPDATE_FAILED`, payload: { ..._.pick(payload, ['_id']), error } })
      }
    },
    destroy: function* destroy ({ payload }) {
      yield put({ type: `${RESOURCE_SINGULAR}_DELETE_START`, payload })
      try {
        const response = yield call(axios.delete, `/api/${resource}/${payload._id}`)
        yield put({ type: `${RESOURCE_SINGULAR}_DELETE_SUCCEEDED`, payload: _.pick(payload, ['_id']) })
      } catch (error) {
        yield put({ type: `${RESOURCE_SINGULAR}_DELETE_FAILED`, payload: { ..._.pick(payload, ['_id']), error } })
      }
    }
  }
}
