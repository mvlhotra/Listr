# Team LISTR Project Plan

## Smart To Do List

### Data
- User/Profile
- List Types
  - List Items (INPUT)
- API Content (REFERENCE)
  - To sort
  - To provide context on review

### User Story

User: Traveller
As a traveller I want to take recommendations as they are provide and view them in an organized manner at a later time because I can't generate my whole travel plan in the moment.

User: Student
As a student I don't always have time to watch all my friends Netflix recommendations and I want to record them because when I finally sit down to watch I can never remember what is good.

User: Busy Parent
As a parent I am shopping and planning for multiple people and I need a way to keep them updated and at hand because I am constantly on the go.

User: Influencer
As an influencer I want an easy way to share my incredible taste because people keep asking for it.

### Aha Moment

Our big, impressive feature is the auto-organization capability give user input.

The secondary big, impressive feature is the reference data provided for each list item.

### ERD

See ERD file.

### Deployment

Start with localhost.

Deploy to Heroku if we get there.

### Routes

127.0.0.1:8080/:
- login
- register
- :username &rightarrow Profile
  - :username/update
  - :username/delete
  - :username/add
- :username/lists
- :username/lists/:list/
  - :item/delete
  - :item/add
  - :item/update
  - :item/

### MVP
- Login
- Main Page
  - Smart Adder
- Individual List
- Backend