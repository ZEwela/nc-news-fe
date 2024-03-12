import { useState } from "react"

const VoteElement = ({votes, handleVoting}) => {

    const [votesDisplay, setVotesDisplay] = useState(votes)   
    const [upvoteDisabled, setUpvoteDisabled] = useState(false)
    const [downvoteDisabled, setDownvoteDisabled] = useState(votes <= 0)

    console.log(!votes)

    const handleVotesDisplayChange = (newVote) => {
        if (newVote === 1) {
            setUpvoteDisabled((currState) => !currState)
            setDownvoteDisabled((currState) => currState ? !currState : currState)
        } else {
            setDownvoteDisabled((currState) => !currState)
            setUpvoteDisabled((currState) => currState ? !currState : currState)
        }
        setVotesDisplay(currVotesDisplay => {
            return currVotesDisplay + newVote
        })
    } 



    return (
        <div className="border">
            <section className="vote-element">
                 {<button disabled={upvoteDisabled} onClick={() => {handleVoting(1), handleVotesDisplayChange(1)}}>+</button>}
                 {votesDisplay !== 0 && <p>Sentiment: {votesDisplay}</p>}
                 <button disabled={downvoteDisabled} onClick={() =>{ handleVoting(-1), handleVotesDisplayChange(-1)}}>-</button>
            </section>
        </div>
    )
}

export default VoteElement