export const ErrorCodes = {
  PROJECTS_LOAD_FAILED: {
    title: 'Failed to load projects',
    description: 'Could not connect to the server.',
  },
  PROJECT_NOT_FOUND: {
    title: 'Project not found',
    description: 'The requested project with ID: ${id} does not exist.',
  },
  PROJECT_DETAILS_LOAD_FAILED: {
    title: 'Failed to load project details',
    description: 'Could not fetch the project details for ID: ${id}.',
  },
  PROJECT_CREATE_FAILED: {
    title: 'Failed to create project',
    description: 'There was an error saving the new project.',
  },
  PROJECT_UPDATE_FAILED: {
    title: 'Failed to update project',
    description: 'There was an error updating the project details for ID: ${id}.',
  },
  PROJECT_STATUS_UPDATE_FAILED: {
    title: 'Failed to update status',
    description: 'Could not change the project status.',
  },
  PROJECT_ARCHIVE_FAILED: {
    title: 'Failed to archive',
    description: 'Could not archive the project with ID: ${id}.',
  },
  PROJECT_RESTORE_FAILED: {
    title: 'Failed to restore',
    description: 'Could not restore the project with ID: ${id}.',
  },
  PROJECT_DELETE_FAILED: {
    title: 'Failed to delete project',
    description: 'Could not delete the project with ID: ${id}.',
  },
  PROJECT_COPY_FAILED: {
    title: 'Failed to duplicate the project',
    description: 'Could not duplicate the project with ID: ${id}.',
  },
  TASKS_LOAD_FAILED: {
    title: 'Failed to load tasks',
    description: 'Could not fetch tasks for the project with ID: ${projectId}.',
  },
  TASK_CREATE_FAILED: {
    title: 'Failed to create task',
    description: 'There was an error saving the new task.',
  },
  TASK_UPDATE_FAILED: {
    title: 'Failed to update task',
    description: 'There was an error updating the task with ID: ${taskId}.',
  },
  TASK_DELETE_FAILED: {
    title: 'Failed to delete task',
    description: 'There was an error deleting the task with ID: ${taskId}.',
  },
  PROJECTS_SEARCH_FAILED: {
    title: 'Search failed',
    description: 'Could not fetch search results from the server.',
  },
} as const;

export type ErrorCode = keyof typeof ErrorCodes;
