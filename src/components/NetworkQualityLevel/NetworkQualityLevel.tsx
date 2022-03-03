import { Participant } from 'twilio-video'
import { useParticipantNetworkQualityLevel } from 'hooks'
import { makeStyles } from '@material-ui/core/styles';

import { OuterContainer, Level } from './style'

const useStyles = makeStyles({
  innerContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    '& div': {
      width: '2px',
      marginRight: '1px',
      '&:not(:last-child)': {
        borderRight: 'none',
      },
    },
  },
});

const STEP = 3
const BARS_ARRAY = [0, 1, 2, 3, 4]

export const NetworkQualityLevel = ({ participant }: { participant: Participant }) => {
  const classes = useStyles();
  const networkQualityLevel = useParticipantNetworkQualityLevel(participant)

  if (networkQualityLevel === null) return null

  return (
    <OuterContainer>
      <div className={classes.innerContainer}>
        {BARS_ARRAY.map(level => (
          <Level
            key={level}
            STEP={STEP}
            level={level}
            networkQualityLevel={networkQualityLevel}
          />
        ))}
      </div>
    </OuterContainer>
  )
}
