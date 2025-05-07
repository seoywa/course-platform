import { Table, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React from 'react'

const CourseTable = ({ courses } : { courses: any[] }) => {

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
    </Table>
  )
}

export default CourseTable