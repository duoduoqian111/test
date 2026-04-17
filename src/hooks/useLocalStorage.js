import { useState, useEffect } from 'react';

/**
 * 自定义Hook: useLocalStorage
 * 用于管理 localStorage 数据的读取和保存
 * @param {string} key - localStorage 存储的键名
 * @param {any} initialValue - 初始值（当 localStorage 中没有数据时使用）
 * @returns {Array} [storedValue, setValue] - 存储的值和设置值的函数
 */
function useLocalStorage(key, initialValue) {
  // 创建一个状态来存储值
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // 从 localStorage 获取数据
      const item = window.localStorage.getItem(key);
      // 解析 JSON 数据，如果不存在则返回初始值
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // 如果发生错误，返回初始值
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // 创建一个函数来更新值，同时保存到 localStorage
  const setValue = (value) => {
    try {
      // 支持传入函数或直接传入值
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // 更新状态
      setStoredValue(valueToStore);
      // 保存到 localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;
