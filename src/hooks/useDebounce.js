import { useState, useEffect } from 'react';

/**
 * 自定义Hook: useDebounce
 * 用于对值进行防抖处理，常用于搜索输入
 * @param {any} value - 需要防抖处理的值
 * @param {number} delay - 延迟时间（毫秒），默认500ms
 * @returns {any} - 返回防抖后的值
 */
function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // 创建一个定时器
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // 清理函数：在下次 effect 执行前清除定时器
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
