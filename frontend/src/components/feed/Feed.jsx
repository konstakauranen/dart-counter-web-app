import React, { useState , useEffect} from 'react'
import dartGameData from '../../../testdata';
import './feed.css'

const Feed = () => {
    return(
        <div className='feed-container'>
            {dartGameData.map((post, index) => (
                <div className='post-container'>
                    <h2>Best of three legs</h2>
                    <div className='stats-container'>
                        <div className='post-stats-left'>
                            <h3 className='player-name-header'>{post.player1Name}</h3>
                            <p className='legs-won'>{post.player1Score}</p>
                            <p>Three dart average: {post.player1Average}</p>
                            <p>Highest finish: {post.player1HighestFinish}</p>
                            <p>Best leg: {post.player1BestLeg}</p>
                            <p>Highest score: {post.player1HighestScore}</p>
                        </div>
                        <div className='post-stats-right'>
                            <h3 className='player-name-header'>{post.player2Name}</h3>
                            <p className='legs-won'>{post.player2Score}</p>
                            <p>Three dart average: {post.player2Average}</p>
                            <p>Highest finish: {post.player2HighestFinish}</p>
                            <p>Best leg: {post.player2BestLeg}</p>
                            <p>Highest score: {post.player2HighestScore}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
  
export default Feed