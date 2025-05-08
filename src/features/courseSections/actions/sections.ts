"use server";

import { courseSchema } from "@/features/schemas/courses";
import { getCurrentUser } from "@/services/clerk";
import { z } from "zod";
import { 
  canCreateCourseSections,
  canDeleteCourseSections,
  canUpdateCourseSections,
} from "../permissions/sections";
import { sectionSchema } from "../schemas/sections";
import { getNextCourseSectionOrder, insertSection, updateSection as updateSectionDB, deleteSection as deleteSectionDB } from "../db/sections";

export async function createSection(
  courseId: string,
  unsafeData: z.infer<typeof sectionSchema>
) {
  const { success, data } = sectionSchema.safeParse(unsafeData);

  if (!success || !canCreateCourseSections(await getCurrentUser())) {
    return { error: true, message: "There was an error creating your section" };
  }

  const order = await getNextCourseSectionOrder(courseId);

  await insertSection({ ...data, courseId, order });

  return { error: false, message: "Successfully created this section" };
}

export async function updateSection(
  id: string,
  unsafeData: z.infer<typeof sectionSchema>
) {
  const { success, data } = sectionSchema.safeParse(unsafeData);

  if (!success || !canUpdateCourseSections(await getCurrentUser())) {
    return { error: true, message: "There was an error updating this section" };
  }

  await updateSectionDB(id, data);

  return { error: false, message: "Successfully updated this section" };
}

export async function deleteSection(id: string) {
  if (!canDeleteCourseSections(await getCurrentUser())) {
    return { error: true, message: "There was an error deleting this section" };
  }

  await deleteSectionDB(id);

  return { error: false, message: "Successfully deleted this section" };
}
