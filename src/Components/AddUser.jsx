import React, { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import Form from 'react-bootstrap/Form';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from "react-hook-form";
// const navigate = useNavigate()




function CreateUser({ getusers }) {
    
    const navigate = useNavigate()

    // console.log(props);


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);




    function refreshPage() {
        // window.location.reload(false);
        // e.preventDefault()
        // navigate('/Dashboard')
        
        navigate('/viewapplication')
    }

    const { register, handleSubmit, formState: { errors } } = useForm();

        

    const onSubmit = async (data) => {
        console.log("createUser");
        console.log(data);

        try {
            const editUser = await axios.post("http://localhost:4000/admin/addUser", data)
       console.log(data);


        
        if(data.error) {
            console.log("error in email");
           console.log(data.error);
           
           
       
        }
            getusers()
       
        } catch (err) {
            console.log(err)
            // setLoading(false)
        }

    }

    return (

        <>

            {/* <Button variant="primary" onClick={handleShow}>
        Edit
      </Button> */}
            <FontAwesomeIcon onClick={handleShow} className='add-icon' icon={faUserPlus} color='black' fontize='large'></FontAwesomeIcon>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create User</Modal.Title>
                </Modal.Header>
                <Modal.Body>




                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text"

                                {...register("name")}

                            />
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>

                       

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label >Email </Form.Label>
                            <Form.Control type="email"

                                {...register("email")}

                            />
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label >Password </Form.Label>
                            <Form.Control type="password"

                                {...register("password")}

                            />
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>

                        <Button onClick={handleClose} type='submit'>Submit</Button>
                    </Form>



                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={refreshPage}>
                        Close
                    </Button>
                  
                </Modal.Footer>
            </Modal>
        </>
    );
}


export default CreateUser