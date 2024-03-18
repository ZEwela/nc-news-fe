import { useState } from "react"

const VoteElement = ({votes, handleVoting}) => {

    const [votesDisplay, setVotesDisplay] = useState(votes)   
    const [upvoteDisabled, setUpvoteDisabled] = useState(false)
    const [downvoteDisabled, setDownvoteDisabled] = useState(votes <= 0)

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
        <div className="">
            <section className="vote-element">
                 <button  className={`m-1 border-2 p-1 px-3 rounded-full ${ upvoteDisabled ? "opacity-40 cursor-not-allowed": "hover:bg-slate-100"} `} disabled={upvoteDisabled} onClick={() => {handleVoting(1), handleVotesDisplayChange(1)}}>+</button>
                  <p>Votes: {votesDisplay}</p>
                 <button className={`m-1 border-2 p-1 px-3 rounded-full ${ downvoteDisabled ? "opacity-40 cursor-not-allowed": "hover:bg-slate-100"} `} disabled={downvoteDisabled} onClick={() =>{ handleVoting(-1), handleVotesDisplayChange(-1)}}>-</button>
            </section>
        </div>
    )
}

export default VoteElement