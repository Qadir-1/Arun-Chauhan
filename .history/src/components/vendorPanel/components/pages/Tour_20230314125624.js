import React from 'react'
import HOC from '../layout/HOC'
import { Form, Table } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Tour = () => {
    const [modalShow, setModalShow] = React.useState(false);

  


    function MyVerticallyCenteredModal(props) {
    

      return (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Add / Remove Balance
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form >
              <Form.Group className='mb-3'>
              <Form.Select aria-label="Default select example" >
      <option>Add or Remove</option>
      <option value="add">Add</option>
      <option value="remove">Remove</option>
    </Form.Select>
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>Amount</Form.Label>
                  <Form.Control type='number' min={0}   />
              </Form.Group>

              <Button type='submit'>Submit</Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
          </Modal.Footer>
        </Modal>
      );
    }

    
  
    return (
      <>
     
     <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
  
        <section>
          <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
            <span className="tracking-widest text-slate-900 font-semibold uppercase ">
              All Wallets
            </span>
          </div>
  
          <div style={{ maxWidth: "100%", overflow: "auto" }}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th> User</th>
                  <th> Balance</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data?.data?.map((i, index) => (
                  <tr key={index}>
                    <td> {i.name} </td>
                    <td> {i.balance} </td>
                  
                    <td>
                      <i
                        class="fa-sharp fa-solid fa-edit"
                        style={{ color: "blue", cursor: "pointer" }}
                        onClick={() => {
                          setId(i.user)
                          setModalShow(true)}}
                      ></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </section>
      </>
    );
  };

export default HOC(Tour)