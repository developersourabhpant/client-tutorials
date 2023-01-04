import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from '../axios';

export default function ResetPassword() {
    const { email } = useParams();
    const navigate = useNavigate();

    const [token, set_token] = useState("")
    const [new_password, set_new_password] = useState("")
    const [confirm_new_password, set_confirm_new_password] = useState("")



    // Handle verify token and reset password
    async function handleResetPassword(e) {
        e.preventDefault();

        const data = { email, token, new_password }

        if (new_password === confirm_new_password) {
            try {
                if (new_password.trim() === confirm_new_password.trim()) {
                    const response = await axios.post("/api/user/reset-password", data);

                    if (response.status === 200) {
                        toast.success("Password Reset Successfully")
                        navigate("/login")
                    }
                } else {
                    toast.error("New Password And Confirm Password Do Not Match")
                }
            } catch (error) {
                toast.error(error?.response?.data?.message)
            }
        }
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-8">
                    <img src="https://img.freepik.com/free-vector/reset-password-concept-illustration_114360-7866.jpg?w=996&t=st=1670952732~exp=1670953332~hmac=55e3d572c52378215a691fd15baf3b4588548953ca74dd85c67e8ef069e909c5" className='reset-sec' alt="login" />
                </div>
                <div className="col-md-4">
                    <Form onSubmit={handleResetPassword} className='reset-part w-100'>
                        <h1 className="text-capitalize fs-3">Create New Password.</h1>
                        <Form.FloatingLabel label="Enter Verification Token" className="mb-3">
                            <Form.Control required value={token} onChange={e => set_token(e.target.value)} type="number" placeholder="Enter Verification Token" />
                        </Form.FloatingLabel>
                        <Form.FloatingLabel label="Create New Password" className="mb-3">
                            <Form.Control required value={new_password} onChange={e => set_new_password(e.target.value)} type="password" placeholder="Create New Password" />
                        </Form.FloatingLabel>
                        <Form.FloatingLabel label="Confirm New Password" className="mb-3">
                            <Form.Control required value={confirm_new_password} onChange={e => set_confirm_new_password(e.target.value)} type="password" placeholder="Confirm New Password" />
                        </Form.FloatingLabel>
                        <div className='reset-sec'><Button to={''} type="submit" variant="primary" className="btn btn-primary">Reset Password</Button></div>

                    </Form>

                </div>
            </div>
        </div>
    )
}

