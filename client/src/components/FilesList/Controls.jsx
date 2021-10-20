import { StyledControls, Button } from './styled'

const Controls = ({isSelected, setIsSelected, downloadAllow}) => {
    return (
        <StyledControls>
            <Button 
                onClick={() => setIsSelected(state => !state)}
                isSelected={isSelected}
            >
                Select
            </Button>
            <Button disabled={!downloadAllow || !isSelected}>Download</Button>
        </StyledControls>  
    )
    
}

export default Controls