
import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap'
import axios from '../axios';
import { Link } from 'react-router-dom';
import { useNavigate, } from 'react-router-dom';
import { toast } from 'react-toastify';
import Nav from '../Pages/Nav';

function Dashboard() {

    const navigate = useNavigate();
    const [name, set_name] = useState("")
    const [module, set_module] = useState("")
    const [fee, set_fee] = useState("")
    const [deadline, set_deadline] = useState("")
    const [file, set_file] = useState("")
    const [leads, set_leads] = useState([]);
    const userid = localStorage.getItem("user_id")


    async function handleCreateLead(e) {
        e.preventDefault()

        const data = new FormData()
        data.append("name", name);
        data.append("module", module);
        data.append("deadline", deadline);
        data.append("fee", fee);
        data.append("file", file);
        data.append("userid", userid);
        try {
            const response = await axios.post('/api/lead/lead-add', data)
            if (response.status === 200) {
                toast.success("Lead Created")
                navigate("/lead-table")

            }
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }

    }
    return (
        <div>
            <Nav />
            <div className="dashboard-important">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            <img src="https://secure2.sfdcstatic.com/assets/images/hub/sales/what-is-lead-nurturing/lead-nurturing-header.png" className='dashboard-sec' alt="register" />
                        </div>
                        <div className="col-md-4">

                            <Form onSubmit={handleCreateLead} className='form-sec-section w-100'>
                                <h1 className="text-capitalize fs-3">Courses Add</h1>
                                <div className="row">
                                    <Form.FloatingLabel label="Course Name" className=' mb-3' >
                                        <Form.Control value={name} onChange={e => set_name(e.target.value)} type='text' placeholder='Course Name' />
                                    </Form.FloatingLabel>
                                </div>
                                <Form.FloatingLabel label="Course Module" className='mb-3'>
                                    <Form.Control value={module} onChange={e => set_module(e.target.value)} type='text' placeholder='Course Module' />
                                </Form.FloatingLabel>
                                <Form.FloatingLabel label="Tentative Date" className='mb-3'>
                                    <Form.Control value={deadline} onChange={e => set_deadline(e.target.value)} type='month' placeholder='Duration Period' />
                                </Form.FloatingLabel>
                                <Form.FloatingLabel label="Fee" className='mb-3'>
                                    <Form.Control value={fee} onChange={e => set_fee(e.target.value)} type='text' placeholder='Fees' />
                                </Form.FloatingLabel>
                                <Form.FloatingLabel label="PDF" className='mb-3'>
                                    <Form.Control onChange={e => set_file(e.target.files[0])} type='file' placeholder='PDF' />
                                </Form.FloatingLabel>

                                <Button type="submit" variant='primary' className='create-sec p-2 w-70'>Create</Button>


                            </Form>
                        </div>
                    </div>
                </div >
            </div>
        </div>

    )

}

export default Dashboard;