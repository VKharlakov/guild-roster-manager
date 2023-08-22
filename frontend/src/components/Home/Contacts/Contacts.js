import './Contacts.css'
import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

function Contacts() {
    const [isCopied, setIsCopied] = React.useState(false)

    function onCopy() {
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 2000)
    }

    return (
        <section className='contacts'>
            <ul className='contacts__list'>
                <li className='contacts__list-item'>
                    <span className='contacts__icon contacts__icon_type_github' />
                    <a className='contacts__link' href='https://github.com/VKharlakov/guild-roster-manager' rel='noreferrer' target='_blank'>
                        GitHub
                    </a>
                </li>
                <li className='contacts__list-item'>
                    <span className='contacts__icon contacts__icon_type_linkedin' />
                    <a className='contacts__link' href='https://www.linkedin.com/in/vkharlakov/' rel='noreferrer' target='_blank'>
                        Author on LinkedIn
                    </a>
                </li>
                <li className='contacts__list-item'>
                    <span className='contacts__icon contacts__icon_type_email' />
                    <CopyToClipboard text='guildrostermanager@gmail.com' onCopy={onCopy}>
                        <p className='contacts__text contacts__text_type_email'>
                            guildrostermanager@gmail.com
                            <span className={`contacts__alert${isCopied ? '' : ' contacts__alert_hidden'}`}>Copied to clipboard!</span>
                        </p>
                    </CopyToClipboard>
                </li>
                <li className='contacts__list-item'>
                    <span className='contacts__icon' />
                    <a className='contacts__link' href='https://raider.io/' rel='noreferrer' target='_blank'>
                        Raider.io
                    </a>
                </li>
            </ul>
            <p className='contacts__author'>Kharlakov 2023</p>
        </section>
    )
}

export default Contacts