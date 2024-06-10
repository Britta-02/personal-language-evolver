function mySubmit(){
    let protoWord = document.getElementById("myText").value;

    // Categories
    const S = ['p', 't', 'k', 'c' , 'ʔ'];
    const F = ['ɸ', 's', 'ç', 'ʃ', 'x', 'h'];
    const N = ['n', 'ŋ'];
    const L = ['j', 'l', 'r', 'ʋ', 'w'];
    const P = ['p', 'b', 'ɸ', 'ʋ', 'm']
    const E = ['a', 'i', 'e'];
    const B = ['u'];
    const O = [...S, ...F];
    const C = [...S, ...F, ...N, ...L];
    const V = [...E, ...B];


    function replaceSubstring(index, length, replacementChar) {
        protoWord = protoWord.substring(0, index) + replacementChar + protoWord.substring(index + length);
    }
    
    
    // Iterate through the protoWord
    for (let i = 0; i < protoWord.length; i++) {
        const char = protoWord[i];
        const nextChar = protoWord[i + 1];
        const nextNextChar = protoWord[i + 2];
        let prevChar = protoWord[i - 1] || '';

        // Rule 1: V → Ø / O_L(VCVC)'V
        if ((V.includes(char) && O.includes(prevChar) && L.includes(nextChar) && nextNextChar === "'") ||
            (V.includes(char) && O.includes(prevChar) && L.includes(nextChar) && V.includes(nextNextChar) && C.includes(protoWord[i + 3]) && V.includes(protoWord[i + 4]) && C.includes(protoWord[i + 5]) && protoWord[i + 6] === "'")) {
            replaceSubstring(i, 1, '');
        }

    }



    // Iterate through the protoWord again for additional rules
    for (let i = 0; i < protoWord.length; i++) {
        const char = protoWord[i];
        const nextChar = protoWord[i + 1];

        // Rule 2: hr hl {hj, ʃj} → r l j
        if ((char === 'h' && nextChar === 'r') || 
            (char === 'h' && nextChar === 'l') ||
            (char === 'h' && nextChar === 'j') ||
            (char === 'ʃ' && nextChar === 'j')) {
                replaceSubstring(i, 1, '');
        }

        prevChar = char;
    }


    // Iterate through the protoWord again for additional rules
    for (let i = 0; i < protoWord.length; i++) {
        const char = protoWord[i];
        const nextChar = protoWord[i + 1];
        const nextNextChar = protoWord[i + 2];

        // Rule 3: ʃ → ç / _B
        if ((char === 'ʃ' && B.includes(nextChar)) ||
            (char === 'ʃ' && nextChar === "'" && B.includes(nextNextChar))) {
                replaceSubstring(i, 1, "ç");
        }

        prevChar = char;
    }


    // Iterate through the protoWord again for additional rules
    for (let i = 0; i < protoWord.length; i++) {
        const char = protoWord[i];
        const nextChar = protoWord[i + 1];

        // Rule 4: {sj ʃ} → s
        if (char === 's' && nextChar === 'j') {
            replaceSubstring(i, 2, "s");
        }
        // Rule 4: {sj ʃ} → s
        if (char === 'ʃ') {
                replaceSubstring(i, 1, "s");
            }

            prevChar = char;
        }


    // Iterate through the protoWord again for additional rules
    for (let i = 0; i < protoWord.length; i++) {
        const char = protoWord[i];
        const nextChar = protoWord[i + 1];

        // Rule 5: ɸL → L
        if (char === 'ɸ' && L.includes (nextChar)) {
            replaceSubstring(i, 1, "");
        }

            prevChar = char;
        }


    // Iterate through the protoWord again for additional rules
    for (let i = 0; i < protoWord.length; i++) {
        const char = protoWord[i];
        const nextChar = protoWord[i + 1];
        const nextNextChar = protoWord[i + 2];

        // Rule 6: k → c / _{j,i}
        if ((char === 'k' && nextChar === 'j') ||
            (char === 'k' && nextChar === 'i') ||
            (char === 'k' && nextChar === "'" && nextNextChar === 'i')) {
            replaceSubstring(i, 1, "c");
        }
        
            prevChar = char;
        }


    // Iterate through the protoWord again for additional rules
    for (let i = 0; i < protoWord.length; i++) {
        const char = protoWord[i];
        const nextChar = protoWord[i + 1];
        const nextNextChar = protoWord[i + 2];

        // Rule 7: h → ʔ / V0_V0 ! _u
        if ((char === 'h' && V.includes(prevChar) && nextChar !== 'u' && prevChar === nextChar) ||
            (char === 'h' && V.includes(prevChar) && nextChar === "'" &&  nextNextChar !== 'u' && prevChar === nextNextChar)) {
            replaceSubstring(i, 1, "ʔ");
        }

            prevChar = char;
        }


// Iterate through the protoWord again for additional rules (Rule 8)
for (let i = 0; i < protoWord.length; i++) {
    const char = protoWord[i];
    const nextChar = protoWord[i + 1];
    const nextNextChar = protoWord[i + 2];

    // Rule 8: h → ʔ / a_{i,u}
    if ((char === 'h' && protoWord[i - 1] === 'a' && protoWord[i - 1] !== '\n' && nextChar === 'i') ||
        (char === 'h' && protoWord[i - 1] === 'a' && protoWord[i - 1] !== '\n'  && nextChar === "'" && nextNextChar === 'i') ||
        (char === 'h' && protoWord[i - 1] === 'a' && protoWord[i - 1] !== '\n'  && nextChar === 'u') ||
        (char === 'h' && protoWord[i - 1] === 'a' && protoWord[i - 1] !== '\n'  && nextChar === "'" && nextNextChar === 'u')) {
        replaceSubstring(i, 1, "ʔ");
    }
}


    // Iterate through the protoWord again for additional rules
    for (let i = 0; i < protoWord.length; i++) {
        const char = protoWord[i];
        const nextChar = protoWord[i + 1];
        const nextNextChar = protoWord[i + 2];

        // Rule 9: h → Ø / V_V
        if ((char === 'h' && protoWord[i - 1] && protoWord[i - 1] !== '\n' && V.includes(prevChar) && V.includes(nextChar)) ||
            (char === 'h' && protoWord[i - 1] && protoWord[i - 1] !== '\n' && V.includes(prevChar) && nextChar === "'" && V.includes(nextNextChar))) {
            replaceSubstring(i, 1, "");
        }
    }


    // Iterate through the protoWord again for additional rules
    for (let i = 0; i < protoWord.length; i++) {
        const char = protoWord[i];
        const nextChar = protoWord[i + 1];
        const nextNextChar = protoWord[i + 2];

        // Rule 10: iji → i / "iji
        if (char === 'i' && prevChar === "'" && nextChar === 'j' && nextNextChar === 'i') {
            replaceSubstring(i, 2, "");
        }

            prevChar = char;
        }


    // Iterate through the protoWord again for additional rules
    for (let i = 0; i < protoWord.length; i++) {
        const char = protoWord[i];
        const nextChar = protoWord[i + 1];
        const nextNextChar = protoWord[i + 2];

        // Rule 11: i → Ø / _ji
        if ((char === 'i' && nextChar === 'j' && nextNextChar === 'i') ||
            (char === 'i' && nextChar === 'j' && nextNextChar === "'" && protoWord[i + 3] === 'i')) {
            replaceSubstring(i, 1, "");
        }

            prevChar = char;
        }

        
    // Iterate through the protoWord again for additional rules
    for (let i = 0; i < protoWord.length; i++) {
        const char = protoWord[i];
        const nextChar = protoWord[i + 1];

        // Rule 12: e → Ø / V{p,ɸ,t,s,n,l,r}_# !"
        if ((char === 'e' && V.includes(protoWord[i - 2]) && prevChar === 'p' && nextChar === undefined) ||
            (char === 'e' && V.includes(protoWord[i - 2]) && prevChar === 'p' && nextChar === "\n") ||
            (char === 'e' && V.includes(protoWord[i - 2]) && prevChar === 'p' && nextChar === " ") ||
            
            (char === 'e' && V.includes(protoWord[i - 2]) && prevChar === 'ɸ' && nextChar === undefined) ||
            (char === 'e' && V.includes(protoWord[i - 2]) && prevChar === 'ɸ' && nextChar === "\n") ||
            (char === 'e' && V.includes(protoWord[i - 2]) && prevChar === 'ɸ' && nextChar === " ") ||

            (char === 'e' && V.includes(protoWord[i - 2]) && prevChar === 't' && nextChar === undefined) ||
            (char === 'e' && V.includes(protoWord[i - 2]) && prevChar === 't' && nextChar === "\n") ||
            (char === 'e' && V.includes(protoWord[i - 2]) && prevChar === 't' && nextChar === " ") ||
 
            (char === 'e' && V.includes(protoWord[i - 2]) && prevChar === 's' && nextChar === undefined) ||
            (char === 'e' && V.includes(protoWord[i - 2]) && prevChar === 's' && nextChar === "\n") ||
            (char === 'e' && V.includes(protoWord[i - 2]) && prevChar === 's' && nextChar === " ") ||

            (char === 'e' && V.includes(protoWord[i - 2]) && prevChar === 'n' && nextChar === undefined) ||
            (char === 'e' && V.includes(protoWord[i - 2]) && prevChar === 'n' && nextChar === "\n") ||
            (char === 'e' && V.includes(protoWord[i - 2]) && prevChar === 'n' && nextChar === " ") ||
            
            (char === 'e' && V.includes(protoWord[i - 2]) && prevChar === 'l' && nextChar === undefined) ||
            (char === 'e' && V.includes(protoWord[i - 2]) && prevChar === 'l' && nextChar === "\n") ||
            (char === 'e' && V.includes(protoWord[i - 2]) && prevChar === 'l' && nextChar === " ") ||

            (char === 'e' && V.includes(protoWord[i - 2]) && prevChar === 'r' && nextChar === undefined) ||
            (char === 'e' && V.includes(protoWord[i - 2]) && prevChar === 'r' && nextChar === "\n") ||
            (char === 'e' && V.includes(protoWord[i - 2]) && prevChar === 'r' && nextChar === " ")) {
            replaceSubstring(i, 1, "");
        }

            prevChar = char;
        }


    // Iterate through the protoWord again for additional rules
    for (let i = 0; i < protoWord.length; i++) {
        const char = protoWord[i];
        const nextChar = protoWord[i + 1];

        // Rule 13: u → w / _V !"
        if (char === 'u' && prevChar !== "'" && V.includes(nextChar)) {
            replaceSubstring(i, 1, "w");
        }

            prevChar = char;
        }


    // Iterate through the protoWord again for additional rules
    for (let i = 0; i < protoWord.length; i++) {
        const char = protoWord[i];
        const nextChar = protoWord[i + 1];
        const nextNextChar = protoWord[i + 2];

        // Rule 14: Ø → w / u_V
        if (char === 'u' && nextChar === "'" && V.includes(nextNextChar)    ){
            replaceSubstring(i, 1, "uw");
        }

            prevChar = char;
        }


    // Iterate through the protoWord again for additional rules
    for (let i = 0; i < protoWord.length; i++) {
        const char = protoWord[i];
        const nextChar = protoWord[i + 1];
        const nextNextChar = protoWord[i + 2];

        // Rule 15: Ø → w / V_u
        if (V.includes(char) && nextChar === 'u' ||
            V.includes(char) && nextChar === "'" && nextNextChar === 'u')
        {
            replaceSubstring(i + 1, 0, "w");
        }

            prevChar = char;
        }


    // Iterate through the protoWord again for additional rules
    for (let i = 0; i < protoWord.length; i++) {
        const char = protoWord[i];
        const nextChar = protoWord[i + 1];
        const nextNextChar = protoWord[i + 2];

        // Rule 16: Ø → j / {a,e}_V
        if ((char === 'a' && V.includes(nextChar)) ||
            (char === 'a' && nextChar === "'" &&V.includes(nextChar)) ||
            (char === 'e' && V.includes(nextChar)) ||
            (char === 'e' && nextChar === "'" && V.includes(nextNextChar)))
        {
            replaceSubstring(i + 1, 0, "j");
        }

            prevChar = char;
        }


    // Iterate through the protoWord again for additional rules
    for (let i = 0; i < protoWord.length; i++) {
        const char = protoWord[i];
        const nextChar = protoWord[i + 1];
        const nextNextChar = protoWord[i + 2];

        // Rule 17: w → ʋ / {P,t,s,n,r,l}_E
        if (
            (char === 'w' && P.includes(prevChar) && E.includes(nextChar)) ||
            (char === 'w' && P.includes(prevChar) && nextChar === "'"  && E.includes(nextNextChar)) ||
            (char === 'w' && prevChar === 't' && E.includes(nextChar)) ||
            (char === 'w' && prevChar === 't' && nextChar === "'"  && E.includes(nextNextChar)) ||
            (char === 'w' && prevChar === 's' && E.includes(nextChar)) ||
            (char === 'w' && prevChar === 's' && nextChar === "'"  && E.includes(nextNextChar)) ||
            (char === 'w' && prevChar === 'n' && E.includes(nextChar)) ||
            (char === 'w' && prevChar === 'n' && nextChar === "'"  && E.includes(nextNextChar)) ||
            (char === 'w' && prevChar === 'r' && E.includes(nextChar)) ||
            (char === 'w' && prevChar === 'r' && nextChar === "'"  && E.includes(nextNextChar)) ||
            (char === 'w' && prevChar === 'l' && E.includes(nextChar)) ||
            (char === 'w' && prevChar === 'l' && nextChar === "'"  && E.includes(nextNextChar))) {
            replaceSubstring(i, 1, "ʋ");
        }

            prevChar = char;
        }



    // Iterate through the protoWord again for additional rules
    for (let i = 0; i < protoWord.length; i++) {
        const char = protoWord[i];


        // Rule 18: ʋ → Ø / P_
        if (char === 'ʋ' && P.includes(prevChar)) {
            replaceSubstring(i, 1, "");
        }

            prevChar = char;
        }

    
        // Iterate through the protoWord again for additional rules
    for (let i = 0; i < protoWord.length; i++) {
        const char = protoWord[i];
        const nextChar = protoWord[i + 1];


        // Rule 19: V → Ø / "V_#
        if ((V.includes(char) && protoWord[i - 2] === "'" && V.includes(prevChar) && nextChar === undefined) ||
        (V.includes(char) && protoWord[i - 2] === "'" && V.includes(prevChar) && nextChar === "\n") ||
        (V.includes(char) && protoWord[i - 2] === "'" && V.includes(prevChar) && nextChar === " ")) {
            replaceSubstring(i, 1, "");
        }

            prevChar = char;
        }

    
        // Iterate through the protoWord again for additional rules
    for (let i = 0; i < protoWord.length; i++) {
        const char = protoWord[i];
        const nextChar = protoWord[i + 1];
        const nextNextChar = protoWord[i + 2];

        // Rule 20: "uwu → "u
        if (char === 'u' && prevChar === "'" && nextChar === 'w' && nextNextChar === 'u') {
            replaceSubstring(i, 2, "");
        }

            prevChar = char;
        }


    // Iterate through the protoWord again for additional rules
    for (let i = 0; i < protoWord.length; i++) {
        const char = protoWord[i];
        const nextChar = protoWord[i + 1];
        const nextNextChar = protoWord[i + 2];

        // Rule 21: V → Ø / N_L(VCVC)"V
        if (V.includes(char) && N.includes(prevChar) && L.includes(nextChar) && nextNextChar === "'" && V.includes(protoWord[i + 3])  ||
        V.includes(char) && N.includes(prevChar) && L.includes(nextChar) && V.includes(nextNextChar) && C.includes(protoWord[i + 3]) && V.includes(protoWord[i + 4]) && C.includes(protoWord[i + 5]) && protoWord[i + 6] === "'" && V.includes(protoWord[i + 7])) {
            replaceSubstring(i, 1, "");
        }

            prevChar = char;
        }


    // Iterate through the protoWord again for additional rules
    for (let i = 0; i < protoWord.length; i++) {
        const char = protoWord[i];
        const nextChar = protoWord[i + 1];

        // Rule 22: ŋ → Ø / _C
        if (char === 'ŋ' && C.includes (nextChar)) {
            replaceSubstring(i, 1, "");
        }

            prevChar = char;
        }


    // Iterate through the protoWord again for additional rules
    for (let i = 0; i < protoWord.length; i++) {
        const char = protoWord[i];

        // Rule 23: ŋ → Ø / _C
        if (char === 'ŋ') {
            replaceSubstring(i, 1, "x");
        }

            prevChar = char;
        }


    // Iterate through the protoWord again for additional rules
    for (let i = 0; i < protoWord.length; i++) {
        const char = protoWord[i];

        // Rule 24: n → Ø / #_
        if ((char === 'n' && i === 0) ||
            (char === 'n' && prevChar === "\n") ||
            (char === 'n' && prevChar === " ")) {
            replaceSubstring(i, 1, "");
        }

            prevChar = char;
        }


    // Iterate through the protoWord again for additional rules
    for (let i = 0; i < protoWord.length; i++) {
        const char = protoWord[i];
        const nextChar = protoWord[i + 1];
        const nextNextChar = protoWord[i + 2];

        // Rule 24: x → k / _VS
        if ((char === 'x' && V.includes(nextChar) && S.includes(nextNextChar)) || 
            (char === 'x' && nextChar === "'" && V.includes(nextNextChar) && S.includes(protoWord[i + 3]))){
            replaceSubstring(i, 1, "k");
        }

            prevChar = char;
        }
    

    // Iterate through the protoWord again for additional rules
    for (let i = 0; i < protoWord.length; i++) {
        const char = protoWord[i];
        const nextChar = protoWord[i + 1];
        const nextNextChar = protoWord[i + 2];

        // Rule 25: x → ç / _i
        if ((char === 'x' && nextChar === 'i') ||
            (char === 'x' && nextChar === "'" && nextNextChar === 'i')) {
            replaceSubstring(i, 1, "ç");
        }

            prevChar = char;
        }



    // Iterate through the protoWord again for additional rules
    for (let i = 0; i < protoWord.length; i++) {
        const char = protoWord[i];

        // Rule 26: j → Ø / c_
        if (char === 'j' && prevChar === 'c') {
            replaceSubstring(i, 1, "");
        }

            prevChar = char;
        }

        
    // Iterate through the protoWord again for additional rules
    for (let i = 0; i < protoWord.length; i++) {
        const char = protoWord[i];
        const nextChar = protoWord[i + 1];
        const nextNextChar = protoWord[i + 2];

        // Rule 27: s → ç / _Vç
        if ((char === 's' && V.includes(nextChar) && nextNextChar === 'ç') ||
            (char === 's' && nextChar === "'" && V.includes(nextNextChar) && protoWord[i + 3] === 'ç'))  {
            replaceSubstring(i, 1, "ç");
        }

            prevChar = char;
        }
        


    document.getElementById("myH1").textContent = `Your new word is:`;
    document.getElementById("myH2").textContent = `${protoWord}`;
}