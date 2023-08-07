import React, { useEffect, useState } from 'react'
import { useDetail } from '../../../../contexts/Detail'
import { useEdit } from '../../../../contexts/Edit';
import { useAuth } from '../../../../contexts/Auth';
import swal from 'sweetalert';
import axios from 'axios';
import { useHook } from '../../../../contexts/Hook';
import Question from './Question';

const Problems = (props) => {
    const detail = useDetail();
    const edit = useEdit();
    const auth = useAuth();
    const hook = useHook();

    const [newProblem, setNewProblem] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [fetchingProblems, setFetchingProblems] = useState(false);
    const [newQuestionNo, setNewQuestionNo] = useState('');
    const [newQuestion, setnewQuestion] = useState('');
    const [newQuestionType, setnewQuestionType] = useState('');
    const [key, setKey] = useState('0');

    const [allocated_score, set_allocated_score] = useState(0);

    const proPosition = (questions) => {
        let count = questions.length;
        let next = count + 1;
        console.log(next);
        setNewQuestionNo("0" + next);
    }

    const toggleNewProblem = () => {
        if (newProblem) {
            setNewProblem(false)
        } else {
            setNewProblem(true)
        }
        setKey(Math.random())
    }

    const saveProblem = () => {
        setIsLoading(true);
        swal({
            title: "Create Question",
            text: "Creating...",
            icon: "info",
            buttons: false,
            timer: 5000,
        })
        setIsLoading(true);

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${hook.api}/i/course-question/`,
            headers: {
                'Authorization': auth.token
            },
            data: {
                "component_id": props.data.id,
                "question_no": newQuestionNo,
                "type": newQuestionType,
                "question": newQuestion,
            }
        };
        axios(config)
            .then(function (response) {
                if (response.data.id) {
                    detail.lessonChanges(props.data.lesson_id);
                    swal({
                        title: "Create Question",
                        text: "Created",
                        icon: "success",
                        buttons: false,
                        timer: 5000,
                    })
                    toggleNewProblem();
                    setIsLoading(false);
                    setnewQuestion('');
                } else {
                    swal({
                        title: "Create Question",
                        text: response.data.detail,
                        icon: "error",
                        buttons: false,
                        timer: 5000,
                    })
                    setIsLoading(false);
                }
            })
            .catch(function (error) {
                swal({
                    title: "Create Component",
                    text: error.message,
                    icon: "error",
                    buttons: false,
                    dangerMode: true,
                    timer: 5000,
                })
                setIsLoading(false);
            });
    }

    useEffect(() => {
        setnewQuestion('');
        proPosition(props.data.questions)
        return () => {
            return true;
        };
    }, [newProblem]);

    useEffect(() => {
        // console.log(props.data)
        return () => {
            return true;
        };
    }, [detail.data]);


    return (
        <>
            <div className="form-group mb-3">
                <div className='d-flex justify-content-between alignCenter mb-2'>
                    <label className="label mb-0 p-0" htmlFor="courseCode">
                        Problem Questions
                    </label>
                    <div>
                        <div className={fetchingProblems ? 'fa fa-spinner fa-spin' : 'd-none'} ></div>
                        <button type="button" disabled={detail.activeComp !== props.data.id} className={!newProblem ? 'btn bgPreview' : 'd-none'} onClick={toggleNewProblem} style={{ marginLeft: '10px' }}>
                            New
                        </button>
                        <button type="button" className={newProblem ? 'btn bgPreview mr-20' : 'd-none'} onClick={saveProblem}>
                            {isLoading ? (
                                <>
                                    <span className='fa fa-spinner fa-spin'></span>
                                </>
                            ) : (
                                'Save'
                            )}
                        </button>
                        <button type="button" className={newProblem ? 'btn bgCancel' : 'd-none'} onClick={toggleNewProblem}>
                            Cancel
                        </button>
                    </div>
                </div>
                <hr />
                <form onSubmit={(e) => e.preventDefault()} id="newProForm" className={newProblem ? 'row' : 'd-none'}>
                    <div className='col-md-3'>
                        <div className="form-group mb-3">
                            <label className="label" htmlFor="courseName">
                                Question No
                            </label>
                            <input
                                type="text"
                                name="questionNo"
                                required
                                id="courseName"
                                className="form-control"
                                placeholder=""
                                value={newQuestionNo}
                                aria-describedby="helpId"
                            />
                        </div>
                    </div>
                    <div className='col-md-3'>
                        <div className="form-group mb-3">
                            <label className="label" htmlFor="courseName">
                                Type
                            </label>
                            <select className='form-select' onChange={e => setnewQuestionType(e.target.value)}>
                                <option value={null}>
                                    Select a type
                                </option>
                                {auth.questionOptions.map((option) => (
                                    <option key={option['V']} value={option['V']}>
                                        {option['D']}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className='col-lg-6 d-flex'>
                        <div className="form-group mb-3 w-100">
                            <label className="label" htmlFor="courseName">
                                Question
                            </label>
                            <div className='d-flex align-center'>
                                <input
                                    type="text"
                                    name="componentTitle"
                                    required id="courseName"
                                    className="form-control"
                                    placeholder="Input Title"
                                    defaultValue={newQuestion}
                                    onChange={e => setnewQuestion(e.target.value)}
                                    aria-describedby="helpId"
                                />
                            </div>
                        </div>
                    </div>
                    <hr />
                </form>
                <table className='compTable'>
                    {props.data.questions ? (
                        <>
                            {(props.data.questions.length !== 0) ? (
                                <>
                                    <table className='compTable w-100' style={{ padding: '10px' }}>

                                        {props.data.questions.map((que) => (
                                            <>
                                                <Question data={que} compID={props.data.id} lesson_id={props.data.lesson_id} />
                                            </>
                                        ))}
                                    </table>
                                </>
                            ) : null}
                        </>
                    ) : (null)}
                </table>
            </div >

        </>
    )
}

export default Problems