import styled, { keyframes } from 'styled-components'

export const Loading = () => (
    <>
        {
            Array.from(
                {
                    length: 10
                }, 
                (_,index) => 
                    <Skeleton 
                        key={index}
                        tabIndex={0}
                        role="progressbar"
                        aria-busy="true"
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuetext="Please wait..."
                    ></Skeleton>
            )
        }
    </>
)

const pulse = keyframes`
    0% {
        opacity: 1;
    }
    50% {
        opacity: .4;
    }
    100% {
        opacity: 1;
    }
`

const Skeleton = styled.div`
    height: 75px;
    background: #AEAEAE no-repeat;
    margin-bottom: 8px;
    position: relative;
    box-sizing: border-box;
    margin-left: auto;
    margin-right: auto;
    width: 95vw;
    animation: ${pulse} 2s infinite;
    animation-delay: 0.5s;
`

