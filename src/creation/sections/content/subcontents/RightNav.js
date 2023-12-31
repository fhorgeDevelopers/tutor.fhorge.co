import React from 'react'
import { useEdit } from '../../../../contexts/Edit'
import { useBasic } from '../../../../contexts/Basic';
import RightContent from './RightContent';
import { useDetail } from '../../../../contexts/Detail';

const RightNav = () => {
    const edit = useEdit();
    const basic = useBasic();
    const detail = useDetail();
    return (
        <>
            <div className='d-flex justify-content-between' style={{ marginBottom: 0 }}>
                <p className='m-0 mt-2'>
                    Release Date : {basic.releaseDate}
                </p>
                <p className='m-0 mt-2'>
                    <b>
                        Status: {edit.courseStatus}
                    </b>
                </p>
            </div>
            <hr />
            <RightContent data={detail.data} title={detail.title} />
        </>
    )
}

export default RightNav