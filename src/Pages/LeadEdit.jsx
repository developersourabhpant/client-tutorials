
import { Form, Button, ButtonGroup } from 'react-bootstrap';
import { useEffect, useState } from 'react'
import axios from '../axios'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
const EDIT_URL = "api/lead/edit";

function Editlead() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [lead, set_lead] = useState({})
    const [alllead, set_alllead] = useState([])
    const [name, set_name] = useState("")
    const [module, set_module] = useState("")
    const [deadline, set_deadline] = useState("")
    const [fee, set_fee] = useState("")
    const [file, set_file] = useState("")

    const handleGetLead = async () => {
        try {
            const response = await axios.get(`/api/lead/lead-get-byid/${id}`)
            set_lead(response?.data)
        } catch (error) {
            toast.error(error.response.data.message);
        }

    }
    useEffect(() => {
        handleGetLead();
    }, [id])

    // lead-edit function
    async function handleEditLead(e) {
        e.preventDefault()
        const data = new FormData()
        data.append("name", lead.name);
        data.append("module", lead.module);
        data.append("fee", lead.fee);
        data.append("deadline", lead.deadline);
        data.append("file", file);
        try {
            const response = await axios.patch(`/api/lead/edit/${id}`, data)
            if (response.status === 200) {
                toast.success("Edit Successful")
                navigate("/lead-table")
            }
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }

    }

    // //   course-parent-map
    // async function handleGetAllLead() {
    //     try {
    //         const response = await axios.get('/api/lead/lead-get')
    //         set_alllead(response?.data)
    //     } catch (error) {
    //         console.log(error?.response?.data?.message)
    //     }
    // }
    // useEffect(() => {
    //     handleGetAllLead();
    // }, [])

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-8">
                    <img src="https://thumbs.dreamstime.com/z/write-edit-text-concept-writing-editing-documents-correct-proofreading-essay-services-vector-line-illustration-grammar-145757425.jpg" className='lead-sec' alt="register" />
                </div>
                <div className="col-md-4">
                    <Form onSubmit={handleEditLead} className='form-sec-card w-100'>
                        <h1 className="text-capitalize fs-3">Courses Edit</h1>
                        <Form.FloatingLabel label="Full Name" className='mb-3'>
                            <Form.Control type='text' value={lead?.name} onChange={e => set_lead({ ...lead, name: e.target.value })} placeholder='Full Name' />
                        </Form.FloatingLabel>
                        <Form.FloatingLabel label="Course" className='mb-3 '>
                            <Form.Control type='text' value={lead?.module} onChange={e => set_lead({ ...lead, module: e.target.value })} placeholder='Course' />
                        </Form.FloatingLabel>
                        <Form.FloatingLabel label="fee" className='mb-3'>
                            <Form.Control type='text' value={lead?.fee} onChange={e => { set_lead({ ...lead, fee: e.target.value }) }} placeholder='Fee' />
                        </Form.FloatingLabel>
                        <Form.FloatingLabel label="Duration Period" className='mb-3'>
                            <Form.Control type='month' value={lead?.deadline} onChange={e => { set_lead({ ...lead, deadline: e.target.value }) }} />
                        </Form.FloatingLabel>
                        <Form.FloatingLabel label="PDF" className='mb-3'>
                            <Form.Control onChange={e => { set_file(e.target.files[0]) }} type='file' placeholder='PDF' />
                        </Form.FloatingLabel>
                        <ButtonGroup className='gap-2'>
                            <Button type='submit' variant='primary' className='btn btn-primary create-sec px-4 p-2 w-70'>Edit</Button>
                            <Link to={'/lead-table'} type='submit' variant='primary' className='btn btn-success create-sec px-4 p-2 w-70'>Back</Link>
                        </ButtonGroup>

                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Editlead