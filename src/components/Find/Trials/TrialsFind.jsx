import React, { useState, useEffect } from 'react'
import './TrialsFind.css'
import { Form } from 'semantic-ui-react'
import trialsService from '../../../utils/trialsService'





export default function TrialsFind(props) {

    const [formInput, setFormInput] = useState({
        trial: ''
    })
    const [clients, setClients] = useState()



    const handleSelect = (e, { value }) => setFormInput({ ...formInput, ['trial']: value });

    async function selectHandler(e) {
        e.preventDefault()
        const data = await trialsService.findClients(formInput.trial)
        console.log(data)
    }

    return (
        <Form>
            <label>Find clients of trial</label>
            <br /><br />
            <Form.Select
                placeholder='Select Associated Trial'
                id='TrialFindSelect'
                options={
                    props.trials.map(trial => {
                        return {
                            key: trial.name,
                            value: trial._id,
                            text: trial.name
                        }
                    })
                }
                onChange={handleSelect}
                required
            /> <Form.Button id='TrialFindButtonForm' size='mini' onClick={selectHandler}>Search</Form.Button>


        </Form>
    )

}