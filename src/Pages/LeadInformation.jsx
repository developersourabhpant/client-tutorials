import React, { useState, useEffect } from "react";
import axios from "../axios";
import { Form, Navbar } from 'react-bootstrap';
import { Table, Button, ButtonGroup } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import Nav from "./Nav";
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';


const GETALL_URL = 'api/added/added-get';
const DELETE_URL = "/api/added/delete";

function LeadInformation() {
    // All-Usestates
    const navigate = useNavigate();
    const { id } = useParams();
    const [all_stages, set_all_stages] = useState([]);
    const [lead_stage, set_lead_stage] = useState("");
    const [lead_id, set_lead_id] = useState("")
    const [selected_lead, set_selected_lead] = useState({})
    const [filter_stage, set_filter_stage] = useState("")
    const [show, setShow] = useState(false);
    const [alldata, SetallData] = useState([]);
    const [message, set_message] = useState("");
    const [query, setQuery] = useState("");
    const [isupdate, SetisUpdate] = useState(false);
    const [joinlater, set_join_later] = useState("");
    const [joined, set_joined] = useState("");
    const userid = localStorage.getItem("user_id")

    // feedback use-states
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // second-modal
    const [smShow, setSmShow] = useState(false);
    const [lgShow, setLgShow] = useState(false);



    // get-information-data
    const getleaddata = async () => {
        try {
            const response = await axios.get(`${GETALL_URL}`);
            if (response.status === 200) {
                SetallData(response?.data)
            }
        } catch (error) {
            console.log(error?.response?.data?.message)
        }
    }
    // delete-function
    const RemoveLead = async (id) => {
        try {
            await axios.delete(`${DELETE_URL}/${id}`);
            SetisUpdate(!isupdate);
        } catch (error) {
            console.log(error?.response?.data?.message)
        }
    }
    // Stagename-get
    async function handleGetAllStage() {
        try {
            const response = await axios.get('/api/stage/stage-get')
            if (response.status === 200) {
                set_all_stages(response?.data)
            }
        } catch (error) {
            console.log(error?.response?.data?.message)
        }
    }
    // lead-Edit-Prin-Stage-function
    async function handleUpdateStage(e) {
        e.preventDefault();
        try {
            const response = await axios.patch(`/api/added/edit-added-stage`, { id: lead_id, stage: lead_stage, message, joinlater })
            if (response.status === 200) {
                toast.success('Stage And Feedback Change Successfully')
                handleClose();
                SetisUpdate(!isupdate)
                set_message("")
                set_join_later("")
                set_joined("")
            }
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }
    //   get-user-id
    async function handleGetAdded() {
        try {
            const user_id = localStorage.getItem("user_id")
            const response = await axios.get(`/api/added/getadded/${user_id}`)
            SetallData(response?.data)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
    // serach-function
    const [searchResult, setSearchResult] = useState([])
    useEffect(() => {
        setSearchResult(alldata?.filter((item) => {
            return item.name.toLowerCase().includes(query.toLowerCase()) && item
        }))
    }, [query])

    // useEffects
    useEffect(() => {
        handleGetAdded();
        getleaddata();
        handleGetAllStage();
    }, [isupdate])

    return (
        <div>
            <div className="row">
                <div className="col-md-2">
                    <Nav />
                </div>
                <div className="col-md-10">
                    <h1 className="head-design">Lead Information</h1>
                    <div className='table-important-part p-5 mx-auto bg-white rounded shadow p-3 '>
                        {/* search */}
                        <Form.FloatingLabel label=" search" className="seach-bar-section mb-3">
                            <Form.Control type='search' id="myForm" placeholder='names..' onChange={e => setQuery(e.target.value)} />
                        </Form.FloatingLabel>
                        {/* second-filter-table */}
                        <div className=' p-5 mx-auto bg-white rounded shadow p-3'>
                            <div className="second-map-sec rounded shadow p-3 ">
                                <div className="parent-second-sec  d-flex gap-1">
                                    {
                                        all_stages?.map((item, index) => {
                                            return (
                                                <div label="Stage Name" variant='white' className='btn-shot-part mb-2' key={index}>
                                                    <Button variant="success" onClick={() => set_filter_stage(item.stagename)} > {item.stagename}</Button>
                                                </div>
                                            )
                                        })}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Reload */}
                    <div className="parent-part d-flex gap-5">
                        <div label="Stage Name" variant='white' className='btn-shot  mb-3'>
                            <button onClick={() => set_filter_stage("")} className='btn btn-success text-white' >Reset</button>
                        </div>
                    </div>
                    <div className=" w-100 rounded shadow p-2 " style={{ height: "250px", overflowY: "auto" }}>
                        <Table className='table-parent-card' responsive hover bordered >
                            <thead>
                                <tr>

                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Number</th>
                                    <th>Course</th>
                                    <th>Stage</th>
                                    <th>Fee</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* first-filter-by-stage */}
                                {searchResult.length === 0 ?
                                    alldata?.map((item, index) => {
                                        return filter_stage ? (item?.stage === filter_stage &&
                                            <tr key={index}>
                                                <td>{item?.name}</td>
                                                <td>{item?.email}</td>
                                                <td>{item?.number}</td>
                                                <td>{item?.course}</td>
                                                <td>
                                                    <Form.FloatingLabel label="Stage Name" className='mb-3'>
                                                        <Form.Select required value={item.stage}
                                                            onChange={e => { set_lead_stage(e.target.value); handleShow(); set_lead_id(item._id); set_selected_lead(item); set_join_later(item); set_joined(item); }} >
                                                            {
                                                                all_stages?.map((item, index) =>
                                                                    <option key={index} value={item?.stagename}>{item?.stagename}</option>)
                                                            }
                                                        </Form.Select>
                                                    </Form.FloatingLabel>
                                                </td>
                                                <td>{item?.fee}</td>
                                                <td>
                                                    <ButtonGroup className='group-section'>
                                                        <Link to={`/information-edit/${item?._id}`} type='submit' className='btn btn-primary px-4'>Edit</Link>
                                                        <Button variant='danger' onClick={() => RemoveLead(item._id)} className='px-4'>Delete</Button>
                                                    </ButtonGroup>
                                                </td>
                                            </tr>
                                        )
                                            : <tr key={index}>
                                                <td>{item?.name}</td>
                                                <td>{item?.email}</td>
                                                <td>{item?.number}</td>
                                                <td>{item?.course}</td>
                                                <td>
                                                    <Form.FloatingLabel label="Stage Name" className='mb-3'>
                                                        <Form.Select required value={item.stage}
                                                            onChange={e => { set_lead_stage(e.target.value); handleShow(); set_lead_id(item._id); set_selected_lead(item); set_join_later(item); set_joined(item); }} >
                                                            {
                                                                all_stages?.map((item, index) =>
                                                                    <option key={index} value={item?.stagename}>{item?.stagename}</option>)
                                                            }
                                                        </Form.Select>
                                                    </Form.FloatingLabel>
                                                </td>
                                                <td>{item?.fee}</td>
                                                <td>
                                                    <ButtonGroup className='group-section'>
                                                        <Link to={`/information-edit/${item?._id}`} type='submit' className='btn btn-primary px-4'>Edit</Link>
                                                        <Button variant='danger' onClick={() => RemoveLead(item._id)} className='px-4'>Delete</Button>
                                                    </ButtonGroup>
                                                </td>

                                            </tr>
                                    })
                                    : searchResult?.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{item.name}</td>
                                                <td>{item.email}</td>
                                                <td>{item.number}</td>
                                                <td>{item.course}</td>
                                                <td>
                                                    {/* some-added-usestate */}
                                                    <Form.FloatingLabel label="Stage Name" className='mb-3'>
                                                        <Form.Select required value={item.stage}
                                                            onChange={e => { set_lead_stage(e.target.value); handleShow(); handleShow(); set_lead_id(item._id); set_selected_lead(item); set_join_later(item); set_joined(item); }}  >
                                                            {
                                                                all_stages?.map((item, index) =>
                                                                    <option key={index} value={item?.stagename}>{item?.stagename}</option>)

                                                            }
                                                        </Form.Select>
                                                    </Form.FloatingLabel>

                                                </td>
                                                <td>{item.fee}</td>
                                                <td>
                                                    <ButtonGroup className='group-section'>
                                                        <Link to={`/information-edit/${item?._id}`} type='submit' className='btn btn-primary px-4'>Edit</Link>
                                                        <Button variant='danger' onClick={() => RemoveLead(item._id)} className='px-4'>Delete</Button>
                                                    </ButtonGroup>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                        {/* feedback-modal */}
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton >
                                <Modal.Title >FeedBack</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form onSubmit={handleUpdateStage}>
                                    {/* conmmunicated */}
                                    {
                                        lead_stage === "Will Join Later" &&

                                        <Form.FloatingLabel label="Tentative Date" className='mb-3'>
                                            <Form.Control value={joinlater.createdAt} onChange={e => set_join_later(e.target.value)} type='date' placeholder='Tentative Date' />

                                        </Form.FloatingLabel>

                                    }
                                    {/* joined */}
                                    {/* {
                                        lead_stage === "Joined" &&
                                        <Form.FloatingLabel label="Joining Date" className='mb-3'>
                                            <Form.Control value={joined} onChange={e => set_joined(e.target.value)} type='date' placeholder='Joining Date' />
                                        </Form.FloatingLabel>
                                    } */}
                                    {/* message */}
                                    <Form.FloatingLabel label="Message" className="mb-3">
                                        <Form.Control value={message} onChange={e => { set_message(e.target.value) }} type="text" placeholder="Message" />
                                        <Button className="mt-2" onClick={() => setLgShow(true)} type='submit' variant="success">
                                            Got it
                                        </Button>
                                    </Form.FloatingLabel>

                                </Form>
                                <div style={{ height: "119px", overflowY: "auto" }}>
                                    {
                                        selected_lead?.message?.map((item, index) => <p key={index}>{item}</p>)
                                    }
                                </div>
                            </Modal.Body>
                        </Modal>
                    </div>
                </div>
            </div>
        </div >
    )

}

export default LeadInformation