import styles from './Errors.module.scss'

const Errors = ({ message }) => {
    if (message) {
        return (
            <div className={objectIncludes.styles.Errors}>
                Error: { message }
            </div>
        )
    }
}

export default Errors