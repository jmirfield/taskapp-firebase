import { useState, useCallback } from 'react'

const useRequest = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const sendRequest = useCallback(async (
        cb,
        options = { method: 'GET' },
        url = `${process.env.REACT_APP_FIREBASE}.json`) => {
        setIsLoading(true)
        setError(null)
        try {
            const response = await fetch(
                url,
                options
            );
            if (!response.ok) throw new Error('Request failed!');
            // console.log(response)
            const data = await response.json();
            cb(data)
        } catch (e) {
            setError(e.message || 'Something went wrong!')
        }
        setIsLoading(false)
    }, [])
    return {
        isLoading,
        error,
        sendRequest
    }
}

export default useRequest

