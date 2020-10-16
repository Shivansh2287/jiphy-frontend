import React,{useEffect,createContext, useReducer,useContext} from 'react';
import './styles/App.css';
import './components/Navbar'
import NavBar from './components/Navbar';
import {BrowserRouter,Route, Switch, useHistory} from 'react-router-dom'
import Home from './components/screen/Home'
import Signin from './components/screen/Signin'
import Signup from './components/screen/Signup'
import Profile from './components/screen/Profile'
import CreatePost from './components/screen/CreatePost'
import UserProfile from './components/screen/UserProfile'
import SubUserPost from './components/screen/subUserPost'
import NewPassword from './components/screen/NewPassword'
import Reset from './components/screen/Reset'
import {reducer,initialState} from './reducre/useReducer'


export const UserContext = createContext()


const Routing=()=>{

   const history = useHistory()
   const{state,dispatch}=useContext(UserContext)
   useEffect(()=>{
   const user = JSON.parse(localStorage.getItem("user"))
   if(user){
      dispatch({type:"USER",payload:user})
   
   }
   else{
       if(!history.location.pathname.startsWith('/reset'))
      history.push('/signin')
   }
   },[])
   return(
      <Switch>
<Route exact path="/">
       <Home/>
    </Route>
    <Route path="/signup">
       <Signup/>
    </Route>
    <Route exact path="/profile">
       <Profile/>
    </Route>
    <Route path="/signin">
       <Signin/>
    </Route>
    <Route path="/create">
       <CreatePost/>
    </Route>
    <Route path="/profile/:userid">
       <UserProfile />
    </Route>
    <Route path="/myfollowingpost">
       <SubUserPost/>
    </Route>
    <Route exact path="/reset">
       <Reset/>
    </Route>
     <Route path="/reset/:token">
        <NewPassword />
      </Route>
    </Switch>
   )
}

function App() {
   const [state,dispatch]= useReducer(reducer,initialState)
  return (
     <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
    
    <NavBar/>
     <Routing/>
    </BrowserRouter>
    </UserContext.Provider>
    
  );
}

export default App;
