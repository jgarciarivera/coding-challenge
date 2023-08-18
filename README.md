# Umbrage Studios Coding Challenge
This is a front-end client that interacts with Umbrage Studios's APIs to authenticate a user, fetch and display a list of people, and provide granular details about a person when selected.

<img width="700" alt="Login" src="https://github.com/jgarciarivera/coding-challenge/assets/20329478/5e855bd6-da9d-4323-9752-8cc43137df98">
<img width="700" alt="People" src="https://github.com/jgarciarivera/coding-challenge/assets/20329478/26e88bff-1141-421c-825d-669e7ebb7427">
<img width="700" alt="Comments" src="https://github.com/jgarciarivera/coding-challenge/assets/20329478/26d7840e-a0fd-43cb-8fc2-adabeb579445">

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

I chose Create React App to quickly and effectively set up the skeleton of my React application so that I wouldn't have to spend unnecessary time configuring my build and project structure. I also chose to use React Bootstrap components to provide visually appealing UI components right out of the box, so as to minimize the time spent modifying HTML and CSS.

After learning some of the basics of React, I decided to break down the project into 3 main files/ components: the main App, the Login form, and the People page. I figured the best way to toggle between the two main views (Login and People) would be to use a state variable via the useState hook. I realized I could use a bearer token as a state: before logged in, the token value is empty (so display the Login view), and after logging in, the token is set (so display the People view). I used this bearer token to determine which component to render.

Afterwards, I decided to display the list of People using cards, which is a simple, visually appealling way to display single units of content containing both images and text. As for the detailed comments, I initially tried to incorporate an accordion element onto the bottom of my card, because of the built-in expand/ collapse functionality which would serve well for hiding and showing detailed content. However, I could not get this working, so I decided to use a modal component.

Initially, after fetching the list of People, I called the Person API for every individual in the list and use this data to populate the details modal component. However, I quickly realized this was a suboptimal solution; "eagerly loading" each Person's data would not scale as the number of People increased. I realized I should only trigger a request when a user clicks on a Person to view more details, rather than fetching detailed data for each person by default. The intial approach was slow and made for a bad user experience.

Programmatically, I made sure to implement try-catch blocks and exception handling for the HTTP requests, since these have the potential to fail. I also chose to use the useEffect hook, particularly for updating the UI after fetching data like the list of People/ individual Person details. I also decided to use Fetch API and the async/ await pattern for fetching the data.

Finally, I made cosmetic changes to improve the user experience, such as: disabling the login button if either the username or password field is empty, and adding popup alerts to notify the user when an API request has failed (including the response status and message). 


