import React from 'react';
import CourseCard from './CourseCard';

function CourseList({ courses, onDelete, onStudy, onEdit, editingCourse, onSaveEdit, onCancelEdit }) {
  return (
    <div className="course-list">
      <h2 className="section-title">📖 课程列表</h2>
      {courses.length === 0 ? (
        <div className="empty-state">
          <p>暂无课程，请添加新课程</p>
        </div>
      ) : (
        <div className="course-grid">
          {courses.map(course => (
            <CourseCard
              key={course.id}
              course={course}
              onDelete={onDelete}
              onStudy={onStudy}
              onEdit={onEdit}
              isEditing={editingCourse && editingCourse.id === course.id}
              editingData={editingCourse}
              onSaveEdit={onSaveEdit}
              onCancelEdit={onCancelEdit}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default CourseList;
