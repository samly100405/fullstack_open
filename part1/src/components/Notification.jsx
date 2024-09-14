const Notification = ({ type, text }) => {
    if (!text) return null

    return (
        <div className={type}>
            <h1>{text}</h1>
        </div>
    )
}

export default Notification