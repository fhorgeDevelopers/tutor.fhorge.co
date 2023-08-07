import React, { useEffect } from 'react';
import sectionStyle from './section.module.css';
import AuthoringSections from '../../navigations/AuthoringSections';
import { useParams } from 'react-router-dom';
import { useEdit } from '../../contexts/Edit';
import tabstyle from './tabstyle.module.css';

const SectionsLanding = () => {
    let { id } = useParams();
    const edit = useEdit();

    useEffect((id) => {
        if (!window.localStorage.getItem('id')) {
            window.localStorage.setItem('id', id);
        }
    }, [])

    return (
        <>
            <div className={sectionStyle.sectionBody}>
                {/* navigation bar for the sections */}
                <AuthoringSections />

                {/* tab menu  */}
                <div className='mt-4'>
                    <div className='container'>
                        <div className={`${tabstyle.tabFlex} justify-content-between tab`} style={{ background: '#F2F2F2', borderRadius: '15px' }}>
                            <div className={(edit.courseTab === "basic") ? `${tabstyle.grow} ${tabstyle.active}` : `${tabstyle.grow}`} onClick={(e) => edit.goToTab("basic", id)}>
                                Basic
                            </div>
                            <div className={(edit.courseTab === "grading") ? `${tabstyle.grow} ${tabstyle.active}` : `${tabstyle.grow}`} onClick={(e) => edit.goToTab("grading", id)}>
                                Grading
                            </div>
                            <div className={(edit.courseTab === "courseTeam") ? `${tabstyle.grow} ${tabstyle.active}` : `${tabstyle.grow}`} onClick={(e) => edit.goToTab("courseTeam", id)}>
                                Course Team
                            </div>
                            <div className={(edit.courseTab === "resources") ? `${tabstyle.grow} ${tabstyle.active}` : `${tabstyle.grow}`} onClick={(e) => edit.goToTab("resources", id)}>
                                Resources
                            </div>
                            <div className={(edit.courseTab === "content") ? `${tabstyle.grow} ${tabstyle.active}` : `${tabstyle.grow}`} onClick={(e) => edit.goToTab("content", id)}>
                                Content
                            </div>
                            <div className={(edit.courseTab === "submit") ? `${tabstyle.grow} ${tabstyle.active}` : `${tabstyle.grow}`} onClick={(e) => edit.goToTab("submit", id)}>
                                Submit
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SectionsLanding