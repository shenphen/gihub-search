import React, { useMemo, ChangeEvent, useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import debounce from 'lodash.debounce'

interface SearchProps {
    onChange: (name: string) => void
}

const Search = ({ onChange }: SearchProps) => {
    const debouncedOnChange = useMemo(() => debounce(onChange, 300), [onChange])

    useEffect(() => {
        return () => debouncedOnChange.cancel()
    }, [debouncedOnChange])

    function onInputChange(_: ChangeEvent<{}>, value: string, reason: 'input' | 'reset' | 'clear') {
        if (reason === 'input') {
            debouncedOnChange(value)
            return
        }

        debouncedOnChange.cancel()
        onChange(value)
    }

    return (
        <Autocomplete
            freeSolo
            options={[]}
            onInputChange={onInputChange}
            renderInput={params => (
                <TextField {...params} label="Search user" margin="normal" variant="outlined" />
            )}
        />
    )
}

export default Search
