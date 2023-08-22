import './RaidSkeleton.css'

function RaidSkeleton() {
    return (
        <div className='raid-skeleton'>
            <div className='raid-skeleton__container'>
                <span className='raid-skeleton__title'></span>
                <span className='raid-skeleton__body'></span>
                <span className='raid-skeleton__info-panel'></span>
            </div>
        </div>
    )
}

export default RaidSkeleton