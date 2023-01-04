import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Table, Form } from 'react-bootstrap';
import axios from '../axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Nav from '../Pages/Nav';

const DELETE_URL = "/api/lead/delete";


function LeadTable() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [leads, set_leads] = useState([]);
    const [isupdate, SetisUpdate] = useState(false);
    const [query, setQuery] = useState("");

    // get-by-user-id
    async function handleGetAllLead() {
        try {
            const user_id = localStorage.getItem("user_id")
            const response = await axios.get(`/api/lead/getlead/${user_id}`)
            set_leads(response?.data)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
    // delete-function
    const RemoveLead = async (id) => {
        try {
            await axios.delete(`${DELETE_URL}/${id}`);
            SetisUpdate(true);
        } catch (error) {
            console.log(error?.response?.data?.message)
        }
    }
    // serach-function
    const [searchResult, setSearchResult] = useState([])
    useEffect(() => {
        setSearchResult(leads?.filter((item) => {
            return item.name.toLowerCase().includes(query.toLowerCase()) && item || item.module.toLowerCase().includes(query.toLowerCase()) && item || item.deadline.toLowerCase().includes(query.toLowerCase()) && item
        }))
    }, [query])

    useEffect(() => {
        handleGetAllLead();
    }, [isupdate])

    return (
        <>
            <div className="row w-100">
                <div className="col-md-2 bg-dark">
                    <Nav />
                </div>
                <div className="col-md-10">
                    <h1 className="head-design">Lead Table</h1>
                    <div className='table-important-part p-5 mx-auto bg-white rounded shadow p-3'>
                        {/* search */}
                        <Form.FloatingLabel label=" search" className="seach-bar-section mb-3">
                            <Form.Control type='search' id="myForm" placeholder='names..' onChange={e => setQuery(e.target.value)} />
                        </Form.FloatingLabel>
                        <div className=" w-100 rounded shadow p-2 ">
                            <Table className='table-parent-part' responsive hover bordered >
                                <thead>
                                    <tr>
                                        <th>Courses Name</th>
                                        <th>Couses Module</th>
                                        <th>Course Duration</th>
                                        <th>Course Fee</th>
                                        <th>Course File</th>
                                        <th> Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        searchResult.length === 0 ?
                                            leads?.map((item, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{item?.name}</td>
                                                        <td>{item?.module}</td>
                                                        <td>{item?.deadline}</td>
                                                        <td>{item?.fee}</td>
                                                        <td>
                                                            <a href={item?.file?.fileUrl} target='_blank'>{item?.file?.name}</a></td>
                                                        <td>
                                                            <ButtonGroup className='botton-parent-section'>
                                                                <Link to={`/lead-edit/${item?._id}`} type='submit' className='btn btn-primary px-4'>Edit</Link>
                                                                <Button variant='danger' onClick={() => RemoveLead(item._id)} className='px-4'>Delete</Button>
                                                            </ButtonGroup>
                                                        </td>

                                                    </tr>

                                                )
                                            })
                                            : searchResult?.map((item, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{item?.name}</td>
                                                        <td>{item?.module}</td>
                                                        <td>{item?.deadline}</td>
                                                        <td>{item?.fee}</td>
                                                        <td>
                                                            <a href={item?.file?.fileUrl} target='_blank'>{item?.file?.name}</a></td>
                                                        <td>
                                                            <ButtonGroup className='botton-parent-section'>
                                                                <Link to={`/lead-edit/${item?._id}`} type='submit' className='btn btn-primary px-4'>Edit</Link>
                                                                <Button variant='danger' onClick={() => RemoveLead(item._id)} className='px-4'>Delete</Button>
                                                            </ButtonGroup>
                                                        </td>

                                                    </tr>

                                                )
                                            })

                                    }
                                </tbody>
                            </Table>
                        </div>
                    </div>


                </div >
            </div>
        </>
    )
}

export default LeadTable;