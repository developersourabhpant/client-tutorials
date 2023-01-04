import { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import axios from "../axios";
import Nav from '../Pages/Nav'

function LeadAdd() {
    const navigate = useNavigate()
    const [name, set_name] = useState()
    const [isupdate, SetisUpdate] = useState("");
    const [email, set_email] = useState()
    const [number, set_number] = useState()
    const [course, set_course] = useState()
    const [fee, set_fee] = useState()
    const [leads, set_leads] = useState([]);

    const userid = localStorage.getItem("user_id")
    // Handle create new user
    async function handleAdd(e) {
        e.preventDefault();
        const data = { name, email, number, course, fee, userid }
        try {
            const response = await axios.post('/api/added/added-up', data)
            if (response.status === 200) {
                toast.success("Lead Created")
                navigate("/lead-information")
            }

        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }
    // corse-get by dynamic dropdown
    async function handleGet() {
        try {
            const response = await axios.get('/api/lead/lead-get')
            if (response.status === 200) {
                set_leads(response?.data)
            }
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }
    useEffect(() => {
        handleGet();
    }, [isupdate])

    // Update fee with course
    useEffect(() => {
        leads.filter(item => item?.name === course && set_fee(item?.fee));
    }, [course])


    return (
        <div>
            <Nav />

            <div className="Added-important">
                <div className="container">
                    <div className="row">
                        <div className="col-md-7">
                            <img src="https://salestack.in/assets/images/feature/sales.jpg" className='add-sec' alt="register" />
                        </div>
                        <div className="col-md-5">
                            <Form onSubmit={handleAdd} className='form-sec-add w-100'>
                                <h1 className="text-capitalize fs-3"> Lead Added</h1>
                                <Form.FloatingLabel label="Full Name" className='mb-3'>
                                    <Form.Control value={name} onChange={e => set_name(e.target.value)} type='text' placeholder='Full Name' />
                                </Form.FloatingLabel>
                                <Form.FloatingLabel label="someone@email.com" className='mb-3'>
                                    <Form.Control value={email} onChange={e => set_email(e.target.value)} type='email' placeholder='someone@email.com' />
                                </Form.FloatingLabel>
                                <Form.FloatingLabel label="Mo Number" className='mb-3'>
                                    <Form.Control value={number} onChange={e => set_number(e.target.value)} type='text' placeholder='Mo Number' />
                                </Form.FloatingLabel>
                                {/* Course */}
                                <Form.FloatingLabel label="Course" className='mb-3'>
                                    <Form.Select required value={course} onChange={e => set_course(e.target.value)}>
                                        <option value="">Select Course</option>
                                        {
                                            leads?.map((item, index) => <option key={index} value={item?.name}>{item?.name}</option>)
                                        }
                                    </Form.Select>


                                </Form.FloatingLabel>
                                {/* Add */}
                                <Form.FloatingLabel label="Fee" className='mb-3'>
                                    <Form.Control value={fee} onChange={e => set_fee(e.target.value)} type='text' placeholder='Fee' />
                                </Form.FloatingLabel>


                                <Button type="submit" variant='primary' className='btn btn-primary  create-sec p-2 w-70'>Added</Button>


                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



export default LeadAdd