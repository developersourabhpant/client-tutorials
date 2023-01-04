// import { useState } from 'react'
// import { Form, Button } from 'react-bootstrap'
// import { Link, useNavigate } from "react-router-dom"
// import { toast } from "react-toastify"
// import axios from "../axios";
// function Registration() {
//     const navigate = useNavigate()
//     const [name, set_name] = useState()
//     const [email, set_email] = useState()
//     const [password, set_password] = useState()
//     const [confirm_password, set_confirm_password] = useState()


//     // Handle create new user
//     async function handleRegister(e) {
//         e.preventDefault();

//         const data = { name, email, password }

//         try {
//             if (password.trim() === confirm_password.trim()) {
//                 const response = await axios.post("/api/user/register", data)

//                 if (response.status === 200) {
//                     navigate("/login")
//                     toast.success("User Created Successfully")
//                 }
//             } else {
//                 toast.error("Passwords Does Not Match")
//             }
//         } catch (error) {
//             toast.error(error?.response?.data?.message)
//         }
//     }

//     return (
//         <div className="container">
//             <div className="row">
//                 <div className="col-md-6">
//                     <img src="https://img.freepik.com/premium-vector/get-glimpse-account-opening-flat-illustration_203633-7948.jpg" className='register-sec' alt="register" />
//                 </div>
//                 <div className="col-md-6">
//                     <Form onSubmit={handleRegister} className='form-register w-100'>
//                         <h1 className="text-capitalize fs-3">Course Registration</h1>
//                         <Form.FloatingLabel label="Full Name" className='mb-3'>
//                             <Form.Control value={name} onChange={e => set_name(e.target.value)} type='text' placeholder='Full Name' />
//                         </Form.FloatingLabel>
//                         <Form.FloatingLabel label="someone@email.com" className='mb-3'>
//                             <Form.Control value={email} onChange={e => set_email(e.target.value)} type='email' placeholder='someone@email.com' />
//                         </Form.FloatingLabel>
//                         <Form.FloatingLabel label="Create Password" className='mb-3'>
//                             <Form.Control value={password} onChange={e => set_password(e.target.value)} type='password' placeholder='Create Password' />
//                         </Form.FloatingLabel>
//                         <Form.FloatingLabel label="Confirm Created Password" className='mb-3'>
//                             <Form.Control value={confirm_password} onChange={e => set_confirm_password(e.target.value)} type='password' placeholder='Confirm Created Password' />
//                         </Form.FloatingLabel>
//                         <Button type="submit" variant='primary' className='create-sec p-2 w-70'>Create Account</Button>
//                         <div className='login-part'><Link to="/login" className="btn btn-success "> Login</Link></div>

//                     </Form>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Registration