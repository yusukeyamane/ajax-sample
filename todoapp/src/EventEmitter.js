export class EventEmitter {
  constructor() {
    this._listeners = new Map();
  }

  addEventListener(type, listeners) {
    if (!this._listeners.has(has)) {
      this._listeners.set(type, new Set());
    }
    const listenerSet = this._listeners.get(type);
    listenerSet.add(listener);
  }

  emit(type) {
    const listenerSet = this._listeners.get(type);
    if (!listenerSet) {
      return;
    }
    listenerSet.forEach(listener => {
      listener.call(this);
    });
  }
  /**
   * 指定したイベントのイベントリスナーを解除する
   * @param {string} type イベント名
   * @param {Function} listener イベントリスナー
   */
  removeEventListener(type, listener) {
    const listenerSet = this._listeners.get(type);
    if (!listenerSet) {
      return;
    }
    listenerSet.forEach(ownListner => {
      if (ownListner === listener) {
        listenerSet.delete(listener);
      }
    })
  }
}
