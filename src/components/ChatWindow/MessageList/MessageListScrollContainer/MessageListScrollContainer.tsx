/* istanbul ignore file */
import React from 'react'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import Button from '@material-ui/core/Button'
import clsx from 'clsx'
import { Message } from '@twilio/conversations'
import throttle from 'lodash.throttle'
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles'

const styles = createStyles({
  outerContainer: {
    minHeight: 0,
    flex: 1,
    position: 'relative',
  },
  innerScrollContainer: {
    height: '100%',
    overflowY: 'auto',
    padding: '0 1.2em 0',
    background: '#fff',
  },
  messageListContainer: {
    overflowY: 'auto',
    flex: '1',
    paddingBottom: '1em',
  },
  button: {
    position: 'absolute',
    bottom: '14px',
    right: '2em',
    zIndex: 100,
    padding: '0.5em 0.9em',
    visibility: 'hidden',
    opacity: 0,
    boxShadow: '0px 4px 16px rgba(18, 28, 45, 0.2)',
    transition: 'all 0.5s ease',
  },
  showButton: {
    visibility: 'visible',
    opacity: 1,
    bottom: '24px',
  },
})

interface MessageListScrollContainerProps extends WithStyles<typeof styles> {
  messages: Message[];
}

interface MessageListScrollContainerState {
  isScrolledToBottom: boolean;
  showButton: boolean;
  messageNotificationCount: number;
}

export class MessageListScrollContainer extends React.Component<
  MessageListScrollContainerProps,
  MessageListScrollContainerState
> {
  chatThreadRef = React.createRef<HTMLDivElement>()
  state = { isScrolledToBottom: true, showButton: false, messageNotificationCount: 0 }

  scrollToBottom() {
    const innerScrollContainerEl = this.chatThreadRef.current!
    innerScrollContainerEl.scrollTop = innerScrollContainerEl!.scrollHeight
  }

  componentDidMount() {
    this.scrollToBottom()
    this.chatThreadRef.current!.addEventListener('scroll', this.handleScroll)
  }

  componentDidUpdate(prevProps: MessageListScrollContainerProps, prevState: MessageListScrollContainerState) {
    const hasNewMessages = this.props.messages.length !== prevProps.messages.length

    if (prevState.isScrolledToBottom && hasNewMessages) {
      this.scrollToBottom()
    } else if (hasNewMessages) {
      const numberOfNewMessages = this.props.messages.length - prevProps.messages.length

      this.setState(previousState => ({
        showButton: !previousState.isScrolledToBottom,
        messageNotificationCount: previousState.showButton
          ? previousState.messageNotificationCount + numberOfNewMessages
          : 1,
      }))
    }
  }

  handleScroll = throttle(() => {
    const innerScrollContainerEl = this.chatThreadRef.current!
    if (!innerScrollContainerEl) return
    const isScrolledToBottom =
      Math.abs(
        innerScrollContainerEl.clientHeight + innerScrollContainerEl.scrollTop - innerScrollContainerEl!.scrollHeight
      ) < 1

    this.setState(prevState => ({
      isScrolledToBottom,
      showButton: isScrolledToBottom ? false : prevState.showButton,
    }))
  }, 300)

  handleClick = () => {
    const innerScrollContainerEl = this.chatThreadRef.current!

    innerScrollContainerEl.scrollTo({ top: innerScrollContainerEl.scrollHeight, behavior: 'smooth' })

    this.setState({ showButton: false })
  }

  componentWillUnmount() {
    const innerScrollContainerEl = this.chatThreadRef.current!

    innerScrollContainerEl.removeEventListener('scroll', this.handleScroll)
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.outerContainer}>
        <div className={classes.innerScrollContainer} ref={this.chatThreadRef} data-cy-message-list-inner-scroll>
          <div className={classes.messageListContainer}>
            {this.props.children}
            <Button
              className={clsx(classes.button, { [classes.showButton]: this.state.showButton })}
              onClick={this.handleClick}
              startIcon={<ArrowDownwardIcon />}
              color="primary"
              variant="contained"
              data-cy-new-message-button
            >
              {this.state.messageNotificationCount} new message
              {this.state.messageNotificationCount > 1 && 's'}
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(MessageListScrollContainer)















// import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
// import { Message } from '@twilio/conversations'
// import throttle from 'lodash.throttle'
// import { useRef, useState, useEffect, ReactElement } from 'react'

// import {
//   OuterContainer,
//   InnerScrollContainer,
//   MessageListContainer,
//   ButtonCustom,
// } from './style'

// type MessageListScrollContainerProps = {
//   messages: Message[]
//   isScrolledToBottom: boolean
//   showButton: boolean
//   messageNotificationCount: number
//   children: ReactElement
// }


// export const MessageListScrollContainer = (props: MessageListScrollContainerProps) => {
//   const { messages, isScrolledToBottom, showButton, messageNotificationCount, children } = props
//   const chatThreadRef = useRef<HTMLDivElement>()
//   const [state, setState] = useState({ isScrolledToBottom: true, showButton: false, messageNotificationCount: 0 })

//   const scrollToBottom = () => {
//     const innerScrollContainerEl = chatThreadRef.current!
//     innerScrollContainerEl.scrollTop = innerScrollContainerEl!.scrollHeight
//   }

//   useEffect(() => {
//     scrollToBottom()
//     chatThreadRef.current!.addEventListener('scroll', handleScroll)
//   }, [])

//   const handleScroll = throttle(() => {
//     const innerScrollContainerEl = chatThreadRef.current!

//     if (!innerScrollContainerEl) return

//     const isScrolledToBottom =
//       Math.abs(
//         innerScrollContainerEl.clientHeight + innerScrollContainerEl.scrollTop - innerScrollContainerEl!.scrollHeight
//       ) < 1

//     const newState = { isScrolledToBottom, showButton: isScrolledToBottom ? false : true }

//     setState(newState)
//   }, 300)

//   const handleClick = () => {
//     const innerScrollContainerEl = chatThreadRef.current!

//     innerScrollContainerEl.scrollTo({ top: innerScrollContainerEl.scrollHeight, behavior: 'smooth' })

//     setState({ ...state, showButton: false })
//   }

//   return (
//     <OuterContainer>
//       <InnerScrollContainer ref={chatThreadRef} data-cy-message-list-inner-scroll>
//         <MessageListContainer>
//           {children}
//           <ButtonCustom
//             showButton={state.showButton}
//             onClick={handleClick}
//             startIcon={<ArrowDownwardIcon />}
//             color="primary"
//             variant="contained"
//             data-cy-new-message-button
//           >
//             {state.messageNotificationCount} new message
//             {state.messageNotificationCount > 1 && 's'}
//           </ButtonCustom>
//         </MessageListContainer>
//       </InnerScrollContainer>
//     </OuterContainer>
//   )
// }
