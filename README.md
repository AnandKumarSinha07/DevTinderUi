# Devtinder

--Created a vite+react config in the project
--Remove unnecessairy code from the project
--Install the npm module in the project
--Install tailwind in your project
--Add the navbar component to the app
--separate the navbar.jsx component  file
--install routing in the project we will used react router 
--Make a body component as the main routing component and rend everything inside that it 
--means     --Body 
              --Navbar
              --Outlet
                  ---Nested children of the Body component




--Es6 module in which export work with module.export and import work with require
--common js module in which export work with export default Navbar and import work with import Navbar from directory


--UI Day-2
-First make post login api call and bring the login and password data to the backend
-set cors issue in the backend by whitlisting the origin and credentials set to true
-set cors issue in the frontend to get token like withcredentials set to true

-Install react-redux and redux toolkit and create a store
-create a slice and add the reducer in the store and use the
-provider to wrap the app by passing appstore as a prop to the provider

--To add data to the redux store we  use to dispatch an action with the help of  useDispatch hook
--To get data from the store we use selector hook known as useSelector which will select the state according to its Nested



--The problem is since the user is not login then also he can access all the other router
  -Like profile and feed and the other problem is once the user loged in and if he try to 
  -refresh then automatically he is logout because redux store which is storing the user data
  -is getting empty in each store that is why we have to solve this problem

--The solution is since the body is the root component which is loading when the app loads
  -so we are going to check whether the user is store in the redux store or not if the user 
  -is valid with the token then he can access all the routes since body is the root component
  -of the application and inside this with the help of outlet we have nested all the children
  -component so that is the approach since the body components load then after that we want 
  -to check whther the user data is there or not in the redux store  with the help of useeffect
  -hook and if not then navigate the user to login page okay   


-- Signup on the aws
-- create a ec2 instance
-- make changes in the secret key
-- ssh -i "devTinder-secret.pem" ubuntu@ec2-52-62-196-90.ap-southeast-2.compute.amazonaws.com 
-- install node version









