import { Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState, useEffect } from 'react';
import axios from "../axios";

function Login() {
  const navigate = useNavigate();
  const [email, set_email] = useState("");



  // Handle login user
  async function handleLogin(e) {
    e.preventDefault();
    console.log(email)

    try {
      const response = await axios.post("/api/user/login", { email });
      console.log(response)

      if (response.status === 200) {
        console.log(response)
        localStorage.setItem("user_email", response?.data?.email)
        localStorage.setItem("user_id", response?.data?._id)
        navigate("/lead-information")
        toast.success("Login Successfull")
      }
    } catch (error) {
      console.log(error)
    }
  }



  return (
    <div className="container">
      <div className="row">
        <div className="col-md-5">
          <img src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg?w=740&t=st=1670847256~exp=1670847856~hmac=3e81bde61dde45ff67105a44fcd00e7312ce9a9d62fecdafc8e4a3b358a30ee7" className='login-sec' alt="login" />
        </div>
        <div className="col-md-7">
          <Form onSubmit={handleLogin} className='form-login w-100'>
            <h1 className="text-capitalize fs-3">Login account</h1>
            <Form.FloatingLabel label="someone@email.com" className='mb-3'>
              <Form.Control value={email} onChange={e => set_email(e.target.value)} type='email' placeholder='someone@email.com' />
            </Form.FloatingLabel>
            <Button type="submit" variant='primary' className='create-sec p-2 w-70'>Login</Button>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Login