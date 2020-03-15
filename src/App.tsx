import React, { useState } from 'react'
import Container from '@material-ui/core/Container'
import Search from 'components/Search'
import User from 'components/User'

function App() {
    const [userName, setUserName] = useState<string>('')

    return (
        <Container maxWidth="md" className="App">
            <header className="App-header">
                <Search onChange={setUserName} />
            </header>
            {userName && <User name={userName} />}
        </Container>
    )
}

export default App
