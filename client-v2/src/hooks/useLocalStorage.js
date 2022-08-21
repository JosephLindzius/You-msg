import {useEffect, useState} from 'react'

const  PREFIX = 'You-msg-'
export default function useLocalStorage(key, initialValue) {
    const prefixedKey = PREFIX + key
    const [value, setValue] = useState(function (){
        const jsonValue = localStorage.getItem(prefixedKey)
        if (jsonValue != null)
            return JSON.parse(jsonValue)
        if (typeof initialValue === 'function') {
            return initialValue()
        } else {
            return initialValue
        }
    })

    useEffect(()=> {
        localStorage.setItem(prefixedKey, JSON.stringify(value))
    }, [prefixedKey, value])

    return [value, setValue]
}