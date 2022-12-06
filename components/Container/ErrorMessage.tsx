import styled from 'styled-components'

export const ErrorMessage = ({error}:{error: string}):JSX.Element => (
    <>
        <Error aria-label="Error Received">
            An error has occurred. Please refresh the page and try again.
        </Error>
        <ErrorAdditionalInformation>Additional information on error received: {error}</ErrorAdditionalInformation>
    </>
)

const Error = styled.h1`
    color: #b71c1c;
`

const ErrorAdditionalInformation = styled.aside`
    color: #9e9e9e;
    text-style: italics;
`