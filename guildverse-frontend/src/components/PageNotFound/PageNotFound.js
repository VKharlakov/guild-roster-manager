import { Link } from 'react-router-dom'
import './PageNotFound.css'

function PageNotFound () {
    return (
        <div className='page-not-found'>
            <h2 className='page-not-found__title'>Page doesn't exist</h2>
            <p className='page-not-foud__brief'>error 404 has occurred</p>
            <Link to={'/'} className='page-not-found__link'>To the main page</Link>
        </div>
    )
}

export default PageNotFound