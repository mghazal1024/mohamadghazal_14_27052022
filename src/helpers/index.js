import React from 'react';


export const normalizeText = (text) => {

    if(typeof text === 'string')  {
        console.log(typeof text);
        console.log(text);
        return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();
    } else {
        console.log(typeof text)
        console.log(text)
        console.log(new Date(text.seconds * 1000).getTime());
        return new Date(text.seconds * 1000).getTime();
    }
  };

  