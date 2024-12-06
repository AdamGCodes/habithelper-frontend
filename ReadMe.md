# HabitHelper - Project Overview

## Description

**HabitHelper** is a CRUD app with a Django backend serving a React frontend that was created as a project for a Software Engineering Bootcamp. The basic concept of the app is a set of tools which can help people form better habits. The initial design coprised of 3 main componants:
- Temperance timers are timers that are create and set by the user and can help them keep track of their progress by showing how long it has been since they last took part in an unwanted habit that they wish to drop. If the user has a slip they can reset their time. Timers can be created, edited and detleted as required. 
- A journaling feature which encourages the user to put down thoughts and feelings around their habits in order to help them be more mindful of their habits and the causes of them in the hope that this understanding will help them quit. 
- Habithelpers, are like a todo list of desired habits that the user wishes to engage in. The user can create the habithelpers and set a frequency for how many times a week they would like to do that activity whether it is reading, working out, meditating or anything else.   


[**HbitHelpers Deployment link:**](https://myhabithelper.netlify.app/)


## Getting Started / Code Installation

This is a web-based app, so no installation is required. 

To view the code for this project, visit the GitHub repository:  

[**Backend GitHub Repository**](https://github.com/AdamGCodes/habithelper-backend)
[**Frontend GitHub Repository**](https://github.com/AdamGCodes/habithelper-frontend)

## Timeframe & Working Team (Solo)

This project was the final of 4 projects for a General Assembly 12 week bootcamp in software engineering. We were given just over a week to complete the project. It was a solo project. 


## Technologies Used

### Planning and Documentation:
- Markdown
- Figma
- Trello
- dbdiagram.io

### Developer Tools:
- VSCode

### Front End:
- React.js
- HTML
- CSS
- SCSS
- JavaScript

### Back End:
- Postman for testing backend routes
- PostgreSQL (NEON)
- Python
- Django (related libraries and plugins)


### Hosting / Cloud Storage:
- Netlify ( Frontend Deployment)
- Heroku ( Backend Deployment)

## Brief

This was a one-week project to create a CRUD application with a Django backend serving a React fronten with a focus on applying skills learned in previous weeks of the bootcamp. The deliverables included:
- User stories
- Wireframing
- Planning RESTful routes
- Planning data architecture
- Creating a CRUD site using REACT with an Django backend and a PostgreSQL database.
- Deploying the above site

## Planning

Once the concept of the application had been conceived I started with the user story in order to best consider the needs, expectations and experience of various end users. This helped to fully form the concept in order to be able to consider next steps. 

Following this I set about creating a wireframe informed by my user stories. I chose to create only a mobile base model for my wireframe for the following reasons:
- Adhering to a mobile first methodology and the advantages that this brings
- By it's nature I would forsee this site being used by the vast majority of users on a mobile device
- The concept I had in mind required a clean and minimalist layout with few graphics or additional decorative styles and therefore will probably require very little addaptation to scale to larger screens as long as it is build with responsiveness in mind.

I used the wireframe and the user stories to create my restful routing table and further consider the type of data interactions what would be required in each section of the app. 

With all of the above in place and a little research into options for calendar views and todo items with dates I was able to create my ERD to plan out my data relationships and the tables the project would require.

---

## Build / Code Process

Starting with the back end I created my Django project and built out the apps required for it's Minimum Viable Product(MVP).  As this was my first Django project I took it all fairly slowly and carefully testing frequently to avoid having to spend lots of time debugging issues down the line. 

One of the first things that struck me in building out apps is the incredible power of building utils and applying them with decorators in Django. While building the views it makes the code so much more efficient and clean and really enabled me to concentrate on the pure logic of my apps features and interactions. It's also so much easier to read. The first instance of this that I implemented was for exception handling as we had been shown this in our lectures. 

It was incredibly helpful that the documenation for Django and Django REST framework were so clear and easily accessible. The build for the back end went pretty smoothly but did take some time purely due to the number of apps that I had identified as necisary. I wanted to create the models and routes for my stretch goals as it was far easier to do that at this point rather than having to go back and create them at a later date. It was frustrating spending time on elements of the app I knew might not make it into my project in time for evaluation but I still feel it was the right thing to do to ensure I was able to expand on the project in the long run. 

Once I had created all the apps and tested all of my routes using Postman, I set about creating the front end. 

I had decided early on that I would like to extend my use of modular design for this project. I planned to use elements in a more granular way to that of my previous react project, I also decided that I would endeavour to fully utilise modular styling using Scss. I knew this would add a little extra complexity to the build but felt it was an important part of the learning experience. 

The front end build started with the Journal feature as this was the most straightforward CRUD feature and one that I felt I was fairly familiar with. This went fairly smoothly and on completing this and connecting to the back end I decided to spend some time styling to give a rough overview of the site to help me test and update styling as I progressed through the project. 

Having tested that my frontend and backend were connected and fucntioning correctly with Journalling I moved to the User/Authentication routes and built out a landing page the the required forms. From here I set about creating the temperance timers for which I knew I would have to take some time to work out how to make these work in the way I had invisaged. This was a challenge but when I first got a timer ticking away on the page it was massively rewarding. I finished getting these to where I wanted them. By this time it was close to the submission deadline. I had wanted to create my own modal to for the form to create and edit timers. 

Again I made the choice to create this myself rather than use a premade one from a library as I wanted to understand the process as well as possible. I ran into some issue with this but it was worth the delays to learn this skills. 

At the time I made the decision that to get the habithelpers (todo) feature working the way I planned was not practical in the time left so I spent the time I had before submission creating a dashboard for signed in users. This being a one stop shop to view timers and a small selection of journals in one place. 

One of the features that was new to me was creating my own modal. This was a bit of a challenge but I was glad I was able to create it as an componant to reuse accross the site. 
```html
const SiteModal = ({children, onClose, onCancel}) => {
    
    return (
        <div className={styles.modalContainer} onClick={(e) => { 
            if (e.target.className === "modalContainer") {
                onClose(); }}}>
            <div className={styles.modal}>
                {children}
                <p className={styles.close} onClick={ () => onClose("The close button was clicked") }>&times;</p>
                {/* <button type='submit'>{'Create'} Timer</button>
                <button onClick={() => onCancel()} >Cancel</button> */}
            </div>
            
        </div>
    )
}

export default SiteModal;
```

```html

```


## Challenges

I probably learned more on this project than at during any other aspect of the course. I had prevoiusly alwasy set incredibly achievable MVPs with the aim of putting less pressure on myself but ensuring plenty of stretch goals. My MVP plan for this project was far more abitious effectively created three CRUD apps in one and including a number of features that I had not previously used. 

Aside from the modal above there were a number of challenges. One was correctly impletmenting modular sytling. Upon deployment I realised that I had not made correct uses of Modular Scss and it created some unexpected results that frankly made the site a bit of a mess. But going through and correcting this was a great learning experience. 

Creating the timers and having the ability to rest and delete them from a single page was an intersting challenge as I'd been used to being able to refer to the url params for identification but this wasn't too hard to overcome. 

The Dashboard was far more challenging than I had anticipated but it hightlighted some really important errors in how I'd created, connected and styled componants. I had to refactor a lot of the code and stylesheets that I'd written in order to keep the code efficient and easily reuse componants accross the site. I feel the project was far better for having been through this process. 


## Wins

Although I didn't want to rely too heavily on premade componants from libraries I did use it for hamburger menu animation and it was a huge time saver. I felt this was a good use case as I've previously created these manually so understand the process. 

I'm really happy with how the timers worked out and they function pretty much exactly as I'd envisaged. As with my first project on the course I am glad that I decided to go for a concept that I've not seen a lot of. It made me read a lot, understand similiar function but have to think through how to change these to act in the way I required them to.

## Key Learnings / Takeaways

1. **Time Management:**  
   I hit MVP on two of my three planned key features but did run out of time to complete the third. I made a consious decision to really challenge myself with the project but it was a lesson in hitting a ballance between ambition and what I can realistcally get through in the given timeframe. This being especially true when adding multiple features that were new to me and would require time to learn/workout. The project overal met the requirements to pass but I was disapointed not to get all three features ready to present. 

2. **Modular Design:**  
   The project gave me a great experience of the importance of effictive modular design for both code and styling. This was a fairly small project but it gave me a better appreciation of who the benefits of doing this well is exponential as a project grows. I can see how vital this concept is when working with a massive application in order to make the build and maintenance manageable. 

## Bugs
1. Having some inconsistant result with the sites background image. This requires further testing to correct. 
2. The habithelper (todo) section is incomplete. 
3. Further testing required.



## Future Improvements

1. Finish creating the habithelper todo element of the project.
2. Add a streak tracker and award system to give people badges as the keep up good habits or get time away from their unwanted habits. 
3. Adding a feature of inspiring quotes to appear on the dashboard.
4. Allowing users to add their own set of quotes to personalise the experience. 
5. An option for users to set their own background image. 
6. A social elmement where users who chose to connect can encourage eachother and congratulate on awards. 

