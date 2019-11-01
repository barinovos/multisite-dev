import {
  Colors,
  MIN_LEVEL_HEIGHT,
  MIN_CONNECTION_HEIGHT,
  LEVEL_WIDTH,
  CONNECTOR_WIDTH
} from './utils/VizConstants'

export default {
  container: {
    position: 'relative',
    height: '100%',
    minWidth: '1050px',
    minHeight: '650px'
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '100%'
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%'
  },
  middleColumn: {
    padding: '1em 0 3.1em'
  },
  textCenter: {
    lineHeight: '2.5em',
    textAlign: 'center'
  },
  vizLevel: {
    background: Colors.gray1,
    width: LEVEL_WIDTH,
    minHeight: MIN_LEVEL_HEIGHT,
    borderRadius: 4,
    borderColor: 'transparent',
    padding: '1em'
  },
  vizConnector: {
    background: 'white',
    width: CONNECTOR_WIDTH,
    minHeight: MIN_CONNECTION_HEIGHT,
    border: `1px solid ${Colors.gray0}`,
    borderRadius: 4,
    padding: '.5em 1em'
  },
  vizConnectorActive :{
    border: `1px solid ${Colors.blue}`,
  },
  vizConnectorAbsolute: {
    position: 'absolute',
    left: `calc(50% - ${CONNECTOR_WIDTH / 2}px)`
  }
}
