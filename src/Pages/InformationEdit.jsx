import React from 'react'
import { Form, Button, ButtonGroup } from 'react-bootstrap';
import { useEffect, useState } from 'react'
import axios from '../axios'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
const EDIT_URL = "api/added/edit/:id";


function InformationEdit() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [added, set_added] = useState({})
    const [alladded, set_alladded] = useState([])
    const [name, set_name] = useState("")
    const [email, set_email] = useState("")
    const [number, set_number] = useState("")
    const [course, set_cousre] = useState("")
    const [module, set_module] = useState("")
    const [fee, set_fee] = useState("")
    const handleGetAdded = async () => {
        try {
            const response = await axios.get(`/api/added/added-get-id/${id}`)
            set_added(response?.data)
        } catch (error) {
            toast.error(error.response.data.message);
        }

    }
    useEffect(() => {
        handleGetAdded();
    }, [id])

    // edit-function

    const handleEditAdded = async (e) => {
        e.preventDefault()
        const data = {
            name: added.name,
            email: added.email,
            number: added.number,
            course: added.course,
            fee: added.fee
        }
        try {
            const response = await axios.patch(`/api/added/edit/${id}`, data)
            toast.success('Edit Successfull')
            navigate('/lead-information')
        } catch (error) {
            toast.error(error.response.data.message);
        }

    }



    //   course-map
    async function handleGetAllAdded() {
        try {
            const response = await axios.get('/api/lead/lead-get')
            set_alladded(response?.data)
        } catch (error) {
            console.log(error?.response?.data?.message)
        }
    }

    useEffect(() => {
        handleGetAllAdded();

    }, [])
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-8">
                    <img src="https://thumbs.dreamstime.com/z/write-edit-text-concept-writing-editing-documents-correct-proofreading-essay-services-vector-line-illustration-grammar-145757425.jpg" className='lead-sec' alt="register" />
                </div>
                <div className="col-md-4">
                    <Form onSubmit={handleEditAdded} className='edit-form-card w-100'>
                        <h1 className="text-capitalize fs-3">Information Edit</h1>
                        <Form.FloatingLabel label="Full Name" className='mb-3'>
                            <Form.Control type='text' value={added?.name} onChange={e => set_added({ ...added, name: e.target.value })} placeholder='Full Name' />
                        </Form.FloatingLabel>
                        <Form.FloatingLabel label="Email" className='mb-3'>
                            <Form.Control type='Email' value={added?.email} onChange={e => set_added({ ...added, email: e.target.value })} placeholder='Email' />
                        </Form.FloatingLabel>
                        <Form.FloatingLabel label="Course" className='mb-3 '>
                            <Form.Select required value={added?.module} onChange={e => { set_added({ ...added, module: e.target.value }); set_module(e.target.value) }}>

                                {
                                    alladded?.map((item, index) => <option key={index} value={item?.name}>{item?.name}</option>)
                                }
                            </Form.Select>
                        </Form.FloatingLabel>
                        <Form.FloatingLabel label="Number" className='mb-3'>
                            <Form.Control type='text' value={added?.number} onChange={e => { set_added({ ...added, number: e.target.value }) }} placeholder='Number' />
                        </Form.FloatingLabel>
                        <Form.FloatingLabel label="fee" className='mb-3'>
                            <Form.Control type='text' value={added?.fee} onChange={e => { set_added({ ...added, fee: e.target.value }) }} placeholder='Fee' />
                        </Form.FloatingLabel>

                        <ButtonGroup className='gap-2'>
                            <Button type='submit' variant='primary' className='btn btn-primary create-sec px-4 p-2 w-70'>Edit</Button>
                            <Link to={'/lead-information'} type='submit' variant='primary' className='btn btn-success create-sec px-4 p-2 w-70'>Back</Link>
                        </ButtonGroup>

                    </Form>
                </div>
            </div>
        </div>
    )
}


export default InformationEdit;