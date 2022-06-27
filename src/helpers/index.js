import React from 'react';


export const normalizeText = (text) => {

    if(typeof text === 'string')  {
        return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();
    } else {
        return new Date(text.seconds * 1000).getTime();
    }
  };

  