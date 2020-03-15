import React, { ChangeEvent, useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import debounce from 'lodash.debounce'
import api from 'utils/api'
import useFetch from 'utils/hooks/useFetch'

interface SearchProps {
    onChange: (name: string) => void
}

const Search = ({ onChange }: SearchProps) => {
    const [{ data }, fetchUserSuggestions] = useFetch<string[], string>(
        [],
        api.getUsernameSuggestions,
        ''
    )
    const debouncedOnChange = debounce(triggerValueChange, 500)

    useEffect(() => {
        return () => debouncedOnChange.cancel()
    }, [debouncedOnChange])

    return (
        <Autocomplete
            freeSolo
            options={data}
            onInputChange={onInputChange}
            renderInput={params => (
                <TextField {...params} label="Search user" margin="normal" variant="outlined" />
            )}
        />
    )

    function triggerValueChange(value: string) {
        fetchUserSuggestions(value)
        onChange(value)
    }

    function onInputChange(_: ChangeEvent<{}>, value: string, reason: 'input' | 'reset' | 'clear') {
        if (reason === 'input') {
            debouncedOnChange(value)
            return
        }

        debouncedOnChange.cancel()
        onChange(value)
    }
}

export default Search
