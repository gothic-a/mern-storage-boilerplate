import styled from 'styled-components'

const StyledWrapper = styled.div`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
`

const StyledSelect = styled.input.attrs(props => ({
    type: 'checkbox',
}))`
    display: none;
`

const StyledFakeSelect = styled.div`
    display: flex;
    width: 15px;
    height: 15px;
    border: 2px solid #e1e1e1;
    border-radius: 100%;
`

export { StyledWrapper, StyledSelect, StyledFakeSelect }