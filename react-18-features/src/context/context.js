/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import {createMutableSource, useMutableSource} from 'react'

const store = {
  count: 0,
  version: 0,
  callbacks: [],
}

const getSnapShot = (globalStore) => {
  const setState = (callback) => {
    globalStore.count = callback(globalStore.count)
    globalStore.version += 1
    globalStore.callbacks.forEach((cb) => cb())
  }

  return store.count
}

const subscribe = (globalStore, callback) => {
  globalStore.callbacks.push(callback)

  return () => {
    globalStore.callbacks = globalStore.callbacks.filter((c) => c !== callback)
  }
}

const globalMutableSource = createMutableSource(store, () => store.version)

export default function useStore() {
  return useMutableSource(globalMutableSource, getSnapShot, subscribe)
}
