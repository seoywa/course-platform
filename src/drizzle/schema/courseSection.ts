

import { integer, pgEnum, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelper";
import { CourseTable } from "./course";
import { relations } from "drizzle-orm";

export const courseSectionStatuses = ['private', 'public'] as const 
export type CourseSectionStatus = (typeof courseSectionStatuses)[number]
export const courseSectionStatusEnum = pgEnum(
  'course_section_status',
  courseSectionStatuses
)

export const CourseSectionTable = pgTable('course_sections', {
  id,
  name: text().notNull(),
  status: courseSectionStatusEnum().notNull().default('private'),
  order: integer().notNull(),
  courseId: uuid().notNull().references(() => CourseTable.id, {onDelete: 'cascade'}),
  createdAt,
  updatedAt
})

export const CourseSectionRelationships = relations(
  CourseSectionTable, ({ many, one }) => ({
    course: one(CourseTable, {
      fields: [CourseSectionTable.courseId],
      references: [CourseTable.id]
    })
  })
)