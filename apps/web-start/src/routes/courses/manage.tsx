import { Link, createFileRoute } from '@tanstack/react-router';
import { queryOptions, useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { backendFetcher } from '../../integrations/fetcher';
import type { CourseOut } from '@repo/api/courses';

const coursesQueryOptions = queryOptions({
  queryKey: ['courses'],
  queryFn: backendFetcher<Array<CourseOut>>('/courses'),
});

export const Route = createFileRoute('/courses/manage')({
  component: RouteComponent,
  loader: ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(coursesQueryOptions);
  },
});

type CourseFormData = {
  course_name: string;
  course_desc: string;
  users_id: string;
};

function RouteComponent() {
  const queryClient = useQueryClient();
  const { data: courses } = useSuspenseQuery(coursesQueryOptions);
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<CourseOut | null>(null);
  const [formData, setFormData] = useState<CourseFormData>({
    course_name: '',
    course_desc: '',
    users_id: '',
  });

  const createMutation = useMutation({
    mutationFn: async (data: CourseFormData) => {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/courses`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) throw new Error('Failed to create course');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      closeForm();
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<CourseFormData> }) => {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/courses/${id}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) throw new Error('Failed to update course');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      closeForm();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/courses/${id}`,
        {
          method: 'DELETE',
        }
      );
      if (!response.ok) throw new Error('Failed to delete course');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
  });

  const openCreateForm = () => {
    setEditingCourse(null);
    setFormData({
      course_name: '',
      course_desc: '',
      users_id: '',
    });
    setIsFormOpen(true);
  };

  const openEditForm = (course: CourseOut) => {
    setEditingCourse(course);
    setFormData({
      course_name: course.course_name,
      course_desc: course.course_desc,
      users_id: course.users_id,
    });
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingCourse(null);
    setFormData({
      course_name: '',
      course_desc: '',
      users_id: '',
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCourse) {
      updateMutation.mutate({ id: editingCourse.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      deleteMutation.mutate(id);
    }
  };


  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ marginBottom: '2rem' }}>
        <h1>Manage Courses</h1>
        <nav style={{ marginTop: '1rem' }}>
          <Link to="/" style={{ marginRight: '1rem' }}>← Back to Home</Link>
        </nav>
      </header>

      <div style={{ marginBottom: '2rem' }}>
        <button
          onClick={openCreateForm}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '1rem',
          }}
        >
          + Create New Course
        </button>
      </div>

      {/* Course List */}
      <div style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: '#f5f5f5' }}>
            <tr>
              <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '2px solid #ddd' }}>
                Course Name
              </th>
              <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '2px solid #ddd' }}>
                Description
              </th>
              <th style={{ padding: '1rem', textAlign: 'center', borderBottom: '2px solid #ddd', width: '200px' }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {courses.length === 0 ? (
              <tr>
                <td colSpan={3} style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
                  No courses yet. Create one to get started!
                </td>
              </tr>
            ) : (
              courses.map((course) => (
                <tr key={course.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '1rem' }}>
                    <strong>{course.course_name}</strong>
                  </td>
                  <td style={{ padding: '1rem', color: '#666' }}>
                    {course.course_desc || <em>No description</em>}
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>
                    <button
                      onClick={() => openEditForm(course)}
                      style={{
                        padding: '0.5rem 1rem',
                        marginRight: '0.5rem',
                        backgroundColor: '#0070f3',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(course.id, course.course_name)}
                      style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: '#e00',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                      }}
                      disabled={deleteMutation.isPending}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Create/Edit Form Modal */}
      {isFormOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
          onClick={closeForm}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: '8px',
              maxWidth: '500px',
              width: '90%',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>{editingCourse ? 'Edit Course' : 'Create New Course'}</h2>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                  Course Name *
                </label>
                <input
                  type="text"
                  value={formData.course_name}
                  onChange={(e) => setFormData({ ...formData, course_name: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '1rem',
                  }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                  Description *
                </label>
                <textarea
                  value={formData.course_desc}
                  onChange={(e) => setFormData({ ...formData, course_desc: e.target.value })}
                  required
                  rows={4}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '1rem',
                    fontFamily: 'inherit',
                  }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                  User ID * (Owner)
                </label>
                <input
                  type="text"
                  value={formData.users_id}
                  onChange={(e) => setFormData({ ...formData, users_id: e.target.value })}
                  required
                  placeholder="Enter user UUID"
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '1rem',
                  }}
                />
                <small style={{ color: '#666' }}>
                  The UUID of the user who owns this course
                </small>
              </div>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={closeForm}
                  style={{
                    padding: '0.5rem 1.5rem',
                    backgroundColor: '#eee',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createMutation.isPending || updateMutation.isPending}
                  style={{
                    padding: '0.5rem 1.5rem',
                    backgroundColor: '#0070f3',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  {createMutation.isPending || updateMutation.isPending
                    ? 'Saving...'
                    : editingCourse
                    ? 'Update Course'
                    : 'Create Course'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
