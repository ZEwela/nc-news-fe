import { useEffect, useState } from "react"

const VoteElement = ({votes, handleVoting}) => {

    const [votesDisplay, setVotesDisplay] = useState(votes)   
    const handleVotesDisplayChange = (newVote) => {
        setVotesDisplay(currVotesDisplay => {
            return currVotesDisplay + newVote
        })
    } 



    return (
        <div className="border">
            <section className="vote-element">
                 <button onClick={() => {handleVoting(1), handleVotesDisplayChange(1)}}>+</button>
                 {votesDisplay !== 0 && <p>Sentiment: {votesDisplay}</p>}
                 <button onClick={() =>{ handleVoting(-1), handleVotesDisplayChange(-1)}}>-</button>
            </section>
        </div>
    )
}

export default VoteElement