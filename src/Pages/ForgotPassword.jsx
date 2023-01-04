// import React, { useState } from 'react'
// import { Button, Form } from 'react-bootstrap'
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { Link } from "react-router-dom";
// import axios from "../axios";
// function ForgotPassword() {

//     const navigate = useNavigate();
//     const [email, set_email] = useState("");

//     // Send verification token to email
//     async function handleToken(e) {
//         e.preventDefault()

//         try {
//             const response = await axios.post("/api/user/forgot-password", { email })

//             if (response.status === 200) {
//                 console.log(response.data)
//                 toast.success("Verification Token Sent")
//                 navigate(`/reset-password/${email}`)
//             }
//         } catch (error) {
//             toast.error(error?.response?.data?.message);
//         }
//     }

//     return (
//         <div className="container">
//             <div className="row">
//                 <div className="col-md-8">
//                     <img src="https://st3.depositphotos.com/3382541/12567/v/950/depositphotos_125678798-stock-illustration-stressed-young-man-holding-his.jpg" className='forget-sec' alt="login" />
//                 </div>
//                 <div className="col-md-4">
//                     <Form onSubmit={handleToken} className='form-section w-100'>
//                         <h1 className="text-capitalize fs-3">forget account</h1>
//                         <Form.FloatingLabel label="someone@email.com" className='mb-3'>
//                             <Form.Control value={email} onChange={e => set_email(e.target.value)} type='email' placeholder='someone@email.com' />
//                         </Form.FloatingLabel>
//                         <Button type="submit" variant='primary' className='create-sec p-2 w-70'>Send Token</Button>
//                     </Form>
//                     <div className='dec-sec'><Link to="/login" className="btn btn-success ms-5">Back In Login Account</Link></div>

//                 </div>
//             </div>
//         </div>
//     )
// }

// export default ForgotPassword