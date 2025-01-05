import React from 'react';
import styled from 'styled-components';

// Styled Components for Cards
const CreditsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
`;

const ActorCard = styled.div`
  width: 150px;
  margin: 10px;
  padding: 10px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  text-align: center;
  cursor: pointer;

  &:hover {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }
`;

const ActorImage = styled.img`
  width: 100%;
  border-radius: 50%;
  height: 150px;
  object-fit: cover;
`;

const ActorName = styled.h3`
  font-size: 14px;
  margin-top: 10px;
  color: #333;
`;

const ActorCharacter = styled.p`
  font-size: 12px;
  color: #666;
`;

// MovieCredits Component
const MovieCredits = ({ credits }) => {
  if (!credits || credits.cast.length === 0) {
    return <p>No cast data available.</p>;
  }

 // Function to handle actor card click and redirect to Google search
 const handleActorClick = (actorName) => {
    const query = encodeURIComponent(actorName);
    window.open(`https://www.google.com/search?q=${query}`, '_blank');
  };

  return (
    <CreditsContainer>
      {credits.cast.slice(0, 10).map((actor) => (
        <ActorCard key={actor.id} onClick={() => handleActorClick(actor.name)}>     
        <ActorImage
            src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`}
            alt={actor.name}
          />
          <ActorName>{actor.name}</ActorName>
          <ActorCharacter>{actor.character}</ActorCharacter>
        </ActorCard>
      ))}
    </CreditsContainer>
  );
};

export default MovieCredits;
