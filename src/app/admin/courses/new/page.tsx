import CourseForm from '@/features/courses/components/CourseForm'
import PageHeader from '@/components/PageHeader'
import React from 'react'

const NewCoursePage = () => {
  return (
    <div className='container my-6'>
      <PageHeader title='New Course' />
      <CourseForm />
    </div>
  )
}

export default NewCoursePage