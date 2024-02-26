# Project Description

This is a task manager website underdevelopment, that will allow users to easily manage their tasks.

# Currently Supported Features
1- Full authentication: create new account, sign in and out with email and password + sign in with Google
2- keep user signed in using local storage
2- Tasks Screen:
    - Easily create a new task and update or remove an existing one
    - Filtration by: date and status
    - Sorting by: date

Under Development: 
1- Progress Page:  will allow the user to track their progress during specific period with aid of charts or/and diagrams. 
2- Schedule Page: Calendar showing the required tasks per each respective day
3- Theme: Implementing dark themings for dark theme lovers
4- Profile: manage settings, and update user data

# Project Structure
The project is divided into different Folders:

- assets: contains all logos and images
- Screens: representing the pages, currently only Tasks is working (bad naming, would be changed to Pages in a future update)
- components: reusable components
- store: contains all the redux related files (reducers and the store)
- api folder: contains api functions definition related to realtime database 
- utils: contains configs for firebase along with authentication functions
- separate typing files:   
      - components (Component.types)
      - redux (Store.types)
      - entities(Tasks, and any general other entities in the future) 
      - User ( User related types)
Note: The reason I used this approach of separate folder for each type is to make it serve as a template for future expansion and not make it limited to just the current functionality

# Installation
requirements: Node.js version 12.2.0 or higher

steps: 
1- clone the project
2- npm install 
3- npm run dev 

for more information please refer to this link: https://www.freecodecamp.org/news/get-started-with-vite/
or to go to the offical website: https://v3.vitejs.dev/guide/





