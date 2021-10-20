import styled, { css } from 'styled-components'

const StyledList = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 25px;
`

const StyledFile = styled.div`
    display: flex;
    width: 100%;
    padding: 3px 0;

    ${({selected}) => selected && css`
        background-color: #000;
    `}
`

const StyledControls = styled.div`
    margin-bottom: 20px;
    display: flex;
    justify-content: flex-end;
`

const FileInfo = styled.div`
    display: flex;
    width: 80%;
`

const FileControls = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 20%;
`

const FileInfoUnit = styled.div`
    display: flex;
    width: ${({width}) => width ? `${width}%` : '20%'};
`

const Select = styled.input`
    margin-right: 20px;
    visibility: ${({visible}) => visible ? 'visible' : 'hidden'};
`

const Button = styled.button`
    margin-left: 10px;
    ${({isSelected}) => isSelected && css`
        background-color: #235dc8; 
        color: white; 
        border: 2px solid #235dc8; 
        border-radius: 3px`
    }
`

export { 
    StyledList, 
    StyledFile, 
    StyledControls,
    FileInfo, 
    FileControls, 
    FileInfoUnit, 
    Select,
    Button 
}
