import React from 'react'
import {Banner, Hero} from '../components/Banner'
import { Link } from 'react-router-dom'

function ErrorPage() {
    return (
        <Hero>
           <Banner title='404'
           subtitle='page not found'>
               <Link to='/' className='btn-primary'>
                   return home
               </Link>

            </Banner> 
        </Hero>
    )
}

export default ErrorPage
