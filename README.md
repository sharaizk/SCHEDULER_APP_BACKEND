# ITS THE BACKEND REPOSITORY FOR TIMESHEET APPLICATION
I have created this backend using NODEJS, EXPRESSJS, BCRYPTJS, JSONWebToken(JWT), MONGOOSE and MONGODB.
My Planning: 
To desing the Frontend the plan was to design the Ui simple and add a little Ux. I spent more time on logical parts of the project. Yes, my plan of providing a DATA/SECURITY BREACH was never in my initial plans. I thought of it as i was testing the app and saw an opportunity for a highjacker by which the site could have vulnerability issues.
For backend, the initial schema design was to hold the date in the array of sheets but that would have slowed down the response time as sheets of 1 year of 1 user would be stored in one Array but i went with excluding the Date from array. Now they sheets of 1 year of 1 user will be stored in 365 documents. Now 1 sheet of 1 date can be accessed very easily and quickly.

FRONTEND RESPONSE:
1) I have created two panels. One is Admin Panel and Other is Employee Panel.
2) Both the panels, should be able to access only by their accounts. For this i have designed the appbar such that it shows options according to the type of the account but if someone tries to hijack the system by typing the url manually then the hijacker will be prompted by security breach warning and will be addressed to navigate back to its specified page.
3) Both Admin and Employee have different log in pages and after loging in they are navigated to their specified page.
4) During the process of Login each person's specified Token will be created and will be store in Local Storage. It could be stored in Cookies but since the app had to be deployed on a subdomain thus cookies wouldn't have worked on it. So, i decided to store the Token on localstorage and if a person leaves and refreshes the page. The app will check for the token and if there is a token then the page will retrieve all of its information from the database otherwise app will ask it to relogin.
5) If an admin tries to login from Employee page then the admin will be prompted by a warning saying that he/she is not an employee, and vice versa.
6) After Logging In as an admin, Admin will have option to registered a new Employee or a new admin and look the timesheet of all the users.
7) In Register page an admin can add the user by specifying it's role.
8) In Admin home page, admin can see the whole list of employees and can click on an employee to go through it's timesheet.
10) For Employee Home page, the user can create it's timesheet by just clicking on Clock-In button and the employee will be provided with an option to add a reason of clocking and click on clock-out button to clock out and the cycle will continue until the day finishes.
-------------
BACKEND RESPONSE:
1) There are two Schemas in database 1) Users to store all the users and 2) Sheet to store all the timesheets
2) Userschema holds the username, id, password and role of each user. And password is hashed + salted by using BcryptJS to provide security.
3) Each username will be unique to prevent data redundancy.
4) SheetSchema has the Timesheet id, UserId, Date, and the array of sheets. UserID is stored to specify the creator of timesheet. Date is used to specify on which date it was created, this will make the searching a timesheet much faster as the API will ask for timeSheet of a UserID and Date. Each sheet has an array which contains all the enteries made in one date.
5) The reason why i went in an array as say USERID=1, and DATE=2021-07-09 will have an array containing all the sheets of user 1 created on Date 2021 07 09. Which will make searching much faster as the api will quickly loop through where it meets the user id and date it will send a response containing all the sheets, it doesn't matter if the sheet is 1000 enteries long or 1 entery long, the response time will be the same. If I had gone with the traditional way of containing all the shee enteries individually instead of array. Then would have to send 1000 queries to the backend if the list is 1000 long. Thus, increasing the time.
--------------
If i was given a month to spend on this project then i would have spent more time on Ui/Ux Designing, i would have allow the admin to choose the date from the calendar and see the enteries of the employees on that specified date. I would have provided customization option such as username, password update. Profile Picture support. I would have provide the user with forgot password option. I would have allowed the admin to see the charts of employee performances and see their average clocked-in time on each day

