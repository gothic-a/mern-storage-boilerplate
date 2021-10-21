import { StyledControls, FilesButton } from './styled'

const Controls = ({isSelected, setIsSelected, downloadAllow}) => {
    return (
        <StyledControls>
            <FilesButton 
                onClick={() => setIsSelected(state => !state)}
                isSelected={isSelected}
                size={'m'}
                variant={'success'}
            >
                <i className="fas fa-check-circle"></i>
            </FilesButton>
            <FilesButton 
                disabled={!downloadAllow || !isSelected}
            >
                <i className="fas fa-angle-double-down"></i>
            </FilesButton>
        </StyledControls>  
    )
    
}

export default Controls