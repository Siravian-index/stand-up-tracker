
interface Props {
    error: string
}


const ErrorMessage = ({error}: Props) => {
    return (
        <div>
            <p>{error}</p>
        </div>
    )
}


export default ErrorMessage