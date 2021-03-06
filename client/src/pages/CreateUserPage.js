import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import { useHistory } from 'react-router-dom'

export const CreateUserPage = () => {
    const [link, setLink] = useState('')
    const { request } = useHttp()
    const auth = useContext(AuthContext)
    const history = useHistory()

    useEffect(() => {
        window.M.updateTextFields()                  //Просто делает текстовые инпуты активными (materialize)
    }, [])

    const pressHandler = async (event) => {
        if (link.length > 0) {
            try {
                const data = await request(
                    '/api/link/generate',
                    'POST',
                    { from: link },
                    { Authorization: `Bearer ${auth.token}` }
                )
                history.push(`/detail/${data.link._id}`)
            } catch (error) {

            }
        }
    }

    return (
        <div className="row">
            <div className="col s8 offset-s2" style={{ paddingTop: '2rem' }}>
                <div className="input-field">
                    <input
                        placeholder="Вставьте ссылку"
                        id="link"
                        type="text"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                    />
                    <label htmlFor="link">Вставьте ссылку</label>
                    <button
                        className='btn yellow darken-4'
                        style={{ marginRight: 10 }}
                        onClick={pressHandler}
                    >Создать сокращенную ссылку</button>
                </div>
            </div>
        </div>
    )
}