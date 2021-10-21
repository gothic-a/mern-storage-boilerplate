import { StyledWrapper, StyledSelect, StyledFakeSelect } from "./StyledSelect"

const Select = (props) => {
    return (
        <StyledWrapper>
            <StyledSelect {...props}/>
            <StyledFakeSelect>
                <i className="fas fa-check"></i>
            </StyledFakeSelect>
        </StyledWrapper>
    )
}

export default Select