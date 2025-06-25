import styles from './Errors.module.scss'

const knownFields = [
    'username',
    'email',
    'password',
    'password_confirmation',
    'first_name',
    'last_name',
]

const Errors = ({ messages }) => {
    if (!messages || Object.keys(messages).length === 0) return null

    return (
        <div className={styles.Errors}>
            {Object.entries(messages).map(([key, value]) => {
                if (knownFields.includes(key)) return null
                return Array.isArray(value)
                    ? value.map((msg, i) => (
                        <p key={`${key}-${i}`} className={styles.error}>{msg}</p>
                    ))
                    : <p key={key} className={styles.error}>{value}</p>
            })}
        </div>
    )
}

export default Errors