import React, { useState, useEffect } from 'react'
import { Segment, Header, Loader, Grid } from 'semantic-ui-react'
import trialsService from '../../utils/trialsService'
import './Find.css'
import TrialsFind from '../../components/Find/Trials/TrialsFind'
import { useHistory } from 'react-router-dom'

export default function Find(props) {
    const history = useHistory()
    const [trials, setTrials] = useState()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState()
    const [update, setUpdate] = useState(false)

    useEffect(() => {
        async function getTrials() {
            setLoading(true)
            let data = await trialsService.getTrials()
            await setTrials(data.trials)
            setLoading(false)
        }
        getTrials();
    }, []);

    // if (history.location.path !== history.location.pathname) {
    //     setUpdate(!update)
    // }

    useEffect(() => {
        const timer = setTimeout(() => {
            setError(null);
        }, 3000);
        return () => clearTimeout(timer);
    }, [error]);


    if (loading) {
        return (
            <Grid
                textAlign="center"
                style={{ height: "100vh" }, { margin: '10em' }}
                verticalAlign="middle"
            >
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Loader size="large" active>
                        Loading
                    </Loader>
                </Grid.Column>
            </Grid>
        );
    } else {
        return (
            <Segment style={{ maxWidth: 450, margin: 'auto', marginTop: '1em', border: 'none' }}>
                <Header>
                    Find
                </Header>
                <TrialsFind trials={trials} />

            </Segment>
        )
    }
}