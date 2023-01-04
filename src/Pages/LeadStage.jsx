
import { useEffect, useState } from 'react';
import { Button, ButtonGroup, Form, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from '../axios';
import Nav from '../Pages/Nav';
const DELETE_URL = "/api/stage/delete"

function LeadStage() {
    const { id } = useParams();
    const [stagename, set_stagename] = useState("")
    const [all_stages, set_all_stages] = useState([])
    const [isUpdate, set_isUpdate] = useState([]);

    //   add-stage-function
    async function handleAddStage(e) {
        e.preventDefault()
        try {
            const response = await axios.post("/api/stage/stage-add", { stagename })
            if (response.status === 200) {
                toast.success("Stage Added Successfully")
                set_isUpdate(!isUpdate)
                set_stagename("")
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
    //    stage-get-function
    async function handleGetStages() {
        try {
            const response = await axios.get("/api/stage/stage-get")
            if (response.status === 200) {
                set_all_stages(response?.data)
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
    // Delete
    const RemoveStage = async (id) => {
        try {
            const response = await axios.delete(`${DELETE_URL}/${id}`);
            set_isUpdate(true);
        } catch (error) {
            console.log(error?.response?.data?.message)
        }
    }
    useEffect(() => {
        handleGetStages();
    }, [isUpdate])

    return (
        <div><Nav />
            <div className='stage-parent-part p-5 mx-auto bg-white rounded shadow p-3'>
                <div style={{ flex: 0.3 }} className="p-3">
                    <Form onSubmit={handleAddStage}>
                        <h3 className="text-dark mb-3">Add New Stage</h3>
                        <Form.Control type="text" value={stagename} onChange={e => set_stagename(e.target.value)} placeholder='Enter stage name' />
                        <ButtonGroup className='stage-added-part mt-3'>
                            <Button type='submit' variant='primary' className='btn btn-success px-4 me-5'>Add Stage</Button>
                        </ButtonGroup>
                    </Form>
                </div>

                <div className="rounded shadow p-2" style={{ flex: 0.7 }}>
                    <Table className='stage-selected-section' responsive hover bordered >
                        <thead>
                            <tr>
                                <th>
                                    Stage Name
                                </th>
                                <th>
                                    Action
                                </th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                all_stages?.map((item, index) => <tr key={index}>
                                    <td>{item?.stagename}
                                        <p>CreatedAt:{item.createdAt}</p></td>
                                    <ButtonGroup>
                                        <Button variant="danger" onClick={() => RemoveStage(item._id)} className='bg-danger'>
                                            Delete
                                        </Button>
                                        <Link to={`/stage-edit/${item._id}`} className="btn btn-primary px-3 pt-2">Edit</Link>
                                    </ButtonGroup>
                                </tr>
                                )

                            }
                        </tbody>
                    </Table>
                </div>


            </div>
        </div>
    )
}

export default LeadStage