import styled, { css } from 'styled-components'

const Button = styled.button.attrs(props => ({
    variant: props.variant || 'primary',
    size: props.size || 'sm',
    outlinde: false,
}))`
    text-transform: lowercase;
    letter-spacing: 1px;
    font-size: 1em;
    border-radius: 4px;
    transition: opacity .2s;

    font-weight: ${({outlined}) => outlined && '500'};
    color: ${({outlined}) => outlined ? '#444444' : 'white'};
    border: ${({outlined}) => !outlined ? 'none' : `2px solid`};
    padding: ${({size}) => (
        size === 'sm' ? '2px 10px' 
            : size === 'm' ? '5px 12px'
            : '7px 15px'
    )};
    background-color: ${({outlined, variant}) => (
        outlined ? 'transparent' 
            : variant === 'primary' ? '#3499d7'
            : variant === 'success' ? '#21c488'
            : '#dd2553' 
    )};
    border-color: ${({variant}) => (
        variant === 'primary' ? '#3499d7'
            : variant === 'success' ? '#20d87f'
            : '#dd2553'     
    )};
    ${({disabled}) => disabled && css`
        user-select: none;
        opacity: .3;
        pointer-events: none;
    `}

    &:hover {
        opacity: .8
    }
`

export { Button }