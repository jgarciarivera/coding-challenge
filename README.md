# Umbrage Studios Coding Challenge
This is a front-end client that interacts with Umbrage Studios's APIs to authenticate a user, fetch and display a list of people, and provide granular details about a person when selected.

# Technologies Used
- JavaScript, HTML, CSS
- React, React Bootstrap

# Installation
1. Clone the repository locally or download the ZIP file
2. Make sure the following dependencies are installed on your machine: Node, Node Package Manager
3. In the terminal, navigate to the project directory (.../umbrage)
4. Run the following commands: `npm install`, `npm start`
5. The web client will be launched on your web browser! 

# Decision-Making Process

I built this application using JavaScript and React because these technologies enable developers to create responsive, dynamic user interfaces. Additionally, as a novice front-end developer, I went with the most popular technologies because they tend to have the most robust official documentation and online tutorials.

I chose Create React App to quickly and effectively set up the skeleton of my React application so that I wouldn't have to spend unnecessary time configuring my build and project structure. Less time spent configuring the project = more time coding. I also chose to use React Bootstrap components to provide visually appealing user interface components right out of the box, so as to minimize the time spend modifying HTML and CSS.

After learning some of the basics of React, I decided to break down the project into 3 main files/ components: the main App, the Login form, and the People page. I figured the best way to toggle between the two main views (Login and People) would be to use a state variable. I realized I could use a bearer token as a state: before logged in, the token value is empty, and after logging in, the token is set. I used this bearer token to conditionally render the Login form first, and only render the People page once succesfully authenticated/ a bearer token has been retrieved.

Afterwards, I decided I would display the list of People in individual cards, which is a simple, visually appealling way to display single units of content with both images and text. As for the detailed comments, initially I tried to incorporate an accordion element onto the bottom of my card, because of the built-in expand/ collapse functionality which would service well for hiding and showing detailed views. However, I could not get this working, so I decided to use a modal component. Initially, after fetching the list of People, I called the Person API for every individual in the list. However, I quickly realized this was a suboptimal solution; "eagerly loading" each Person's data would not scale as the input, the list of People, grew. I realized I should only trigger a request when a Person is selected, rather than triggering a request for all Persons by default.

After this, I added some cosmetic styling to improve the user experience, such as: disabling the login button if either the username or password field was empty, adding popup alerts to notify the user when an API request has failed (including the response status and message).


