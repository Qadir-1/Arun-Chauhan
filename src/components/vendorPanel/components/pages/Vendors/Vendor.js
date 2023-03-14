/** @format */

import HOC from "../../layout/HOC";
import { Table } from "react-bootstrap";

const Users = () => {
  return (
    <>
      <section>
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            All Users
          </span>
        </div>

        <div style={{ maxWidth: "100%", overflow: "auto" }}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th> Mobile Number</th>
                <th> User Name</th>
                <th> Location </th>
                <th> Vehicle </th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1283645728</td>
                <td>User Name</td>
                <td>Delhi</td>
                <td>Honda City </td>
                <td>
                  <i class="fa-solid fa-trash" style={{ color: "red" }}></i>
                </td>
              </tr>
              <tr>
                <td>1283645728</td>
                <td>User Name</td>
                <td>Delhi</td>
                <td>Honda City </td>
                <td>
                  <i class="fa-solid fa-trash" style={{ color: "red" }}></i>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </section>
    </>
  );
};

export default HOC(Users);
