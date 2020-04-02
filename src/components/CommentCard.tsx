import React, { useContext } from 'react'
import { Comment } from '../interfaces/Comment'
import useGradient from '../hooks/useGradient'
import { IconButton } from '@chakra-ui/core'
import { TiArrowUpThick, TiArrowDownThick } from 'react-icons/ti'
import AuthContext from '../context/auth/authContext'
import LinkButton from './LinkButton'
import moment from 'moment'

const CommentCard = ({ comment }: { comment: Comment }) => {
  const { user } = useContext(AuthContext)
  let { votes } = comment

  if (!votes) votes = []

  // Get User Vote
  const userVote = user?.id
    ? votes.find(vote => vote.user?.id === user.id)
    : null
  const votedClass = userVote ? 'voted' : ''

  // Votes Count
  const upVotes = votes.filter(vote => vote.type === 'UPVOTE')
  const downVotes = votes.filter(vote => vote.type === 'DOWNVOTE')
  const votesCount = upVotes.length - downVotes.length

  // Date and Time
  const date = moment(comment.createdAt).format('Do MMM YYYY')
  const time = moment(comment.createdAt).format('LT')

  // Gradiants
  const [[bg, shade]] = useGradient()

  return (
    <article className={`comment-card ${bg}`}>
      <aside className={shade}>
        <IconButton
          className='vote-btn'
          variant='ghost'
          aria-label='upvote'
          icon={TiArrowUpThick}
          variantColor={userVote?.type === 'UPVOTE' ? 'blue' : 'gray'}
        />
        <p className={`votes-count ${votedClass}`}>{votesCount}</p>
        <IconButton
          className='vote-btn'
          variant='ghost'
          aria-label='downvote'
          icon={TiArrowDownThick}
          variantColor={userVote?.type === 'DOWNVOTE' ? 'red' : 'gray'}
        />
      </aside>

      <header>
        <h6>
          <LinkButton
            className='link'
            to={`/u/${comment.user?.identifier}`}
            variant='link'>
            {comment.user?.name}
          </LinkButton>{' '}
          <small className='date'>
            {date} <span className='time'>{time}</span>
          </small>
        </h6>
      </header>

      <main className='main-link'>
        <p>{comment.content}</p>
      </main>
    </article>
  )
}

export default CommentCard