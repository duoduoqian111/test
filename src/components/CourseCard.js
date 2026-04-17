import React from 'react';

function CourseCard({ 
  course, 
  onDelete, 
  onStudy, 
  onEdit, 
  isEditing, 
  editingData, 
  onSaveEdit, 
  onCancelEdit 
}) {
  // 处理编辑表单变化
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    if (editingData) {
      onEdit({ ...editingData, [name]: value });
    }
  };

  // 渲染编辑模式
  if (isEditing) {
    return (
      <div className="course-card editing">
        <div className="card-header">
          <span className="category-tag">{editingData.category}</span>
        </div>
        <div className="edit-form">
          <input
            type="text"
            name="name"
            value={editingData.name}
            onChange={handleEditChange}
            className="edit-input"
            placeholder="课程名称"
          />
          <textarea
            name="description"
            value={editingData.description}
            onChange={handleEditChange}
            className="edit-textarea"
            placeholder="课程简介"
          />
          <div className="edit-row">
            <select
              name="category"
              value={editingData.category}
              onChange={handleEditChange}
              className="edit-select"
            >
              <option value="前端">前端</option>
              <option value="后端">后端</option>
              <option value="数据">数据</option>
              <option value="设计">设计</option>
            </select>
            <input
              type="text"
              name="duration"
              value={editingData.duration}
              onChange={handleEditChange}
              className="edit-input"
              placeholder="课程时长"
            />
          </div>
          <div className="edit-actions">
            <button onClick={onSaveEdit} className="save-btn">保存</button>
            <button onClick={onCancelEdit} className="cancel-btn">取消</button>
          </div>
        </div>
      </div>
    );
  }

  // 渲染正常模式
  return (
    <div className="course-card">
      <div className="card-header">
        <span className="category-tag">{course.category}</span>
        <span className="duration">⏱️ {course.duration}</span>
      </div>
      <h3 className="course-name">{course.name}</h3>
      <p className="course-description">{course.description}</p>
      <div className="card-actions">
        <button 
          onClick={() => onStudy(course.name)} 
          className="study-btn"
        >
          🎯 开始学习
        </button>
        <button 
          onClick={() => onEdit(course)} 
          className="edit-btn"
        >
          ✏️ 编辑
        </button>
        <button 
          onClick={() => onDelete(course.id)} 
          className="delete-btn"
        >
          🗑️ 删除
        </button>
      </div>
    </div>
  );
}

export default CourseCard;
