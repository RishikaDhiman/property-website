import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

    const [signIn, setSignIn] = useState(true);

    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);
    const phone = useRef(null);
    

    const navigate = useNavigate();

    const handleButtonClicked= async()=>{

        // console.log(email, password, name, phone);

      try{
        if(signIn){
          console.log("signn innnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn")
          const response = await fetch("http://localhost:3000/login",{
            method : "POST",
            headers : {
              "Content-Type":"application/json"
            },
            body : JSON.stringify({
              email : email.current.value, 
              password : password.current.value
            })
          })

          const data = await response.json();
          console.log(data);

          if(response.status == 201){
            // Set token in local storage
            localStorage.setItem("token", data.token);
            email.current.value = ""
            password.current.value = ""
            toast.success("Succesfully Registered");
            navigate("/homepage")
          }
          else{
            toast.error(data);
          }

        }
        else if(!signIn){
          console.log("signn upppppppppppppppppppppppppppppppppppppppppppppp")
          const response = await fetch("http://localhost:3000/register-user",{
            method : "POST",
            headers : {
              "Content-Type":"application/json"
            },
            body : JSON.stringify({
              name : name.current.value,
              email : email.current.value, 
              phone : phone.current.value,
              password : password.current.value,
            })
          })

          const data = await response.json();
          console.log(data);

          if(response.status == 201){
            // Set token in local storage
            localStorage.setItem("token", data.token);
            name.current.value = ""
            email.current.value = ""
            phone.current.value = ""
            password.current.value = ""
            toast.success("Succesfully Logged In");
            navigate("/homepage")

          }
          else{
            toast.error(data);
          }

        }
      }
      catch(e){
        console.log(e);
      } 

    }

    const handleSignInClick=()=>{
        setSignIn(!signIn);
    }

  return (
    <div className='Login'>
      <form onSubmit={(e)=>e.preventDefault()} className='login-box'>
          <h1>{signIn?"Sign In":"Sign Up"}</h1>
          {!signIn && <div className='login-small-box'>
            <input type="text" placeholder='Enter your name' ref={name}></input>
          </div>}
          <div className='login-small-box'>
            <input type="email" placeholder='Enter your email address' ref={email}></input>
          </div>
          {!signIn && <div className='login-small-box'>
            <input type="text" placeholder='Enter your phone number' ref={phone}></input>
          </div>}
          <div className='login-small-box'>
            <input type="password" placeholder='Enter your password' ref={password}></input>
          </div>
          {/* {errorMessage!=null && <p style={{color: "rgb(165, 4, 4)"}}>{errorMessage}</p>} */}
          <button onClick={handleButtonClicked}>{signIn?"Sign In":"Sign Up"}</button>
          <p onClick={handleSignInClick} style={{cursor:'pointer'}}>{signIn?"New to RealEstate ? Sign up now":"Already have a account ? Sign in now"}</p>
        </form>
    </div>
  )
}

export default Login
