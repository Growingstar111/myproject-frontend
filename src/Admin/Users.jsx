import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import styles from "./customStyle/AdminHome.module.css";
import { showAllUsers } from "../Endpoints/endpoints";
import ReactPaginate from "react-paginate";
import AdminSideBar from "./AdminSideBar";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { GrView } from "react-icons/gr";
import { IoMdCloseCircle } from "react-icons/io";
import { BsCheck2All } from "react-icons/bs";
const User = () => {
  const [totalPage, setTotalPage] = useState();
  const [pageNo, setPage] = useState(1);

  const navigate = useNavigate();
  const getUserData = async () => {
    const response = await showAllUsers(pageNo);
    setTotalPage(response?.data?.totalCount);

    console.log(response.data);

    return response.data;
  };

  const { data, isFetching, refetch } = useQuery({
    queryKey: ["users", pageNo],
    queryFn: getUserData,
  });

  return (
    <>
      <div className={styles.adminHomeContainer}>
        <AdminSideBar />
        <div className={styles.mainContent}>
          <header className={styles.header}>
            <h1>Welcome to user Section !!!</h1>
          </header>
          <div className={styles.content}>
           
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Name</th>

                  <th scope="col">Role</th>

                  <th scope="col">Verified</th>
                  <th scope="col">Profile Compelted</th>
                  <th scope="col"> View</th>
                </tr>
              </thead>
              <tbody>
                {data?.data?.map((user) => {
                  if (user?.role == 1) {
                    return null;
                  } else {
                    return (
                      <tr onClick={()=> navigate(`/admin/viewuser/${user?._id}`)}>
                        <td>{user?.name}</td>

                        <td>{user?.role == 3 ? "Company" : "Customer"}</td>

                        <td>
                          {user?.isVarified ? (
                            <BsCheck2All
                              style={{ color: "green", fontWeight: "bolder" }}
                            />
                          ) : (
                            <IoMdCloseCircle style={{ color: "red" }} />
                          )}
                        </td>
                        <td>
                          {user?.profileCompleted ? (
                            <BsCheck2All
                              style={{ color: "green", fontWeight: "bolder" }}
                            />
                          ) : (
                            <IoMdCloseCircle style={{ color: "red" }} />
                          )}
                        </td>
                        <td>
                          <button
                            onClick={() => {
                              navigate(`/admin/viewuser/${user?._id}`);
                            }}
                          >
                            <GrView style={{ color: "green" }} />
                          </button>
                        </td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>

            <ReactPaginate
              breakLabel="..."
              nextLabel=" >"
              onPageChange={(e) => setPage(e.selected + 1)}
              pageRangeDisplayed={totalPage}
              pageCount={totalPage / 5}
              previousLabel="< "
              renderOnZeroPageCount={null}
              containerClassName="pagination"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="previous-item"
              previousLinkClassName="previous-link"
              nextClassName="next-item"
              nextLinkClassName="next-link"
              breakClassName="break-item"
              breakLinkClassName="break-link"
              activeClassName="selected"
              disabledClassName="disabled"
            />
          </div>

          {isFetching && (
            <>
              <h1>Loading........</h1>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default User;
