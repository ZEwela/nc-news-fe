import { useState } from "react"

const VoteElement = ({votes, handleVoting}) => {

    const [votesDisplay, setVotesDisplay] = useState(votes)   
    const handleVotesDisplayChange = (newVote) => {
        setVotesDisplay(currVotesDisplay => {
            return currVotesDisplay + newVote
        })
    } 


    return (
        <section className="vote-element">
            <button onClick={() => {handleVoting(1), handleVotesDisplayChange(1)}}>+</button>
            <p>{votesDisplay}</p>
            <button onClick={() =>{ handleVoting(-1), handleVotesDisplayChange(-1)}}>-</button>
        </section>
    )
}

export default VoteElement