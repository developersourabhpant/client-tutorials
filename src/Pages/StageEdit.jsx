
import { Form, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../axios'
const EDIT_URL = "api/stage/stageEdit";

function StageEdit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [stage, set_stage] = useState({})
  const [stagename, set_stagename] = useState("")

  const handleGetStage = async () => {
    try {
      const response = await axios.get(`/api/stage/stage-get-byid/${id}`)
      set_stage(response?.data)

    } catch (error) {
      toast.error(error.response.data.message);
    }

  }
  useEffect(() => {
    handleGetStage();

  }, [])

  // edit-function
  const handleEditStage = async (e) => {
    e.preventDefault()
    const data = {
      stagename: stage.stagename

    }
    try {
      const response = await axios.patch(`/api/stage/stageEdit/${id}`, data)
      toast.success('Edit Successfull')
      navigate('/lead-stage')
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  useEffect(() => {
    handleEditStage();
  }, [id])



  return (
    <div className="container">
      <div className="col-md-12">
        <img src="https://cdni.iconscout.com/illustration/premium/thumb/politician-giving-a-speech-on-stage-2933135-2459148.png" className='stage-edit' />
      </div>
      <Form className='edit-stage-card' onSubmit={handleEditStage}>
        <Form.FloatingLabel label="Stage Name" className=' stage-card mb-1'>
          <Form.Control type='text' value={stage?.stagename} onChange={e => set_stage({ ...stage, stagename: e.target.value })} className='stage-css' placeholder='Stage Name' />
        </Form.FloatingLabel>
        <Button type='submit' variant="success" className=' px-5 mt-2'>
          Edit
        </Button>
      </Form>
    </div>
  )
}

export default StageEdit