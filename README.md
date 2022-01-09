# WIP!
The app is a Work in Progress! 
It still needs work on both front and back end.

# 🐈🐈‍⬛ romina-client
Frontend for the Romina app (React - CRUD with Axios and REST)

## 📝 App overview
This app is build with the goal of helping me with scheduling a proper day-care for my kitties, when I am not at home for multiple days. When I am on holiday, I want to make sure that my cats, Romeo and Nina, will be well taken care of. I am lucky enough to have several friends that love my kitties, and that enjoy spending time with them. Through this app, I want to build a simple system to track which of my friends is available on which day and time slot, so that I can have a quick and snappy overview of when my cats won't have any of my friends available to take care of them, which will mean that on those days and times I will have to make sure to book a cat-sitter.

## 🎯 Basic logic and goals
The app allows me to create a trip, with a name and start-end dates. After creating a trip, I can see all days in one single overview. After clicking on a day, I can add slots to it. I want to add slots when I know that my friends are available to come and take care of R&N, and I know from experience that there are times  where people can only come for a quick check (<30 mins, mostly checking on food/water/litter, and playing shortly with them), while other times they can or want to stay longer, maybe for a whole day of WFH, or even moving in for several days in a row. Adding a slot will allow me to select the type of stay (long VS short), and the timeframe (morning, afternoon, evening, night or unknown - for the situations where they know they could come, but they still don't know at what time exactly). I can also add specific notes to the slots. Each slot is associated with a carer and tasks. Carers and Tasks can be added via the app, from their own tabs. A carer can be a friend, or a professional cat sitter. Carers can also have a phone number and an email. Tasks, on the other hand, can be cat-related (feed them, add water to bowl, etc), or not, such as "water plants", "wait for package", and so on. 

## 😎 Additional (not implemented yet)
- If there are one or more days without care, these will be highlighted in the UI, showing me in a quick overview when I'll have to book a professional cat sitter.
- If, upon creation, a trip is set to "not confirmed", then it will be slightly greyed out. Also, it won't highlight the days that are missing care.
- The trips overview will be split in past and upcoming trips.
- Alerts will show when attempting to delete anything, asking a second time before permanently deleting from DB (right now the modal is not implemented everywhere yet).
- Icons will be added close to the main tasks regarding the kitties. 
- If a slot's timeframe is set to "unknown", it will show in a different color.
- General UI improved with colored labels, tags, etc.
- The "night" slots won't allow for any tasks to be associated.
- Clicking on a specific day will "open up" the day overview in one single screen, giving additional details. 
- Refactor and clean code
- Split in reusable components (only partly done)


# 🛫 Start the project

Yarn the project and start it with `yarn start`.
Runs the app in the development mode.\
Open [http://localhost:8081](http://localhost:8081) to view it in the browser.


