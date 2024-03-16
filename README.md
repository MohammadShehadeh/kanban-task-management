# Frontend Mentor - Kanban task management web app solution

This is a solution to the
[Kanban task management web app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/kanban-task-management-web-app-wgQLt-HlbB).
Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
  - [Built with](#built-with)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device\'s screen size
- See hover states for all interactive elements on the page
- Create, read, update, and delete boards and tasks
- Receive form validations when trying to create/edit boards and tasks
- Mark subtasks as complete and move tasks between columns
- Hide/show the board sidebar

Expected Behavior:

- Boards
  - Clicking different boards in the sidebar will change to the selected board.
  - Clicking "Create New Board" in the sidebar opens the "Add New Board" modal.
  - Clicking in the dropdown menu "Edit Board" opens up the "Edit Board" modal where details
    can be changed. (**In Progress**)
  - Columns are added and removed for the Add/Edit Board modals. (**In Progress**)
  - Deleting a board deletes all columns and tasks and requires confirmation.
- Columns
  - A board needs at least one column before tasks can be added. If no columns exist, the "Add
    New Task" button in the header is disabled.
  - Clicking "Add New Column" opens the "Edit Board" modal where columns are added. (**In Progress**)
- Tasks
  - Adding a new task adds it to the bottom of the relevant column.
  - Updating a task's status will move the task to the relevant column.

Bonus:

- The tasks can be dragged and dropped to a new column.

### Screenshot

![Screenshot](/public/challenge-screenshot.png)

### Links

- Live Site URL: [link](https://kanban-task-management-psi.vercel.app/)

### Built with

- Next.js and React.js
- CSS Modules
- Drag and Drop API
- React Hook Form
- Zod - TypeScript-first schema validation
- Zustand - State management tool

### Useful resources

- [Zod](https://zod.dev/)
- [Zustand](https://zustand-demo.pmnd.rs/)

## Author

- Website - [Mohammad Shehadeh](https://mohammadshehadeh.com)
- LinkedIn - [Mohammad Shehadeh](https://www.linkedin.com/in/mohammadshhadeh/)
