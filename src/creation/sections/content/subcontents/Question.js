import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../../contexts/Auth';
import { useDetail } from '../../../../contexts/Detail';
import { useEdit } from '../../../../contexts/Edit';
import swal from 'sweetalert';
import { useHook } from '../../../../contexts/Hook';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Question = (props) => {
    let que = props.data;
    const auth = useAuth();
    const detail = useDetail();
    const edit = useEdit();
    const hook = useHook()
    const location = useLocation();

    const [seeLess, setSeeLess] = useState('');
    const [activeQuestion, setActiveQuestion] = useState('');
    const component_id = useState(que.id);
    const [showMen, setShowMen] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [activeQue, setActiveQue] = useState('');
    const [deleting, setDeleting] = useState(false)

    const [allocated_score, set_allocated_score] = useState(que.allocated_score);
    const [answer_number, set_answer_number] = useState(que.answer_number);
    const [answer_option, set_answer_option] = useState(que.answer_option);
    const [answer_text, set_answer_text] = useState(que.answer_text);
    const [feedback, set_feedback] = useState(que.feedback);
    const [hint, set_hint] = useState(que.hint);
    const [option1, set_option1] = useState(que.option1);;
    const [option2, set_option2] = useState(que.option2);
    const [option3, set_option3] = useState(que.option3);
    const [option4, set_option4] = useState(que.option4);
    const [option5, set_option5] = useState(que.option5);
    const [question, set_question] = useState(que.question);
    const [question_no, set_question_no] = useState(que.question_no);
    const [type, set_type] = useState(que.type);

    const [patchData, setPatchData] = useState({
        allocated_score: allocated_score,
        answer_number: answer_number,
        answer_option: answer_option,
        answer_text: answer_text,
        component_id: props.compID,
        feedback: feedback,
        hint: hint,
        id: que.id,
        option1: option1,
        option2: option2,
        option3: option3,
        option4: option4,
        option5: option5,
        question: question,
        question_no: question_no,
        type: type,
    });

    const updateData = (e) => {
        setPatchData({
            ...patchData,
            [e.target.name]: e.target.value
        })
    }

    const key = useState(Math.random())


    const toggleMore = (passed) => {
        if (seeLess === passed)
            setSeeLess('')
        else
            setSeeLess(passed)
    }

    const toogleshowMen = () => {
        if (showMen) {
            setShowMen(false)
        } else {
            setShowMen(true)
        }
    }

    const editQuestion = (theID) => {
        if (edit.unsaved) {
            swal({
                title: "Cancel Editing?",
                text: "All unsaved changes will be gone, do you want to proceed?",
                icon: "warning",
                buttons: ['Continue Editing', 'Cancel Editing'],
                dangerMode: true,
            }).then((willCancel) => {
                if (willCancel) {
                    detail.toggleQuestionEdit(theID)
                    edit.setUnsaved(false)
                    setSeeLess(false)
                } else {
                    return false;
                }
            })
        } else {
            detail.toggleQuestionEdit(theID)
        }
    }

    const saveQuestion = (e) => {
        e.preventDefault();

        swal({
            title: "Exercise question",
            text: "Updating",
            icon: "info",
            buttons: false,
            timer: 5000
        })
        setIsLoading(true)
        let config = {
            method: 'patch',
            maxBodyLength: Infinity,
            url: `${hook.api}/i/course-question/`,
            headers: {
                'Authorization': auth.token
            },
            data: {
                allocated_score: allocated_score,
                answer_number: answer_number,
                answer_option: answer_option,
                answer_text: answer_text,
                component_id: props.compID,
                feedback: feedback,
                hint: hint,
                id: que.id,
                option1: option1,
                option2: option2,
                option3: option3,
                option4: option4,
                option5: option5,
                question: question,
                question_no: question_no,
                type: type,
            }
        };

        axios(config)
            .then(function (response) {
                if (response.data.id) {
                    swal({
                        title: "Exercise question",
                        text: "Updated",
                        icon: "success",
                        buttons: false,
                        timer: 5000
                    })
                    detail.lessonChanges(props.lesson_id);
                    setIsLoading(false)
                    setSeeLess(false)
                } else {
                    swal({
                        title: "Exercise question",
                        text: response.data.detail,
                        icon: "error",
                        buttons: false,
                        dangerMode: true,
                        timer: 5000
                    })
                    setIsLoading(false)
                }
            })
            .catch(function (error) {
                swal({
                    title: "Exercise question",
                    text: error.message,
                    icon: "error",
                    buttons: false,
                    dangerMode: true,
                    timer: 5000
                })
                setIsLoading(false)
            });
    }

    const deleteQuestion = (theID) => {
        swal({
            title: "Delete Question",
            text: "Are you sure you want to delete this Question?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            timer: 5000,
        })
            .then((willDelete) => {
                if (willDelete) {
                    setDeleting(true)
                    let config = {
                        method: 'delete',
                        maxBodyLength: Infinity,
                        url: `${hook.api}/i/course-question/`,
                        headers: {
                            'Authorization': auth.token
                        },
                        data: {
                            id: theID
                        }
                    };

                    axios(config)
                        .then(function (response) {
                            if (response.data.message) {
                                setDeleting(false)
                                detail.lessonChanges(props.lesson_id);
                                swal({
                                    title: "Delete Question",
                                    text: "Deleted",
                                    icon: "success",
                                    buttons: false,
                                    dangerMode: true,
                                    timer: 5000
                                })
                            } else {
                                swal({
                                    title: "Delete Question",
                                    text: response.data.detail,
                                    icon: "error",
                                    buttons: true,
                                    dangerMode: true,
                                    timer: 5000
                                })
                                setDeleting(false)
                            }
                        })
                        .catch(function (error) {
                            swal({
                                title: "Delete Question",
                                text: error.message,
                                icon: "error",
                                buttons: false,
                                dangerMode: true,
                                timer: 5000
                            })
                            setDeleting(false)
                        });
                } else {
                    swal({
                        title: "Delete Question",
                        text: "Cancelled by user",
                        icon: "error",
                        buttons: false,
                        dangerMode: true,
                        timer: 5000
                    })
                }
            });
    }

    const declareNewRadioAnswer = (answer) => {
        set_answer_option(answer)
    }

    const declareNewCheckAnswer = (answer) => {
        if (answer_option !== null || answer_option) {
            if (answer_option.includes(answer + ",")) {
                let newAnswer = answer_option.replace(answer + ",", "")
                set_answer_option(newAnswer)
            } else {
                set_answer_option(answer_option + answer + ",")
            }
        } else {
            set_answer_option(answer + ",")
        }
    }

    const checkBoxChecked = (option) => {
        if (type === "CH") {
            if (answer_option !== null) {
                if (answer_option.includes(option)) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    }

    useEffect(() => {
        set_answer_option('');
        return () => {
            return true;
        };
    }, [type]);

    useEffect(() => {
        setActiveQue('');
        return () => {
            return true;
        };
    }, [props]);

    useEffect(() => {
        document.addEventListener("change", function (event) {
            edit.setUnsaved(true);
        });
        edit.setUnsaved(false);
        return () => {
            return true;
        }
    }, [location.key])

    return (
        <>
            <tr key={key} id={que.id}>
                <div className='p-2 w-100' >
                    <form
                        onSubmit={
                            (e) => saveQuestion(e)
                        }
                    >
                        <div className={'d-flex justify-content-end'}>
                            <button className={((detail.activeQue === que.id)) ? 'btn bgPreview' : 'd-none'} type={'submit'} onClick={(e) => saveQuestion(e)}>
                                {isLoading ? (
                                    <>
                                        <span className='fa fa-spinner fa-spin'></span>
                                    </>
                                ) : (
                                    'Save'
                                )}
                            </button>

                            <button className={(detail.activeQue === que.id) ? 'btn btn-warning' : 'd-none'} type={'button'} onClick={() => editQuestion(que.id)} style={{ marginLeft: '10px' }}>
                                Cancel
                            </button>

                            <div class={`${((detail.activeQue !== que.id) && (detail.activeComp === props.compID)) ? 'ellMenu' : 'd-none'}`}>
                                <div className={''}>
                                    <span className='fa fa-ellipsis-v sm-menu-btn' onClick={() => toogleshowMen()}></span>
                                </div>
                                <ul className='editMenu'>
                                    <li className='sm-menu-link' onClick={() => { editQuestion(que.id); toogleshowMen() }}>
                                        Edit
                                    </li>
                                    <li className='sm-menu-link' onClick={() => { deleteQuestion(que.id); toogleshowMen() }}>
                                        Delete
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-lg-5 d-flex'>
                                <div className="form-group mb-3 w-100">
                                    <label className="label" htmlFor="courseName">
                                        Question no
                                    </label>
                                    <div className='d-flex align-center'>
                                        <input
                                            type="text"
                                            name="componentTitle"
                                            id="courseName"
                                            className="form-control"
                                            placeholder="Input Title"
                                            defaultValue={question_no}
                                            onChange={e => set_question_no(e.target.value)}
                                            aria-describedby="helpId"
                                            disabled={(detail.activeQue === que.id) ? false : true}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className="form-group mb-3">
                                    <label className="label" htmlFor="courseName">
                                        Type
                                    </label>
                                    <select
                                        className='form-select'
                                        defaultValue={type}
                                        onChange={e => set_type(e.target.value)}
                                        disabled={(detail.activeQue === que.id) ? false : true}
                                    >
                                        <option value={null}>
                                            Select a type
                                        </option>
                                        {auth.questionOptions.map((option) => (
                                            <option
                                                key={Math.random()}
                                                value={option['V']}
                                                selected={(type === option['V'])}
                                            >
                                                {option['D']}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <span className={`${(seeLess === que.id) ? 'fa fa-angle-up is-hoverable' : 'fa fa-angle-down is-hoverable'} col-1 d-flex justify-content-center align-items-center`} style={{ lineHeight: '18px', padding: '5px 10px' }} onClick={(e) => toggleMore(que.id)}></span>
                        </div>
                        <section className={`${(seeLess === que.id) ? 'd-block' : 'd-none'} `}>
                            <div className='row'>
                                <div className='col-lg-12 d-flex'>
                                    <div className='row w-100'>
                                        <div className='col-sm-12'>
                                            <div className="form-group mb-3 w-100" style={{ marginRight: '1.2rem' }}>
                                                <label className="label" htmlFor="courseName">
                                                    Question
                                                </label>
                                                <div className='d-flex align-center'>
                                                    <textarea
                                                        type="text"
                                                        name="componentTitle"
                                                        id="courseName"
                                                        className="form-control"
                                                        placeholder="Input Title"
                                                        defaultValue={question}
                                                        onChange={e => set_question(e.target.value)}
                                                        aria-describedby="helpId"
                                                        disabled={(detail.activeQue === que.id) ? false : true}
                                                    ></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={type === "TE" ? 'col-lg-12 d-flex' : 'd-none'}>
                                    <div className="form-group mb-3 w-100">
                                        <label className="label" htmlFor="courseName">
                                            Answer Text
                                        </label>
                                        <div className='d-flex align-center'>
                                            <input
                                                type="text"
                                                name="componentTitle"
                                                id="courseName"
                                                className="form-control"
                                                placeholder="Answer text"
                                                defaultValue={answer_text}
                                                onChange={e => set_answer_text(e.target.value)}
                                                aria-describedby="helpId"
                                                disabled={(detail.activeQue === que.id) ? false : true}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className={type === "NU" ? 'col-lg-12 d-flex' : 'd-none'}>
                                    <div className="form-group mb-3 w-100">
                                        <label className="label" htmlFor="courseName">
                                            Answer Number
                                        </label>
                                        <div className='d-flex align-center'>
                                            <input
                                                type="text"
                                                name="componentTitle"
                                                id="courseName"
                                                className="form-control"
                                                placeholder="Answer text"
                                                defaultValue={answer_number}
                                                onChange={e => set_answer_number(e.target.value)}
                                                aria-describedby="helpId"
                                                disabled={(detail.activeQue === que.id) ? false : true}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className={type === "DI" ? 'col-lg-12 d-flex' : 'd-none'}>
                                    <div className="form-group mb-3 w-100">
                                        <label className="label" htmlFor="courseName">
                                            Answer file url
                                        </label>
                                        <div className='d-flex align-center'>
                                            <input
                                                type="url"
                                                name="componentTitle"
                                                id="courseName"
                                                className="form-control"
                                                placeholder="Answer file url"
                                                defaultValue={answer_text}
                                                onChange={e => set_answer_text(e.target.value)}
                                                aria-describedby="helpId"
                                                disabled={(detail.activeQue === que.id) ? false : true}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className={(type === "BO" || type === "RK") ? 'col-lg-12 d-flex' : 'd-none'}>
                                    <div className="form-group mb-3 w-100">
                                        <label className="label" htmlFor="courseName">
                                            Answer boolean
                                        </label>
                                        <div className='d-flex align-center'>
                                            <input
                                                type="url"
                                                name="componentTitle"
                                                id="courseName"
                                                className="form-control"
                                                placeholder="Answer boolean"
                                                defaultValue={answer_text}
                                                onChange={e => set_answer_text(e.target.value)}
                                                aria-describedby="helpId"
                                                disabled={(detail.activeQue === que.id) ? false : true}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className={(type === "RA" || type === "DR") ? 'col-lg-12 d-flex' : 'd-none'}>
                                    <div className='row w-100'>
                                        <div className='col-sm-12'>
                                            <div className="form-group mb-3 w-100">
                                                <div className="row">
                                                    <div className="col-sm-2">
                                                        <label className="label" htmlFor="courseName">
                                                            Options
                                                        </label>
                                                    </div>
                                                    <div className="col-sm-10">
                                                        <div className='col-sm-12'>
                                                            <div className="form-group mb-3 w-100">
                                                                <div className='d-flex align-center'>
                                                                    <input type='radio' name="radioButton" style={{ marginRight: '10px' }} onClick={() => declareNewRadioAnswer(1)} checked={(answer_option === 1) ? true : false} />
                                                                    <input
                                                                        type="text"
                                                                        name="componentTitle"
                                                                        id="courseName"
                                                                        className="form-control"
                                                                        placeholder="1"
                                                                        defaultValue={option1}
                                                                        onChange={e => set_option1(e.target.value)}
                                                                        disabled={(detail.activeQue === que.id) ? false : true}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='col-sm-12'>
                                                            <div className="form-group mb-3 w-100">
                                                                <div className='d-flex align-center'>
                                                                    <input type='radio' name="radioButton" style={{ marginRight: '10px' }} onClick={() => declareNewRadioAnswer(2)} checked={answer_option === 2} />
                                                                    <input
                                                                        type="text"
                                                                        name="componentTitle"
                                                                        id="courseName"
                                                                        className="form-control"
                                                                        placeholder="2"
                                                                        defaultValue={option2}
                                                                        onChange={e => set_option2(e.target.value)}
                                                                        aria-describedby="helpId"
                                                                        disabled={(detail.activeQue === que.id) ? false : true}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='col-sm-12'>
                                                            <div className="form-group mb-3 w-100">
                                                                <div className='d-flex align-center'>
                                                                    <input type='radio' name="radioButton" style={{ marginRight: '10px' }} onClick={() => declareNewRadioAnswer(3)} checked={answer_option === 3} />
                                                                    <input
                                                                        type="text"
                                                                        name="componentTitle"
                                                                        id="courseName"
                                                                        className="form-control"
                                                                        placeholder="3"
                                                                        defaultValue={option3}
                                                                        onChange={e => set_option3(e.target.value)}
                                                                        aria-describedby="helpId"
                                                                        disabled={(detail.activeQue === que.id) ? false : true}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='col-sm-12'>
                                                            <div className="form-group mb-3 w-100">
                                                                <div className='d-flex align-center'>
                                                                    <input type='radio' name="radioButton" style={{ marginRight: '10px' }} onClick={() => declareNewRadioAnswer(4)} checked={answer_option === 4} />
                                                                    <input
                                                                        type="text"
                                                                        name="componentTitle"
                                                                        id="courseName"
                                                                        className="form-control"
                                                                        placeholder="4"
                                                                        defaultValue={option4}
                                                                        onChange={e => set_option4(e.target.value)}
                                                                        aria-describedby="helpId"
                                                                        disabled={(detail.activeQue === que.id) ? false : true}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='col-sm-12'>
                                                            <div className="form-group mb-3 w-100">
                                                                <div className='d-flex align-center'>
                                                                    <input type='radio' name="radioButton" style={{ marginRight: '10px' }} onClick={() => declareNewRadioAnswer(5)} checked={answer_option === 5} />
                                                                    <input
                                                                        type="text"
                                                                        name="componentTitle"
                                                                        id="courseName"
                                                                        className="form-control"
                                                                        placeholder="5"
                                                                        defaultValue={option5}
                                                                        onChange={e => set_option5(e.target.value)}
                                                                        aria-describedby="helpId"
                                                                        disabled={(detail.activeQue === que.id) ? false : true}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={(type === "CH") ? 'col-lg-12 d-flex' : 'd-none'}>
                                    <div className='row w-100'>
                                        <div className='col-sm-12'>
                                            <div className="form-group mb-3 w-100">
                                                <div className="row">
                                                    <div className="col-sm-2">
                                                        <label className="label" htmlFor="courseName">
                                                            Options
                                                        </label>
                                                    </div>
                                                    <div className="col-sm-10">
                                                        <div className="col-sm-12 form-group mb-3 w-100">
                                                            <div className='d-flex align-center'>
                                                                <input
                                                                    type='checkbox'
                                                                    name="checkBox"
                                                                    style={{ marginRight: '10px' }}
                                                                    onChange={() => declareNewCheckAnswer(1)}
                                                                    checked={checkBoxChecked(1)}
                                                                />
                                                                <input
                                                                    type="text"
                                                                    name="componentTitle"
                                                                    id="courseName"
                                                                    className="form-control"
                                                                    placeholder="1"
                                                                    defaultValue={option1}
                                                                    onChange={
                                                                        e => {
                                                                            set_option1(e.target.value)
                                                                        }
                                                                    }
                                                                    aria-describedby="helpId"
                                                                    disabled={(detail.activeQue === que.id) ? false : true}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className='col-sm-12'>
                                                            <div className="form-group mb-3 w-100">
                                                                <div className='d-flex align-center'>
                                                                    <input
                                                                        type='checkbox'
                                                                        name="checkBox"
                                                                        style={{ marginRight: '10px' }}
                                                                        onChange={() => declareNewCheckAnswer(2)}
                                                                        checked={checkBoxChecked(2)}
                                                                    />
                                                                    <input
                                                                        type="text"
                                                                        name="componentTitle"
                                                                        id="courseName"
                                                                        className="form-control"
                                                                        placeholder="2"
                                                                        defaultValue={option2}
                                                                        onChange={e => set_option2(e.target.value)}
                                                                        aria-describedby="helpId"
                                                                        disabled={(detail.activeQue === que.id) ? false : true}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='col-sm-12'>
                                                            <div className="form-group mb-3 w-100">
                                                                <div className='d-flex align-center'>
                                                                    <input
                                                                        type='checkbox'
                                                                        name="checkBox"
                                                                        style={{ marginRight: '10px' }}
                                                                        onChange={() => declareNewCheckAnswer(3)}
                                                                        checked={checkBoxChecked(3)}
                                                                    />
                                                                    <input
                                                                        type="text"
                                                                        name="componentTitle"
                                                                        id="courseName"
                                                                        className="form-control"
                                                                        placeholder="3"
                                                                        defaultValue={option3}
                                                                        onChange={e => set_option3(e.target.value)}
                                                                        aria-describedby="helpId"
                                                                        disabled={(detail.activeQue === que.id) ? false : true}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='col-sm-12'>
                                                            <div className="form-group mb-3 w-100">
                                                                <div className='d-flex align-center'>
                                                                    <input
                                                                        type='checkbox'
                                                                        name="checkBox"
                                                                        style={{ marginRight: '10px' }}
                                                                        onChange={() => declareNewCheckAnswer(4)}
                                                                        checked={checkBoxChecked(4)}
                                                                    />
                                                                    <input
                                                                        type="text"
                                                                        name="componentTitle"
                                                                        id="courseName"
                                                                        className="form-control"
                                                                        placeholder="4"
                                                                        defaultValue={option4}
                                                                        onChange={e => set_option4(e.target.value)}
                                                                        aria-describedby="helpId"
                                                                        disabled={(detail.activeQue === que.id) ? false : true}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='col-sm-12'>
                                                            <div className="form-group mb-3 w-100">
                                                                <div className='d-flex align-center'>
                                                                    <input
                                                                        type='checkbox'
                                                                        name="checkBox"
                                                                        style={{ marginRight: '10px' }}
                                                                        onChange={() => declareNewCheckAnswer(5)}
                                                                        checked={checkBoxChecked(5)}
                                                                    />
                                                                    <input
                                                                        type="text"
                                                                        name="componentTitle"
                                                                        id="courseName"
                                                                        className="form-control"
                                                                        placeholder="5"
                                                                        defaultValue={option5}
                                                                        onChange={e => set_option5(e.target.value)}
                                                                        aria-describedby="helpId"
                                                                        disabled={(detail.activeQue === que.id) ? false : true}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-lg-12 d-flex'>
                                    <div className="form-group mb-3 w-100">
                                        <label className="label" htmlFor="courseName">
                                            Hint
                                        </label>
                                        <div className='d-flex align-center'>
                                            <textarea
                                                type="text"
                                                name="componentTitle"
                                                id="courseName"
                                                className="form-control"
                                                placeholder="Input Title"
                                                defaultValue={hint}
                                                onChange={e => set_hint(e.target.value)}
                                                aria-describedby="helpId"
                                                disabled={(detail.activeQue === que.id) ? false : true}
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-lg-12 d-flex'>
                                    <div className="form-group mb-3 w-100">
                                        <label className="label" htmlFor="courseName">
                                            Feedback
                                        </label>
                                        <div className='d-flex align-center'>
                                            <textarea
                                                type="text"
                                                name="componentTitle"
                                                id="courseName"
                                                className="form-control"
                                                placeholder="Input Title"
                                                defaultValue={feedback}
                                                onChange={e => set_feedback(e.target.value)}
                                                aria-describedby="helpId"
                                                disabled={(detail.activeQue === que.id) ? false : true}
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div className={'col-lg-12 d-flex'}>
                                    <div className="form-group mb-3 w-100">
                                        <label className="label" htmlFor="courseName">
                                            Allocated score
                                        </label>
                                        <div className='d-flex align-center'>
                                            <input
                                                type="text"
                                                name="componentTitle"
                                                id="courseName"
                                                className="form-control"
                                                placeholder="Allocated score"
                                                defaultValue={allocated_score}
                                                onChange={e => set_allocated_score(e.target.value)}
                                                aria-describedby="helpId"
                                                disabled={(detail.activeQue === que.id) ? false : true}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </form>
                </div>
            </tr >
        </>
    )
}

export default Question