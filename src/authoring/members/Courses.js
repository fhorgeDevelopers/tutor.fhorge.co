import React, { useEffect, useState } from 'react'
import { useNew } from '../../providers/New';
import style from './courses.module.css';
import { useLocation, useNavigate } from 'react-router-dom';

const Courses = () => {
    const newHook = useNew();
    const location = useLocation();

    const [order, setOrder] = useState('');

    const toggleOrder = (n) => {
        if (order === n) {
            setOrder('');
        } else {
            setOrder(n);
        }
    } 

    const sortTable = (n) => {
        var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
        table = document.getElementById("myTable");
        switching = true;
        //Set the sorting direction to ascending:
        dir = "asc";
        /*Make a loop that will continue until
        no switching has been done:*/
        while (switching) {
            //start by saying: no switching is done:
            switching = false;
            rows = table.rows;
            /*Loop through all table rows (except the
            first, which contains table headers):*/
            for (i = 1; i < (rows.length - 1); i++) {
                //start by saying there should be no switching:
                shouldSwitch = false;
                /*Get the two elements you want to compare,
                one from current row and one from the next:*/
                x = rows[i].getElementsByTagName("TD")[n];
                y = rows[i + 1].getElementsByTagName("TD")[n];
                /*check if the two rows should switch place,
                based on the direction, asc or desc:*/
                if (dir === "asc") {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        //if so, mark as a switch and break the loop:
                        shouldSwitch = true;
                        break;
                    }
                } else if (dir === "desc") {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                        //if so, mark as a switch and break the loop:
                        shouldSwitch = true;
                        break;
                    }
                }
            }
            if (shouldSwitch) {
                /*If a switch has been marked, make the switch
                and mark that a switch has been done:*/
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
                //Each time a switch is done, increase this count by 1:
                switchcount++;
            } else {
                /*If no switching has been done AND the direction is "asc",
                set the direction to "desc" and run the while loop again.*/
                if (switchcount === 0 && dir === "asc") {
                    dir = "desc";
                    switching = true;
                }
            }
        }
    }

    useEffect(() => {
        newHook.getMyPrograms();
        setOrder('')
        return () => {
            return true;
        };
    }, [location.key]);
    return (
        <>
            <div className='container mt-3 mb-5' >
                <div className={` ${style.progressFooter} alignCenter d-grid pt-2 pb-3`}>
                    <div className='row m-0'>
                        <div className='col-lg-3  p-2'>
                            <div className='d-flex alignCenter text-center'>
                                <label htmlFor='tag'>
                                    Category Tag:
                                </label>
                                <select id="tag" className="noBg ml-2">
                                    <option value="">Select Tag</option>
                                </select>
                            </div>
                        </div>
                        <div className='col-lg-2 p-2'>
                            <div className='d-flex alignCenter text-center'>
                                <label htmlFor='title'>
                                    Role:
                                </label>
                                <select id="role" className="noBg ml-2">
                                    <option value="">Select Role</option>
                                </select>
                            </div>
                        </div>
                        <div className='col-lg-3 p-2'>
                            <div className='d-flex alignCenter text-center'>
                                <label htmlFor='status'>
                                    Status:
                                </label>
                                <select id="status" className="noBg ml-2">
                                    <option value="">Select Status</option>
                                </select>
                            </div>
                        </div>
                        <div className='col-lg-2 p-2'>
                            <div className='d-flex alignCenter text-center'>
                                <label htmlFor='price'>
                                    Price:
                                </label>
                                <select id="price" className="noBg ml-2">
                                    <option value="">Select</option>
                                </select>
                            </div>
                        </div>
                        <div className='col-lg-2 p-2'>
                            <button className="flterBtn w-100">
                                Filter
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <section className='container mt-5'>
                <div className={style.courseBox}>
                    <div className={`${style.menu} container d-flex justify-content-between`}>
                        <h4 className={`${style.menuTitle} pt-3 `}>
                            My Courses
                        </h4>
                        <div className={`${style.menu}`}>
                            <span className='fa fa-refresh link' title="Refresh course list" onClick={newHook.getMyPrograms} style={{ marginRight: '10px' }}></span>
                            <button className='eHeadBtn' onClick={newHook.addNew}>
                                Add New Course
                            </button>
                        </div>
                    </div>
                    <div className={`${style.courseList} m-3 mt-4 pb-2`}>
                        <div className="table-responsive-md m-2">

                            {(newHook.programs.length === 0) ? (
                                <>
                                    <table className="table table-striped table-hover">
                                        <tbody>
                                            <tr>
                                                <td style={{ textAlign: 'center' }}>
                                                    <br />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{ textAlign: 'center' }}>
                                                    <b>
                                                        {newHook.loadingMessage}
                                                    </b>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{ textAlign: 'center' }}>
                                                    <br />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </>
                            ) : (
                                <>
                                    <table className="table table-striped table-hover" id="myTable">
                                        <thead>
                                            <tr>
                                                <th
                                                    scope="col"
                                                    onClick={
                                                        () => {
                                                            sortTable(0);
                                                            toggleOrder(0);
                                                        }
                                                    }
                                                    className='d-flex'
                                                >Course Code &nbsp; <span className={(order !== 0) ? `fa fa-caret-right` : `fa fa-caret-up`}></span> </th>
                                                <th
                                                    scope="col"
                                                    onClick={
                                                        () => {
                                                            sortTable(1);
                                                            toggleOrder(1);
                                                        }
                                                    }
                                                >Course Name &nbsp; <span className={(order !== 1) ? `fa fa-caret-right` : `fa fa-caret-up`}></span> </th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Institution</th>
                                                <th scope="col">Role</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {newHook.programs.map((program) => (
                                                <tr key={program.course_id.id}>
                                                    <td>
                                                        {program.course_id.code}
                                                    </td>
                                                    <td>
                                                        {program.course_id.name}
                                                    </td>
                                                    <td>
                                                        {program.course_id.publication_status}
                                                    </td>
                                                    <td>
                                                        {
                                                            (program.course_id.institution_id === null) ? (
                                                                <>
                                                                    
                                                                </>
                                                            ) : (
                                                                <>
                                                                    {
                                                                        program.course_id.institution_id.institution
                                                                    }
                                                                </>
                                                            )
                                                        }
                                                    </td>
                                                    <td>
                                                        {(program.role_editor === true) ? 'Editor' : (
                                                            <>
                                                                {(program.role_author === true) ? 'Author' : (
                                                                    <>
                                                                        {(program.role_lead === true) ? 'Lead' : (
                                                                            <>
                                                                                {(program.role_reader === true) ? 'Reader' : null}
                                                                            </>
                                                                        )}
                                                                    </>
                                                                )}
                                                            </>
                                                        )}
                                                    </td>
                                                    <td>
                                                        <select
                                                            className='form-select'
                                                            onChange={(e) => {
                                                                if (e.target.value === 'edit') {
                                                                    let role = '';
                                                                    if (program.role_editor === true) {
                                                                        role = 'Editor'
                                                                    }
                                                                    if (program.role_author === true) {
                                                                        role = 'Author'
                                                                    }
                                                                    if (program.role_lead === true) {
                                                                        role = 'Lead'
                                                                    }
                                                                    if (program.role_reader === true) {
                                                                        role = 'Reader'
                                                                    }
                                                                    alert(program.course_id.id)
                                                                    window.localStorage.setItem('id', program.course_id.id)
                                                                    newHook.enterEdit(role, program.course_id.id)
                                                                } else if(e.target.role === 'delete') {
                                                                    newHook.deleteCourse(program.course_id.id)
                                                                } else {
                                                                    return false;
                                                                }
                                                            }}
                                                        >
                                                            <option>Action</option>
                                                            <option value={'preview'}>Preview</option>
                                                            <option value={'edit'}>Edit</option>
                                                            <option value={'delete'}>Delete</option>
                                                        </select>
                                                    </td>
                                                    <td className='d-none'>
                                                        <span className='link' style={{ marginRight: '10px', color: 'green' }}>
                                                            <i className="fa fa-eye"></i>
                                                        </span>
                                                        <span
                                                            onClick={(e) => {
                                                                let role = '';
                                                                if (program.role_editor === true) {
                                                                    role = 'Editor'
                                                                }
                                                                if (program.role_author === true) {
                                                                    role = 'Author'
                                                                }
                                                                if (program.role_lead === true) {
                                                                    role = 'Lead'
                                                                }
                                                                if (program.role_reader === true) {
                                                                    role = 'Reader'
                                                                }

                                                                newHook.enterEdit(role, program.course_id.id)
                                                            }}
                                                            style={{ marginRight: '' }}
                                                            className='link text-info'>
                                                            <i className="fa fa-edit"></i>
                                                        </span>
                                                        <span className='link' onClick={(e) => newHook.deleteCourse(program.course_id.id)} style={{ marginLeft: '10px', color: 'orangered' }}>
                                                            <i className="fa fa-trash"></i>
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* New Course Modal  */}

            <div className={newHook.addNow ? `${style.modal} modal d-block` : `modal d-none`} id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <form className="modal-dialog modal-dialog-centered" role="document" onSubmit={newHook.startNewCourse}>
                    <div className="modal-content p-3">
                        <div className={`${style.modalHeader} modal-header`}>
                            <h5 className={`${style.modalTitle} modal-title`} id="exampleModalLongTitle">
                                Add New Course
                            </h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={newHook.addNew}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className={`${style.modalBody} modal-body`}>
                            <div className="form-group mb-3">
                                <label className="label" htmlFor="courseCode">
                                    Course Code
                                </label>
                                <input type="text" name="courseCode" id="courseCode" required onChange={(e) => newHook.setNewCourseCode(e.target.value)} className="form-control" placeholder="Enter course code" aria-describedby="helpId" />
                            </div>
                            <div className="form-group mb-3">
                                <label className="label" htmlFor="courseName">
                                    Course Name
                                </label>
                                <input type="text" name="courseName" required onChange={(e) => newHook.setNewCourseName(e.target.value)} id="courseName" className="form-control" placeholder="Enter course name" aria-describedby="helpId" />
                            </div>
                        </div>
                        <div className={`${style.saveModal} modal-footer`}>
                            <button type="submit" disabled={newHook.savingNew} className="btn btn-secondary" data-dismiss="modal">
                                {newHook.savingNew ? (
                                    <>
                                        <i className="fa fa-spinner fa-spin"></i> saving
                                    </>
                                ) : "Save"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Courses