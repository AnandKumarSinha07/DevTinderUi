import { BrowserRouter,Routes,Route } from "react-router-dom";
import Body from "./Body";
import Login from "./Login";
import Profile from "./Profile";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from './Feed'
import Connection from "./Connection";
import Request from "./Request";



function App() {
  return (
    <div> 
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body/>}>
            <Route path="/" element={<Feed/>}/>  
            <Route path="/login" element={<Login/>}/>
            <Route path="/profile" element={<Profile/>}/>  
            <Route path="/connection" element={<Connection/>}/>   
            <Route path="/request" element={<Request/>}/> 
          </Route>
        </Routes>
      </BrowserRouter>
      </Provider>
      
    </div>
  );
}

export default App;
