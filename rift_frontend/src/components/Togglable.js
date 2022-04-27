import { forwardRef, useImperativeHandle, useState } from "react"

const Togglable = forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)

    const hide = { display: visible ? 'none' : ''}
    const show = { display: visible ? '' : 'none'}

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(ref, () => {
        return {
            toggleVisibility
        }
    })

    return (
        <>
            <div style={hide}>
                <button onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>
            <div style={show}>
                {props.children}
                <button onClick={toggleVisibility}>{props.cancelLabel}</button>
            </div>
        </>
    )
})

export default Togglable