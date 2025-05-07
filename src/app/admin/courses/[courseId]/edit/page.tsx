import { getCourseIdTag } from '@/features/courses/db/cache/courses';
import { cacheTag } from 'next/dist/server/use-cache/cache-tag';
import React from 'react'

async function getCourse(id: string) {
  'use cache'
  cacheTag(getCourseIdTag(id))
}

const EditCoursePage = async ({params} : {params: Promise<{ courseId: string }>}) => {
  const {courseId} = await params;
  const course = await getCourse(courseId);

  return (
    <div>EditCoursePage</div>
  )
}

export default EditCoursePage