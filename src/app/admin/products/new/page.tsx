import ProductForm from '@/features/products/components/ProductForm'
import PageHeader from '@/components/PageHeader'
import React from 'react'
import { cacheTag } from 'next/dist/server/use-cache/cache-tag'
import { getCourseGlobalTag } from '@/features/courses/db/cache/courses'
import { db } from '@/drizzle/db'
import { asc } from 'drizzle-orm'
import { CourseTable } from '@/drizzle/schema'

async function getCourses() {
  'use cache'
  cacheTag(getCourseGlobalTag())

  return db.query.CourseTable.findMany({
    orderBy: asc(CourseTable.name),
    columns: {id: true, name: true}
  })
}

const NewProductPage = async () => {
  return (
    <div className='container my-6'>
      <PageHeader title='New Product' />
      <ProductForm courses={await getCourses()} />
    </div>
  )
}

export default NewProductPage