#### The Idea

To empower a school admin to completely control the software that powers their school. They own the code to the [Gradebook](https://github.com/benmartinson/gradebook), as it's meant to be an open source tool. AdminHub (aka SchoolAdmin) helps them manage the Gradebook code, and all the data and customizations used by it. 

#### Why?

Having worked for EdTech SaaS companies, I know that a major limitation for schools is that they are unable to fully customize the software that they use, creating the UI's that they truly want. Every school, or school district, has their own ways of doing things, and although these EdTech companies attempt to allow for customizations, and do provide separate databases for each client school, they have to do it with one single codebase. This often leads to buggy interfaces, and very slow implementation of customer specific features.
 
#### How?

As AI continues to progress, and makes it easier to code, school admins, or the IT teams, will be to maintain the software themselves. They just need guidance and a foundation to work with.

### Try it
https://admin-hub-sepia.vercel.app/dashboard

### Test credentials
```
Email: benmartinson92@gmail.com
Password: Test123!
```

#
<img width="1440" alt="image" src="https://github.com/user-attachments/assets/ed5cd92e-d8f3-4c29-9f34-9602d7259e55" />

---

<img width="1434" alt="image" src="https://github.com/user-attachments/assets/f111106d-1ecb-4c93-b749-835bc2b83669" />


---

### Admin Tools
##### Customizations
Admins can keep track of all the settings that are available for the Gradebook. The Gradebook fetches these settings and conditionally renders based on them. The idea is that the admin would add settings and then would actually change the Gradebook code to account for them. They can also choose to allow the teacher to switch on/off these settings from within the gradebook (not yet implemented).

<img width="808" alt="image" src="https://github.com/user-attachments/assets/94cd0a59-d48a-45ae-a8ab-a7fa9c4be029" />

##### School data (not yet implemented fully)

Admins will be able to create and manage all data that is used by the Gradebook. Such as classes, grading periods, assignments, grades, etc. A future feature idea is to allow creation of new tables, schemas changes/additions from within AdminHub.

##### Code change reporting (not yet implemented)

Admins will be able to see code changes they make in their Gradebook repo (implemented with Github actions), if they choose to, to help them keep track what needs to be done and what past changes have been made to the code. They will also see requests for changes from the teachers, who can report bugs or request new features.

##### Gradebook Users (not yet implemented)

The Gradebook will have users, teachers and also students, that can login and see the custom UI's that the admin has created. The admin will control user accounts from AdminHub.

---

#### How it works
The admin would create their own repo that is a fork of the original Gradebook repo, and setup a [Convex ](https://www.convex.dev/) account to store all their data. They sign up for AdminHub (or SchoolAdmin) to be able to customize the Gradebook, .

[Convex ](https://www.convex.dev/) is used to create a realtime connection between the frontend and the backend (of both applications). This is what allows the smooth updates between the AdminHub, and the Gradebook running in the iframe. If this was used by a real school, they would need to setup their own convex account and Gradebook fork. They would then configure it within the AdminHub 'setup' tab. 

---

#### Run locally
```
npm install
```
then run front end server:
```
npm run dev:frontend
```
and backend on a different terminal tab:
```
npm run dev:backend
```
