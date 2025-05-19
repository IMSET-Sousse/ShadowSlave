import "../../styles/characters.css";

async function getCharacters() {
  try {
    const res = await fetch("http://0.0.0.0:8000/api/shadowslave/", {
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch characters");
    }
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function Characters() {
  const characters = await getCharacters();

  return (
    <div className="content-box">
      <h3>Characters</h3>
      <div className="space"></div>
      {characters.length === 0 ? (
        <p>No characters found.</p>
      ) : (
        <div className="ch-images">
          {characters.map((character) => (
            <div
              key={character.id}
              className="ch-box"
              data-name={`Name: ${character.name}`}
              data-true-name={`True Name: ${character.true_name}`}
              data-age={`Age: ${character.age}`}
              data-status={`Vital Status: ${character.vital_status}`}
              data-rank={`Rank: ${character.rank}`}
              data-class={`Class: ${character.class_name}`}
              data-aspect={`Aspect: ${character.aspect}`}
              data-flaw={`Flaw: ${character.flaw}`}
            >
              <img
                src={`/assets/${character.image}`}
                alt={character.name}
                onError={(e) => {
                  e.target.src = "/assets/placeholder.png";
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
