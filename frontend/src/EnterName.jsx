import React from 'react';
import { useState } from 'react';

function EnterName(props) {
  const [name, setName] = useState("");

  return (
      <>
        <h1>Till UnslaskπuDÄSH!</h1>
        <p>Ärade spelare, skriv in ditt namn</p>
        <input type="text" autoFocus={true} value={name} onChange={(event) => setName(event.target.value)} />
        <button onClick={() => name !== "" && props.onJoin(name)}>Amen</button>
        <h2><i>— ❤️ The AA Team</i></h2>
      </>
  );
}

export default EnterName;
