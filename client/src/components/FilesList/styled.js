import styled, { css } from 'styled-components'
import { Button } from '../UI/Button/StyledButton'

const StyledList = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 25px;
`

const StyledFile = styled.div`
    box-sizing: border-box;
    display: flex;
    width: 100%;
    background-color: #f4f4f4;
    align-items: center;
    border-bottom: 3px solid white;

    & > * {
        padding: 7px 15px;
    }
`

const StyledControls = styled.div`
    margin-bottom: 20px;
    padding: 0 15px;
    display: flex;
    justify-content: flex-end;
`

const FileInfo = styled.label`
    display: flex;
    border-right: 3px solid white;
    height: 100%;
    width: 80%;
    cursor: pointer;
    ${({checked}) => checked && css`background-color: #dbdbdb`}
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

const FilesSelect = styled.input`
    margin-right: 20px;
    display: ${({visible}) => visible ? 'block' : 'none'};
    cursor: pointer;
`

const FilesButton = styled(Button)`
    margin-left: 10px;
    ${({isSelected}) => isSelected && css`
        background-color: #188e5f;
        &:hover {
            opacity: 1
        }
    `}
`

export { 
    StyledList, 
    StyledFile, 
    StyledControls,
    FileInfo, 
    FileControls, 
    FileInfoUnit, 
    FilesSelect,
    FilesButton 
}
