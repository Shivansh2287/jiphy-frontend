import React,{useEffect, useState} from 'react'
import {Link,useHistory } from 'react-router-dom'
import M from 'materialize-css'
import '../../styles/nav.css'


const Signup = () => {
    const history = useHistory()
   const [name,setName]= useState("")
   const [password,setPassword]= useState("")
   const [email,setEmail]= useState("")
   const [image,setImage]=useState("")
   const [url,setUrl]=useState(undefined)

    useEffect(()=>{
       if(url){
           uploadFields()
       }
    },[url])


   const uploadPic=()=>{
       const data = new FormData()
       data.append("file",image)
       data.append("upload_preset","jiphy-social")
       data.append("cloud_name","jiphy")
       fetch("https://api.cloudinary.com/v1_1/jiphy/image/upload",{
                 method:'post',
                 body:data
  })
  .then(res=>res.json())
  .then(data=>{
    setUrl(data.url)
  })
  .catch(err=>{
    console.log(err)
  })

   }

  const uploadFields=()=>{
 if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
       return M.toast({html:"invalid email",classes:"#3f51b5 indigo"}) 
    }
    fetch("/signup",{
        method:'post',
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            name,
            password,
            email,
            pic:url
        })
    })
    .then(res=>res.json())
    .then(data=>{
       if(data.error){
            M.toast({html:data.error,classes:"#e040fb purple accent-2"})
       }
       else{
           M.toast({html:data.message,classes:"#3f51b5 indigo"})
            history.push('/signin')
       }
    }).catch(err=>{
        console.log(err)
    })
  }


const PostData=()=>{
    if(image){
        uploadPic()
    }
    else{
          uploadFields()
    }
   
}

    return ( 
        <div className="mycard">
             <div className="card auth-card input-field">
        
              <h2>Jiphy</h2>
        <input
        type='text' placeholder='name'
         value={name}
         onChange={(e)=>{
             setName(e.target.value)
         }}
        />        
              
        <input
        type='text' placeholder='email'
        value={email}
         onChange={(e)=>{
             setEmail(e.target.value)
         }}
        />   
          <input
        type='password' placeholder='password'
        value={password}
         onChange={(e)=>{
             setPassword(e.target.value)
         }}
        />     

        <div className="file-field input-field">
      <div className="btn #7e57c2 deep-purple lighten-1">
        <span>upload profile pic</span>
        <input type="file"
        onChange={(e)=>setImage(e.target.files[0])}
        
        />
      </div>
      <div className="file-path-wrapper">
        <input className="file-path validate" type="text"/>
      </div>
    </div>

         <button className="btn waves-effect waves-light #7e57c2 deep-purple lighten-1" 
         onClick={()=>PostData()}
         
         >Signup
 
  </button>
  <h5>
      <Link to='/signin'>Alredy have account</Link>
  </h5>
   <h6>
      <Link to='/reset'>forgot password</Link>
  </h6>
      </div>
        </div>
     );
}
 
export default Signup;