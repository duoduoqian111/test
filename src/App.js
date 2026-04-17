import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import Header from './components/Header';
import CourseList from './components/CourseList';
import Footer from './components/Footer';
import useLocalStorage from './hooks/useLocalStorage';
import useDebounce from './hooks/useDebounce';
import './App.css';

// 初始课程数据
const initialCourses = [
  { id: 1, name: 'React 基础', description: '学习 React 的基础知识，包括组件、props、state 等', category: '前端', duration: '20小时' },
  { id: 2, name: 'JavaScript 进阶', description: '深入学习 JavaScript 高级特性', category: '前端', duration: '30小时' },
  { id: 3, name: 'Node.js 开发', description: '掌握服务器端 JavaScript 开发', category: '后端', duration: '25小时' },
  { id: 4, name: 'Python 数据分析', description: '使用 Python 进行数据处理和分析', category: '数据', duration: '35小时' },
  { id: 5, name: 'Vue3 框架', description: '学习 Vue3 最新版本的核心概念', category: '前端', duration: '22小时' },
];

function App() {
  // 使用自定义Hook useLocalStorage 管理课程数据持久化
  const [courses, setCourses] = useLocalStorage('courses', initialCourses);
  
  // 搜索关键词
  const [searchKeyword, setSearchKeyword] = useState('');
  // 使用 useDebounce 对搜索关键词进行防抖处理
  const debouncedSearchKeyword = useDebounce(searchKeyword, 300);
  
  // 分类筛选
  const [categoryFilter, setCategoryFilter] = useState('全部');
  // 课程数量统计
  const [courseCount, setCourseCount] = useState(0);
  // 正在编辑的课程
  const [editingCourse, setEditingCourse] = useState(null);
  // 新增课程表单数据
  const [newCourse, setNewCourse] = useState({ name: '', description: '', category: '前端', duration: '' });
  // 表单错误提示
  const [formError, setFormError] = useState('');

  // 使用 useRef 获取输入框DOM元素引用
  const nameInputRef = useRef(null);

  // 课程分类列表
  const categories = ['全部', '前端', '后端', '数据', '设计'];

  // 使用 useMemo 缓存过滤后的课程列表，避免不必要的重新计算
  const filteredCourses = useMemo(() => {
    const filtered = courses.filter(course => {
      const matchesSearch = course.name.toLowerCase().includes(debouncedSearchKeyword.toLowerCase()) ||
                            course.description.toLowerCase().includes(debouncedSearchKeyword.toLowerCase());
      const matchesCategory = categoryFilter === '全部' || course.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
    return filtered;
  }, [courses, debouncedSearchKeyword, categoryFilter]);

  // 使用 useEffect 更新课程数量统计
  useEffect(() => {
    setCourseCount(filteredCourses.length);
  }, [filteredCourses]);

  // 使用 useCallback 优化删除课程事件处理函数，避免子组件不必要地重新渲染
  const deleteCourse = useCallback((id) => {
    if (window.confirm('确定要删除这门课程吗？')) {
      setCourses(prevCourses => prevCourses.filter(course => course.id !== id));
    }
  }, [setCourses]);

  // 使用 useCallback 优化添加课程事件处理函数
  const addCourse = useCallback(() => {
    // 输入校验：课程名称不能为空
    if (!newCourse.name.trim()) {
      setFormError('课程名称不能为空');
      return;
    }
    if (!newCourse.description.trim()) {
      setFormError('课程简介不能为空');
      return;
    }
    if (!newCourse.duration.trim()) {
      setFormError('课程时长不能为空');
      return;
    }

    const course = {
      id: Date.now(),
      ...newCourse
    };
    setCourses(prevCourses => [...prevCourses, course]);
    setNewCourse({ name: '', description: '', category: '前端', duration: '' });
    setFormError('');

    // 使用 useRef 实现添加课程后输入框自动聚焦
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [newCourse, setCourses]);

  // 使用 useCallback 优化开始编辑课程事件处理函数
  const startEdit = useCallback((course) => {
    setEditingCourse({ ...course });
  }, []);

  // 使用 useCallback 优化保存编辑事件处理函数
  const saveEdit = useCallback(() => {
    if (!editingCourse.name.trim()) {
      alert('课程名称不能为空');
      return;
    }
    setCourses(prevCourses => 
      prevCourses.map(c => c.id === editingCourse.id ? editingCourse : c)
    );
    setEditingCourse(null);
  }, [editingCourse, setCourses]);

  // 使用 useCallback 优化取消编辑事件处理函数
  const cancelEdit = useCallback(() => {
    setEditingCourse(null);
  }, []);

  // 使用 useCallback 优化学习按钮点击事件处理函数
  const handleStudy = useCallback((courseName) => {
    alert(`开始学习: ${courseName}！祝你学习愉快！`);
  }, []);

  // 使用 useCallback 优化表单输入变化事件处理函数
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setNewCourse(prev => ({ ...prev, [name]: value }));
    if (formError) setFormError('');
  }, [formError]);

  return (
    <div className="app">
      <Header 
        title="课程管理系统"
        courseCount={courseCount}
      />
      
      <main className="main-content">
        {/* 搜索和筛选区域 */}
        <div className="filter-section">
          <div className="search-box">
            <input
              type="text"
              placeholder="搜索课程名称或简介..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="category-filter">
            <span className="filter-label">分类筛选：</span>
            {categories.map(cat => (
              <button
                key={cat}
                className={`category-btn ${categoryFilter === cat ? 'active' : ''}`}
                onClick={() => setCategoryFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 新增课程表单 */}
        <div className="add-course-section">
          <h3>➕ 添加新课程</h3>
          <div className="add-form">
            <input
              ref={nameInputRef}
              type="text"
              name="name"
              placeholder="课程名称"
              value={newCourse.name}
              onChange={handleInputChange}
              className="form-input"
            />
            <input
              type="text"
              name="description"
              placeholder="课程简介"
              value={newCourse.description}
              onChange={handleInputChange}
              className="form-input"
            />
            <select
              name="category"
              value={newCourse.category}
              onChange={handleInputChange}
              className="form-select"
            >
              {categories.filter(c => c !== '全部').map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <input
              type="text"
              name="duration"
              placeholder="课程时长（如：20小时）"
              value={newCourse.duration}
              onChange={handleInputChange}
              className="form-input"
            />
            <button onClick={addCourse} className="add-btn">
              添加课程
            </button>
          </div>
          {formError && <p className="error-message">{formError}</p>}
        </div>

        {/* 课程列表 */}
        <CourseList 
          courses={filteredCourses}
          onDelete={deleteCourse}
          onStudy={handleStudy}
          onEdit={startEdit}
          editingCourse={editingCourse}
          onSaveEdit={saveEdit}
          onCancelEdit={cancelEdit}
        />

        {/* 统计信息 */}
        <div className="stats-section">
          <div className="stat-card">
            <span className="stat-number">{courseCount}</span>
            <span className="stat-label">课程总数</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{categories.filter(c => c !== '全部').length}</span>
            <span className="stat-label">分类数量</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{courses.reduce((acc, c) => acc + parseInt(c.duration) || 0, 0)}</span>
            <span className="stat-label">总学时</span>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
