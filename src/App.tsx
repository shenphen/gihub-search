import React from 'react'
import Container from '@material-ui/core/Container'
import './App.css'
import User from 'components/User'
import mock from 'components/User/__mocks__/user.mock'

function App() {
    return (
        <Container maxWidth="md" className="App">
            <header className="App-header">Search bar</header>
            <User {...mock} />
        </Container>
    )
}

export default App
